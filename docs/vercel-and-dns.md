# 部署说明：Vercel 项目与 DNS

本页给维护者查阅。访客请先看仓库根目录 [README.md](../README.md)。

两个站点在同一仓库中分目录部署。合并到 `main` 会触发两个 Vercel 项目的生产构建，因此合并需要仓库所有者明确同意。请先用分支预览审阅；含个人姓名的预览地址不要公开。

## Vercel（同一仓库，两个项目）

将 `Yankj/heydusk-site` 导入两次。在对应 Pull Request 审阅并合并之前，不要绑定生产域名。

### 项目 A — 官网（`heydusk.com`）

| 设置 | 值 |
|---|---|
| Git repository | `Yankj/heydusk-site` |
| Project name | `heydusk-site`（或 `heydusk-company`） |
| Root Directory | `apps/company` |
| Framework Preset | Other |
| Build Command | `npm run build:vercel`（见 `apps/company/vercel.json`） |
| Output Directory | （Nitro / Vercel 适配器；按构建默认值即可） |
| Production Branch | `main` |

### 项目 B — 小咪产品站（`mimi.heydusk.com`）

| 设置 | 值 |
|---|---|
| Git repository | `Yankj/heydusk-site` |
| Project name | `mimi-site` |
| Root Directory | `apps/mimi` |
| Framework Preset | Other |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Production Branch | `main` |

预览地址按分支生成。生产部署只在合并到 `main` 并完成域名绑定之后发生。

## DNS（Cloudflare · heydusk.com）

| Type | Name | Target | Proxy |
|---|---|---|---|
| CNAME / apex | `@` / `www` | 沿用现有 heydusk.com 的 Vercel 设置 | 保持现状 |
| CNAME | `mimi` | `cname.vercel-dns.com` | DNS only（灰云） |

然后在小咪的 Vercel 项目 Domains 中添加 `mimi.heydusk.com`。

本仓库的 Pull Request 不会改 DNS、不会绑定生产域名，也不会自行发布生产。
