#!/usr/bin/env python3
"""Exercise an already-running local company production site with real clicks.

No server startup, build, deployment, mail delivery, or remote network access.
Requires the environment's existing Python Playwright and Chromium installation.
"""

from __future__ import annotations

import argparse
import json
import re
import signal
import sys
import time
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import parse_qs, urlsplit

from playwright.sync_api import sync_playwright


PRODUCTS = ("mimi", "momo", "frameforge")
ROUTES = ("/", "/products", "/about", "/contact", "/privacy", "/terms") + tuple(
    f"/products/{slug}" for slug in PRODUCTS
)
MAIL_ADDRESS = "hello@heydusk.com"
TIMEOUT = 5000


def localized(locale: str, path: str) -> str:
    return path if locale == "en" else "/zh" + ("" if path == "/" else path)


def pathname(url: str) -> str:
    return urlsplit(url).path.rstrip("/") or "/"


def require(condition: bool, message: str) -> None:
    if not condition:
        raise AssertionError(message)


def safe_name(value: str) -> str:
    return re.sub(r"[^a-zA-Z0-9_-]+", "-", value).strip("-")


class VisitorQA:
    def __init__(self, args: argparse.Namespace):
        self.args = args
        self.output = Path(args.output_dir).resolve()
        self.output.mkdir(parents=True, exist_ok=True)
        self.base = args.base_url.rstrip("/")
        self.origin = urlsplit(self.base)
        self.results: list[dict] = []
        self.signatures: dict[str, str] = {}
        self.logs: dict[str, list[dict]] = {}
        self.external_targets: list[dict] = []
        self.current = ""
        self.page = None
        self.context = None
        self.browser = None
        self.stub_external = False
        self.identity = ""
        self.locale = "en"
        self.mobile = False
        self.expected_theme = "light"
        self.stopping = False

    def url(self, path: str) -> str:
        return self.base + path

    def instrument(self, page, identity: str, java_script_enabled: bool = True) -> None:
        log = self.logs.setdefault(identity, [])
        page.on("console", lambda message: log.append({"type": "console", "level": message.type, "text": message.text, "url": page.url, "location": message.location}))
        page.on("pageerror", lambda error: log.append({"type": "pageerror", "text": str(error), "url": page.url}))
        page.on("requestfailed", lambda request: log.append({"type": "requestfailed", "url": request.url, "failure": request.failure, "resource_type": request.resource_type, "expected": not java_script_enabled and request.resource_type == "script" and request.failure == "csp"}))
        page.on("response", lambda response: log.append({"type": "http-error", "url": response.url, "status": response.status}) if response.status >= 400 else None)
        page.add_init_script("""window.__qaMailtoClicks = [];
          document.addEventListener('click', event => {
            const anchor = event.target.closest && event.target.closest('a[href]');
            if (anchor && anchor.getAttribute('href').startsWith('mailto:')) {
              event.preventDefault();
              window.__qaMailtoClicks.push(anchor.getAttribute('href'));
            }
          }, true);""")

    def new_context(self, locale: str, width: int, theme: str, blocked_storage: bool = False, identity_override: str | None = None, java_script_enabled: bool = True):
        identity = identity_override or f"{locale}-{width}-{theme}" + ("-storage-denied" if blocked_storage else "")
        context = self.browser.new_context(
            viewport={"width": width, "height": 844 if width == 390 else 1000},
            color_scheme=theme,
            locale="zh-CN" if locale == "zh" else "en-US",
            reduced_motion="reduce",
            java_script_enabled=java_script_enabled,
        )
        context.set_default_timeout(TIMEOUT)
        context.set_default_navigation_timeout(TIMEOUT)
        context.grant_permissions(["clipboard-read", "clipboard-write"], origin=self.base)

        def local_only(route):
            request = route.request
            target = urlsplit(request.url)
            same_origin = (target.scheme, target.netloc) == (self.origin.scheme, self.origin.netloc)
            if same_origin:
                route.continue_()
                return
            observed = {"type": "external-intercept", "url": request.url, "navigation": request.is_navigation_request(), "case": self.current}
            self.logs.setdefault(identity, []).append(observed)
            self.external_targets.append(observed)
            if self.stub_external and request.is_navigation_request():
                route.fulfill(status=200, content_type="text/html", body="<!doctype html><title>QA intercepted external target</title><h1>External navigation intercepted locally</h1>")
            else:
                route.abort("blockedbyclient")

        context.route("**/*", local_only)
        if blocked_storage:
            context.add_init_script("""Object.defineProperty(window, 'localStorage', {
              configurable: true, get() { throw new DOMException('QA storage denied', 'SecurityError'); }
            });""")
        else:
            context.add_init_script("(() => { const theme = " + json.dumps(theme) + "; try { if (!localStorage.getItem('heydusk-theme')) localStorage.setItem('heydusk-theme', theme); } catch (_) {} })();")
        page = context.new_page()
        self.instrument(page, identity, java_script_enabled)
        return context, page, identity

    def case(self, name: str, callback, page=None) -> None:
        self.current = f"{self.identity}/{name}"
        active_page = page or self.page
        start = time.monotonic()
        log_start = len(self.logs.get(self.identity, []))
        record = {"id": self.current, "status": "PASS", "steps": name.replace("-", " ")}
        try:
            if self.stopping:
                raise InterruptedError("Run stopped; remaining cases were not executed")
            callback()
            if self.stopping:
                raise InterruptedError("Run stopped; current case did not complete acceptance")
            new_errors = []
            for entry in self.logs.get(self.identity, [])[log_start:]:
                expected_404 = "/__visitor_missing__" in pathname(entry.get("url", ""))
                local_url = urlsplit(entry.get("url", "")).hostname in ("localhost", "127.0.0.1", "::1")
                if entry["type"] == "pageerror":
                    new_errors.append(entry)
                elif entry["type"] == "console" and entry["level"] == "error" and not (expected_404 and "404" in entry["text"]):
                    new_errors.append(entry)
                elif entry["type"] == "http-error" and local_url and not (expected_404 and entry["status"] == 404):
                    new_errors.append(entry)
                elif entry["type"] == "requestfailed" and local_url and not entry.get("expected", False):
                    new_errors.append(entry)
            require(not new_errors, "Unexpected browser/network error: " + "; ".join(item.get("text") or item.get("failure") or f"HTTP {item.get('status')} {item.get('url')}" for item in new_errors))
        except InterruptedError:
            raise
        except Exception as error:
            record.update(status="FAIL", error=f"{type(error).__name__}: {error}")
            if active_page and not active_page.is_closed():
                record["url"] = active_page.url
                artifact = safe_name(self.current) + ".png"
                try:
                    active_page.screenshot(path=str(self.output / artifact), full_page=True, timeout=TIMEOUT)
                    record["screenshot"] = artifact
                except Exception as screenshot_error:
                    record["screenshot_error"] = str(screenshot_error)
        record["duration_ms"] = round((time.monotonic() - start) * 1000)
        self.results.append(record)
        print(f"{record['status']:4} {record['id']}" + (f" — {record['error'].splitlines()[0]}" if "error" in record else ""), flush=True)

    def go(self, path: str, status: int = 200):
        response = self.page.goto(self.url(path), wait_until="load")
        require(response is not None and response.status == status, f"GET {path}: expected HTTP {status}, received {response.status if response else 'no response'}")
        self.page.locator("h1").first.wait_for(state="visible")
        return response

    def assert_route(self, path: str, expected_heading: str | None = None) -> None:
        self.page.wait_for_url(lambda url: pathname(str(url)) == pathname(path), timeout=TIMEOUT)
        require(urlsplit(self.page.url).netloc == self.origin.netloc, f"Expected local route, got {self.page.url}")
        heading = self.page.locator("h1")
        require(heading.count() == 1, f"Expected one h1 after navigating to {path}, found {heading.count()}")
        actual = heading.text_content().strip()
        expected = expected_heading or self.signatures.get(pathname(path))
        if expected:
            require(actual == expected, f"URL changed but content did not match {path}: h1={actual!r}, expected={expected!r}")
        require(bool(actual), f"Empty h1 at {path}")
        require("HeyDusk" in self.page.title(), f"Missing route title at {path}")
        expected_lang = "zh-CN" if pathname(path).startswith("/zh") else "en"
        require(self.page.locator("main").get_attribute("lang") == expected_lang, f"Wrong content language at {path}")

    def click_route(self, locator, path: str) -> None:
        locator.click()
        self.assert_route(path)

    def visible_header(self, path: str):
        if self.mobile:
            menu = self.page.locator(".mobile-menu")
            if menu.get_attribute("open") is None:
                menu.locator("summary").click()
            return menu.locator(f'a[href="{path}"]').first
        return self.page.locator(f'.primary-nav a[href="{path}"]').first

    def audit_document(self, path: str) -> None:
        self.go(path)
        self.assert_route(path)
        self.page.wait_for_function("theme => document.documentElement.dataset.theme === theme", arg=self.expected_theme)
        heading = self.page.locator("h1").text_content().strip()
        self.signatures[pathname(path)] = heading
        expected_lang = "zh-CN" if self.locale == "zh" else "en"
        require(self.page.locator("html").get_attribute("lang") == expected_lang, f"html lang must be {expected_lang}")
        title = self.page.title()
        require(len(title) > len("HeyDusk"), "Missing descriptive title")
        description = self.page.locator('meta[name="description"]')
        require(description.count() == 1 and bool(description.get_attribute("content")), "Missing or duplicate description")
        canonical = self.page.locator('link[rel="canonical"]')
        require(canonical.count() == 1, "Expected one canonical")
        require(pathname(canonical.get_attribute("href")) == pathname(path), f"Incorrect canonical for {path}")
        semantic = path[3:] or "/" if self.locale == "zh" else path
        for language, other_locale in (("en", "en"), ("zh-CN", "zh")):
            alternate = self.page.locator(f'link[rel="alternate"][hreflang="{language}"]')
            require(alternate.count() == 1, f"Missing/duplicate {language} alternate")
            require(pathname(alternate.get_attribute("href")) == pathname(localized(other_locale, semantic)), f"Wrong {language} alternate")
        anchors = self.page.locator("a").evaluate_all("""anchors => anchors.map(a => ({href:a.getAttribute('href'), disabled:a.getAttribute('aria-disabled')}))""")
        for anchor in anchors:
            href = anchor["href"]
            require(bool(href and href.strip()) and href != "#" and not href.lower().startswith("javascript:"), f"Empty or placeholder anchor: {anchor}")
            require(anchor["disabled"] != "true", f"Fake disabled anchor: {anchor}")
            if href.startswith("#"):
                require(self.page.locator(href).count() > 0, f"Missing fragment destination {href}")
        require(self.page.locator('button[aria-disabled="true"]:not([disabled])').count() == 0, "Button presents a fake disabled state")
        for image in self.page.locator("img").all():
            image.scroll_into_view_if_needed()
            self.page.wait_for_function("img => img.complete", arg=image.element_handle(), timeout=TIMEOUT)
            require(image.evaluate("img => img.naturalWidth > 0"), f"Missing image {image.get_attribute('src')}")
        self.page.evaluate("window.scrollTo(0, 0)")
        overflow = self.page.evaluate("({width: innerWidth, scroll: document.documentElement.scrollWidth})")
        require(overflow["scroll"] <= overflow["width"] + 1, f"Horizontal overflow: {overflow}")

    def header_navigation(self) -> None:
        for route in ("/products", "/about", "/contact", "/"):
            self.go(localized(self.locale, "/"))
            path = localized(self.locale, route)
            self.click_route(self.visible_header(path), path)

    def hero_navigation(self) -> None:
        for selector, route in ((".hero-actions a", "/products"), (".hero-actions a", "/about"), (".feature-product a", "/products"), (".contact-band a", "/contact")):
            self.go(localized(self.locale, "/"))
            path = localized(self.locale, route)
            self.click_route(self.page.locator(f'{selector}[href="{path}"]').first, path)
        if not self.mobile:
            self.go(localized(self.locale, "/"))
            path = localized(self.locale, "/contact")
            self.click_route(self.page.locator(".header-contact"), path)

    def logos_and_footer(self) -> None:
        home = localized(self.locale, "/")
        for selector in (".site-header .brand", ".footer-brand"):
            self.go(localized(self.locale, "/products"))
            self.click_route(self.page.locator(selector), home)
        for route in ("/products", "/about", "/contact", "/privacy", "/terms", *(f"/products/{slug}" for slug in PRODUCTS)):
            self.go(home)
            path = localized(self.locale, route)
            self.click_route(self.page.locator(f'.site-footer a[href="{path}"]').first, path)

    def direction_history(self, slug: str) -> None:
        home = localized(self.locale, "/")
        detail = localized(self.locale, f"/products/{slug}")
        catalog = localized(self.locale, "/products")
        self.go(home)
        card = self.page.locator(f'a.product-card[href="{detail}"]')
        require(card.count() == 1, f"Direction {slug} must itself be a link to {detail}")
        self.click_route(card, detail)
        self.click_route(self.page.locator(".product-detail-back"), catalog)
        self.page.go_back(wait_until="load")
        self.assert_route(detail)
        response = self.page.reload(wait_until="load")
        require(response is not None and response.status == 200, "Detail refresh failed")
        self.assert_route(detail)
        self.page.go_forward(wait_until="load")
        self.assert_route(catalog)

    def catalog_entries(self, slug: str) -> None:
        catalog = localized(self.locale, "/products")
        detail = localized(self.locale, f"/products/{slug}")
        self.go(catalog)
        row = self.page.locator("article.product-line").filter(has=self.page.locator(f'a[href="{detail}"]')).first
        require(row.count() == 1, f"Missing catalog row for {slug}")
        count = row.locator(f'a[href="{detail}"]').count()
        require(count >= 3, f"{slug}: expected independently clickable icon, title, and detail CTA, found {count}")
        for index in range(count):
            self.go(catalog)
            row = self.page.locator("article.product-line").filter(has=self.page.locator(f'a[href="{detail}"]')).first
            self.click_route(row.locator(f'a[href="{detail}"]').nth(index), detail)

    def detail_actions(self, slug: str) -> None:
        detail = localized(self.locale, f"/products/{slug}")
        self.go(detail)
        primary_count = self.page.locator(".product-detail-primary").count()
        require(primary_count > 0, "Missing introduction action")
        for index in range(primary_count):
            self.go(detail)
            primary = self.page.locator(".product-detail-primary").nth(index)
            require(primary.get_attribute("href") == "#product-purpose-title", "Introduction-only primary action must point into this page")
            primary.click()
            self.page.wait_for_function("location.hash === '#product-purpose-title'")
            self.page.wait_for_function("(() => { const rect = document.querySelector('#product-purpose-title').getBoundingClientRect(); return rect.top >= -1 && rect.top <= 120; })()")
            target = self.page.locator("#product-purpose-title").bounding_box()
            require(target is not None and -1 <= target["y"] < self.page.viewport_size["height"], "Introduction anchor did not bring its target into view")
        contact = localized(self.locale, "/contact") + f"?product={slug}"
        self.go(detail)
        secondary_count = self.page.locator(".product-detail-secondary").count()
        require(secondary_count > 0, "Missing product contact action")
        for index in range(secondary_count):
            self.go(detail)
            self.click_route(self.page.locator(".product-detail-secondary").nth(index), contact)
            require(parse_qs(urlsplit(self.page.url).query).get("product") == [slug], "Product context missing from contact URL")
            mailto = self.page.locator('.email-contact a[href^="mailto:"]')
            self.page.wait_for_function("slug => { const a = document.querySelector('.email-contact a[href^=\"mailto:\"]'); return a && new URL(a.href).searchParams.get('subject')?.toLowerCase().includes(slug); }", arg=slug)
            require(slug in parse_qs(urlsplit(mailto.get_attribute("href")).query).get("subject", [""])[0].lower(), "Contact email subject missing product")
        self.go(detail)
        self.click_route(self.page.locator(".product-detail-breadcrumb a"), localized(self.locale, "/products"))

    def language_journeys(self) -> None:
        other = "zh" if self.locale == "en" else "en"
        for route in ROUTES:
            self.go(localized(self.locale, route))
            self.page.locator(".language-form button:visible").first.click()
            self.assert_route(localized(other, route))
            self.page.locator(".language-form button:visible").first.click()
            self.assert_route(localized(self.locale, route))

    def contact_language_context(self) -> None:
        other = "zh" if self.locale == "en" else "en"
        for slug in PRODUCTS:
            self.go(localized(self.locale, "/contact") + f"?product={slug}")
            form = self.page.locator(".language-form:visible").first
            form.locator(f'input[name="product"][value="{slug}"]').wait_for(state="attached")
            form.get_by_role("button").click()
            self.assert_route(localized(other, "/contact"))
            require(parse_qs(urlsplit(self.page.url).query).get("product") == [slug], "Language switch lost product context")
            self.page.wait_for_function("slug => { const a = document.querySelector('.email-contact a[href^=\"mailto:\"]'); return a && new URL(a.href).searchParams.get('subject')?.toLowerCase().includes(slug); }", arg=slug)
            form = self.page.locator(".language-form:visible").first
            form.locator(f'input[name="product"][value="{slug}"]').wait_for(state="attached")
            form.get_by_role("button").click()
            self.assert_route(localized(self.locale, "/contact"))
            require(parse_qs(urlsplit(self.page.url).query).get("product") == [slug], "Return language switch lost product context")

    def tab_to(self, selector: str) -> None:
        for _ in range(40):
            self.page.keyboard.press("Tab")
            if self.page.evaluate("selector => !!document.activeElement?.matches(selector)", selector):
                return
        raise AssertionError(f"Tab could not reach {selector}")

    def keyboard_menu(self) -> None:
        self.go(localized(self.locale, "/"))
        if self.mobile:
            menu = self.page.locator(".mobile-menu")
            self.tab_to(".mobile-menu summary")
            self.page.keyboard.press("Enter")
            require(menu.get_attribute("open") is not None, "Enter did not open mobile menu")
            self.page.keyboard.press("Escape")
            require(menu.get_attribute("open") is None, "Escape did not close mobile menu")
            require(self.page.locator(".mobile-menu summary").evaluate("e => e === document.activeElement"), "Escape should return focus to menu summary")
            self.page.keyboard.press("Enter")
            self.page.mouse.click(10, self.page.viewport_size["height"] - 10)
            require(menu.get_attribute("open") is None, "Outside click did not close mobile menu")
            self.page.locator(".mobile-menu summary").focus()
            self.page.keyboard.press("Enter")
            target = localized(self.locale, "/products")
            self.tab_to(f'.mobile-menu a[href="{target}"]')
        else:
            target = localized(self.locale, "/products")
            self.tab_to(f'.primary-nav a[href="{target}"]')
        self.page.keyboard.press("Enter")
        self.assert_route(target)

    def email_success_and_denied(self) -> None:
        self.go(localized(self.locale, "/contact"))
        section = self.page.locator(".email-contact")
        address = section.locator("input[readonly]")
        require(address.is_visible() and address.input_value() == MAIL_ADDRESS, "Contact email is not visibly selectable")
        button = section.get_by_role("button")
        button.click()
        status = section.get_by_role("status")
        success = "已复制" if self.locale == "zh" else "copied"
        self.page.wait_for_function("text => document.querySelector('.email-contact [role=status]')?.textContent.includes(text)", arg=success)
        require(self.page.evaluate("navigator.clipboard.readText()") == MAIL_ADDRESS, "System clipboard did not contain the email address")
        mailto = section.locator('a[href^="mailto:"]')
        require(mailto.get_attribute("href") == "mailto:" + MAIL_ADDRESS, "Unexpected generic contact mailto")
        mailto.click()
        require(self.page.evaluate("window.__qaMailtoClicks.at(-1)") == "mailto:" + MAIL_ADDRESS, "Actual mailto click missing")
        self.page.evaluate("Object.defineProperty(navigator.clipboard, 'writeText', { configurable: true, value: async () => { throw new DOMException('QA clipboard denied', 'NotAllowedError'); } })")
        button.click()
        fallback = "手动复制" if self.locale == "zh" else "manually"
        self.page.wait_for_function("text => document.querySelector('.email-contact [role=status]')?.textContent.includes(text)", arg=fallback)
        require(address.evaluate("e => e === document.activeElement && e.selectionStart === 0 && e.selectionEnd === e.value.length"), "Clipboard denial did not select the visible address for manual copying")
        require(status.get_attribute("aria-live") == "polite", "Copy feedback is not announced")
        self.go(localized(self.locale, "/contact") + "?product=%3Cscript%3Eunknown%3C%2Fscript%3E")
        self.page.locator(".email-contact").get_by_role("button").wait_for(state="visible")
        require(self.page.locator('.email-contact a[href^="mailto:"]').get_attribute("href") == "mailto:" + MAIL_ADDRESS, "Unknown product polluted the email subject")

    def theme_journey(self) -> None:
        self.go(localized(self.locale, "/"))
        self.page.wait_for_function("['light', 'dark'].includes(document.documentElement.dataset.theme)")
        current = self.page.locator("html").get_attribute("data-theme")
        require(current in ("light", "dark"), "Theme has no observable state")
        for _ in range(4):
            next_theme = "dark" if current == "light" else "light"
            self.page.locator(".theme-toggle:visible").click()
            self.page.wait_for_function("theme => document.documentElement.dataset.theme === theme", arg=next_theme)
            current = next_theme
        self.page.reload(wait_until="load")
        self.page.wait_for_function("theme => document.documentElement.dataset.theme === theme", arg=current)
        self.click_route(self.visible_header(localized(self.locale, "/products")), localized(self.locale, "/products"))
        self.page.wait_for_function("theme => document.documentElement.dataset.theme === theme", arg=current)

    def missing_route(self) -> None:
        missing = localized(self.locale, "/__visitor_missing__")
        self.go(missing, status=404)
        require(self.page.locator("h1").count() == 1, "404 must have one h1")
        for route in ("/", "/products", "/contact"):
            if route != "/":
                self.go(missing, status=404)
            path = localized(self.locale, route)
            self.click_route(self.page.locator(f'.not-found-page .hero-actions a[href="{path}"]'), path)

    def storage_denied(self, locale: str, width: int, theme: str) -> None:
        old = (self.context, self.page, self.identity)
        self.context, self.page, self.identity = self.new_context(locale, width, theme, True)
        try:
            def journey():
                self.go(localized(locale, "/"))
                self.page.wait_for_function("['light', 'dark'].includes(document.documentElement.dataset.theme)")
                current = self.page.locator("html").get_attribute("data-theme")
                for _ in range(3):
                    next_theme = "dark" if current == "light" else "light"
                    self.page.locator(".theme-toggle:visible").click()
                    self.page.wait_for_function("value => document.documentElement.dataset.theme === value", arg=next_theme)
                    current = next_theme
                self.click_route(self.visible_header(localized(locale, "/products")), localized(locale, "/products"))
                self.click_route(self.page.locator(".site-header .brand"), localized(locale, "/"))
                self.page.reload(wait_until="load")
                self.assert_route(localized(locale, "/"))
            self.case("theme-and-navigation-with-storage-denied", journey)
        finally:
            self.context.close()
            self.context, self.page, self.identity = old

    def run_matrix(self) -> None:
        for locale in ("en", "zh"):
            for width in (1440, 390):
                for theme in ("light", "dark"):
                    if self.args.suite == "navigation" and (locale != "en" or theme != "light"):
                        continue
                    self.locale, self.mobile = locale, width == 390
                    self.expected_theme = theme
                    self.context, self.page, self.identity = self.new_context(locale, width, theme)
                    try:
                        routes = ROUTES if self.args.suite == "full" else ("/products", "/about", "/contact", "/")
                        for route in routes:
                            path = localized(locale, route)
                            if self.args.suite == "full":
                                self.case("document-" + safe_name(route or "home"), lambda path=path: self.audit_document(path))
                            else:
                                self.go(path)
                                self.signatures[pathname(path)] = self.page.locator("h1").text_content().strip()
                        self.case("header-navigation-real-clicks", self.header_navigation)
                        self.case("hero-and-contact-real-clicks", self.hero_navigation)
                        if self.args.suite == "navigation":
                            continue
                        self.case("logos-and-footer-real-clicks", self.logos_and_footer)
                        for slug in PRODUCTS:
                            self.case("direction-history-" + slug, lambda slug=slug: self.direction_history(slug))
                            self.case("catalog-title-icon-cta-" + slug, lambda slug=slug: self.catalog_entries(slug))
                            self.case("detail-actions-" + slug, lambda slug=slug: self.detail_actions(slug))
                        self.case("language-preserves-page-semantics", self.language_journeys)
                        self.case("contact-language-product-context", self.contact_language_context)
                        self.case("keyboard-and-mobile-menu", self.keyboard_menu)
                        self.case("email-copy-success-denial-and-mailto", self.email_success_and_denied)
                        self.case("theme-repeat-refresh-navigation", self.theme_journey)
                        self.case("404-status-and-recovery", self.missing_route)
                        self.page.goto(self.url(localized(locale, "/")), wait_until="load")
                        self.page.screenshot(path=str(self.output / f"{self.identity}-home.png"), full_page=True)
                        self.storage_denied(locale, width, theme)
                    finally:
                        self.context.close()

    def run_mimi_smoke(self) -> None:
        if not self.args.mimi_url:
            self.results.append({"id": "mimi-local-smoke", "status": "NOT_RUN", "reason": "Optional --mimi-url was not supplied; no Mimi server is started by this script."})
            return
        mimi_base = self.args.mimi_url.rstrip("/")
        mimi_origin = urlsplit(mimi_base)
        for width in (1440, 390):
            for theme in ("light", "dark"):
                self.locale, self.mobile = "zh", width == 390
                self.context, self.page, self.identity = self.new_context("zh", width, theme, identity_override=f"mimi-{width}-{theme}")

                def mimi_local_only(route):
                    target = urlsplit(route.request.url)
                    if (target.scheme, target.netloc) in ((mimi_origin.scheme, mimi_origin.netloc), (self.origin.scheme, self.origin.netloc)):
                        route.continue_()
                    elif target.scheme == "https" and target.netloc == "heydusk.com" and pathname(route.request.url) == "/zh" and route.request.is_navigation_request():
                        # Observe the real public href click, then redirect only
                        # its intercepted request to the local company server.
                        event = {"type": "external-intercept", "url": route.request.url, "navigation": True, "case": self.current, "mapped_to": self.url("/zh")}
                        self.external_targets.append(event)
                        self.logs[self.identity].append(event)
                        route.fulfill(status=302, headers={"location": self.url("/zh")}, body="")
                    else:
                        self.logs[self.identity].append({"type": "external-blocked", "url": route.request.url})
                        route.abort("blockedbyclient")

                self.context.route("**/*", mimi_local_only)
                self.context.grant_permissions(["clipboard-read", "clipboard-write"], origin=mimi_base)
                try:
                    def document():
                        response = self.page.goto(mimi_base, wait_until="load")
                        require(response is not None and response.status == 200, "Mimi local page did not return HTTP 200")
                        require(self.page.locator("h1").count() == 1, "Mimi must have one h1")
                        require(self.page.locator("html").get_attribute("lang") == "zh-CN", "Mimi language is not declared")
                        require(self.page.locator(".site-header .wordmark").inner_text() == "Mimi", "Mimi public display name is not capitalized")
                        require("Mimi" in self.page.title(), "Mimi title uses the wrong display name")
                        require(self.page.evaluate("document.documentElement.scrollWidth <= innerWidth + 1"), "Mimi horizontal overflow")
                        self.page.screenshot(path=str(self.output / f"{self.identity}-home.png"), full_page=True)
                    self.case("local-document", document)

                    def contact():
                        self.page.goto(mimi_base, wait_until="load")
                        self.page.locator('.hero-copy a[href="#contact"]').click()
                        self.page.wait_for_function("location.hash === '#contact'")
                        address = self.page.locator("#contact-address")
                        require(address.is_visible() and address.input_value() == MAIL_ADDRESS, "Mimi email is not visible/selectable")
                        copy = self.page.locator("#copy-email")
                        copy.click()
                        self.page.wait_for_function("document.querySelector('#email-feedback').textContent.includes('已复制')")
                        require(self.page.evaluate("navigator.clipboard.readText()") == MAIL_ADDRESS, "Mimi clipboard did not receive email")
                        email = self.page.locator("#email-link")
                        href = email.get_attribute("href")
                        require(href.startswith("mailto:" + MAIL_ADDRESS), "Mimi mailto uses another mailbox")
                        require("Mimi" in parse_qs(urlsplit(href).query).get("subject", [""])[0], "Mimi email subject uses wrong product name")
                        email.click()
                        require(self.page.evaluate("window.__qaMailtoClicks.at(-1)") == href, "Mimi mailto click missing")
                        self.page.evaluate("Object.defineProperty(navigator.clipboard, 'writeText', { configurable: true, value: async () => { throw new DOMException('QA clipboard denied', 'NotAllowedError'); } })")
                        copy.click()
                        self.page.wait_for_function("document.querySelector('#email-feedback').textContent.includes('手动复制')")
                        require(address.evaluate("e => e === document.activeElement && e.selectionStart === 0 && e.selectionEnd === e.value.length"), "Mimi clipboard denial did not select the address")
                    self.case("contact-copy-and-mailto", contact)

                    def mother():
                        self.page.goto(mimi_base, wait_until="load")
                        anchor = self.page.locator('.site-footer a[href="https://heydusk.com/zh"]')
                        require(anchor.count() == 1, "Mimi footer must return to Chinese HeyDusk")
                        before = len(self.external_targets)
                        anchor.click()
                        self.assert_route("/zh")
                        require(any(event["url"] == "https://heydusk.com/zh" for event in self.external_targets[before:]), "Mimi mother-site click target was not observed")
                    self.case("mother-site-click-mapped-to-local", mother)
                finally:
                    self.context.close()

    def run_no_javascript_journeys(self) -> None:
        for locale in ("en", "zh"):
            self.locale, self.mobile = locale, False
            self.context, self.page, self.identity = self.new_context(locale, 1440, "light", identity_override=f"nojs-{locale}-1440", java_script_enabled=False)
            try:
                def journey():
                    self.go(localized(locale, "/"))
                    catalog = localized(locale, "/products")
                    self.click_route(self.page.locator(f'.hero-actions a[href="{catalog}"]'), catalog)
                    detail = localized(locale, "/products/mimi")
                    self.click_route(self.page.locator(f'.product-line h2 a[href="{detail}"]'), detail)
                    self.click_route(self.page.locator(".product-detail-secondary").first, localized(locale, "/contact") + "?product=mimi")
                    contact = self.page.locator(".email-contact")
                    require(contact.locator("input[readonly]").input_value() == MAIL_ADDRESS, "No-JavaScript contact address is unavailable")
                    require(contact.locator('a[href="mailto:' + MAIL_ADDRESS + '"]').is_visible(), "No-JavaScript generic mailto is unavailable")
                    require(contact.get_by_role("button").count() == 0, "No-JavaScript contact presents a non-working copy button")
                    other = "zh" if locale == "en" else "en"
                    self.page.locator(".language-form button:visible").first.click()
                    self.assert_route(localized(other, "/contact"))
                self.case("home-catalog-detail-contact-language", journey)
            finally:
                self.context.close()

    def write_report(self, fatal_error: str | None = None) -> int:
        if fatal_error:
            self.results.append({"id": "browser-execution", "status": "NOT_RUN", "reason": fatal_error})
        self.results.extend([
            {"id": "external-live-availability", "status": "NOT_RUN", "reason": "Local-only run. Remote HTTP requests were intercepted; a correct clicked target does not establish product availability."},
            {"id": "production-public-acceptance", "status": "NOT_RUN", "reason": "This script accepts loopback only and does not test public production. Prior environment evidence: Envoy CONNECT 403 and Chromium net::ERR_TUNNEL_CONNECTION_FAILED for mimi.heydusk.com; no origin response."},
        ])
        counts = {status: sum(record["status"] == status for record in self.results) for status in ("PASS", "FAIL", "NOT_RUN")}
        report = {
            "generated_at": datetime.now(timezone.utc).isoformat(),
            "base_url": self.base,
            "mimi_base_url": self.args.mimi_url,
            "suite": self.args.suite,
            "browser": self.browser.version if self.browser else None,
            "summary": counts,
            "status": "FAIL" if counts["FAIL"] else ("NOT_RUN" if fatal_error else "PASS"),
            "limitations": ["External request interception validates navigation targets only.", "Mailto clicks are captured and prevented; no message is sent.", "No public production requests, server startup, deployment, or credentials."],
            "results": self.results,
            "external_navigation_targets": self.external_targets,
        }
        (self.output / "report.json").write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n")
        (self.output / "browser-events.json").write_text(json.dumps(self.logs, ensure_ascii=False, indent=2) + "\n")
        print(json.dumps({"summary": counts, "report": str(self.output / "report.json")}, ensure_ascii=False))
        return 2 if fatal_error else 1 if counts["FAIL"] else 0


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--base-url", required=True, help="Already-running production URL on localhost/127.0.0.1/[::1]")
    parser.add_argument("--output-dir", required=True, help="Directory for JSON evidence and screenshots")
    parser.add_argument("--suite", choices=("full", "navigation"), default="full")
    parser.add_argument("--mimi-url", help="Optional already-running local Mimi site for display/contact/mother-site smoke checks")
    parser.add_argument("--chromium", default="/usr/bin/chromium", help="Existing Chromium executable; nothing is installed")
    args = parser.parse_args()
    target = urlsplit(args.base_url)
    if target.scheme not in ("http", "https") or target.hostname not in ("localhost", "127.0.0.1", "::1") or target.username or target.password or target.path not in ("", "/") or target.query or target.fragment:
        parser.error("--base-url must be a loopback HTTP(S) origin without credentials, path, query, or fragment")
    if args.mimi_url:
        target = urlsplit(args.mimi_url)
        if target.scheme not in ("http", "https") or target.hostname not in ("localhost", "127.0.0.1", "::1") or target.username or target.password or target.path not in ("", "/") or target.query or target.fragment:
            parser.error("--mimi-url must be a loopback HTTP(S) origin without credentials, path, query, or fragment")
    qa = VisitorQA(args)
    fatal = None
    def interrupted(signum, _frame):
        # Do not raise inside Playwright's dispatcher greenlet. Finish the
        # current bounded action, then stop at the next case boundary.
        qa.stopping = True
    signal.signal(signal.SIGINT, interrupted)
    signal.signal(signal.SIGTERM, interrupted)
    with sync_playwright() as playwright:
        try:
            qa.browser = playwright.chromium.launch(executable_path=args.chromium, headless=True, args=["--no-sandbox", "--disable-dev-shm-usage"])
            qa.run_matrix()
            if args.suite == "full":
                qa.run_no_javascript_journeys()
                qa.run_mimi_smoke()
        except Exception as error:
            fatal = f"{type(error).__name__}: {error}"
        finally:
            if qa.stopping and fatal is None:
                fatal = "Browser run stopped by signal; remaining cases were not executed"
            code = qa.write_report(fatal)
            if qa.browser:
                qa.browser.close()
    return code


if __name__ == "__main__":
    sys.exit(main())
