# 小咪 / Mimi · 产品官网

Product site for **小咪 / Mimi** → https://mimi.heydusk.com

面向家庭育儿的 iOS 助理。「先你一步，把事办妥。」拍一张、说一句，它整理成待你确认的卡片；今天要办的一目了然，我们家的事它都记得，你点头之前什么都不改。

源码版本 [v1.2.0](https://github.com/Yankj/mimi/releases/tag/v1.2.0) 已发布。本站提供产品介绍与邮件咨询，不提供 App Store、TestFlight 或可公开下载的安装包。联系仍使用 `hello@heydusk.com` 的 mailto 入口。

公司站为 sibling `apps/company` → https://heydusk.com，品牌层级与目录见[统一入口](../../docs/brand-product-system.md)。小咪保留自己的橙奶油色小猫视觉；本仓只维护营销摘要，[产品源码](https://github.com/Yankj/mimi)在产品仓。

## 文案

对外口径与 GitHub 公开表述对齐，核对于 2026-11-15。

- `content.json` 放短文案、虚构演示和版本/咨询说明；`src/index.html` 放页面结构和栏目文案。
- `src/app.js` 的确认只改变网页演示状态，不保存安排或触发 App/模型。
- 可以说源码版本已发布，并指向 GitHub Release 与本站；不要写成可在应用商店安装，或开放直接下载安装包。
- 本站原有中文单页；本轮不新增英文产品站。公司站保留中英版本。

## 开发与检查

```sh
cd apps/mimi
npm run build    # → dist/
npm run check    # links, anchors, retired-content guard
npm run dev      # build + serve http://localhost:4173 (PORT=… to override)
```

无依赖，Node ≥ 20。样例均为虚构、标明流程示意，颜色偏好仅保存在浏览器本地；不加营销追踪或表单。品牌快照位于 `brand/`，产品仓品牌目录仍为权威来源。保留旧 URL 重定向与既有联系入口。

部署设置见仓库 [docs/vercel-and-dns.md](../../docs/vercel-and-dns.md)。
