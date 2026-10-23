# mimi.heydusk.com 部署说明

## Vercel 项目

Import **`Yankj/heydusk-site`**（不是 Yankj/mimi）：

| 项 | 值 |
|---|---|
| Git repository | `Yankj/heydusk-site` |
| Project name | `mimi-site`（建议） |
| Root Directory | `apps/mimi` |
| Framework Preset | Other |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Production Branch | `main` |

Preview：非 main 分支自动生成。Production：合并到 `main` 且绑定域名后上线。

公司站是同仓库另一个 Vercel 项目，Root Directory = `apps/company`。

## Cloudflare DNS

在 heydusk.com 区域：

| Type | Name | Target | Proxy |
|---|---|---|---|
| CNAME | `mimi` | `cname.vercel-dns.com` | DNS only（灰云） |

然后在 Vercel 项目 Domains 中添加 `mimi.heydusk.com`。

## 与公司站

`apps/company` 产品页与页脚外链 `https://mimi.heydusk.com`；旧路径 `/products/cat` 等 302 到该域名。
