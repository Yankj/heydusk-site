# 理想三旬 / HeyDusk

这是 [理想三旬 / HeyDusk](https://heydusk.com) 官网，以及 [小咪 / Mimi](https://mimi.heydusk.com) 产品站的源码仓库。

理想三旬是独立 AI 产品工作室。我们围绕家庭生活、学习成长和创作表达，做有清晰用途的产品。

## 站点

| 站点 | 地址 | 源码目录 | 技术栈 |
|---|---|---|---|
| 官网（中英双语） | [heydusk.com](https://heydusk.com) · 中文 [heydusk.com/zh](https://heydusk.com/zh) | `apps/company` | Vinext / Vite（React） |
| 小咪产品站 | [mimi.heydusk.com](https://mimi.heydusk.com) | `apps/mimi` | 静态 HTML（Node 构建） |

产品目录入口：[中文](https://heydusk.com/zh/products) · [English](https://heydusk.com/products)。

官网与产品站视觉上保持区分：访客不应分不清自己在哪一座站点。品牌关系与目录维护说明见 [docs/brand-product-system.md](docs/brand-product-system.md)。

## 产品

- **小咪 / Mimi**：面向家庭育儿的 iOS 助理。「先你一步，把事办妥。」拍一张、说一句，它整理成待你确认的卡片。源码版本 [v1.2.0](https://github.com/Yankj/mimi/releases/tag/v1.2.0) 已发布，产品介绍见 [mimi.heydusk.com](https://mimi.heydusk.com)。目前没有 App Store、TestFlight 或可公开下载的安装包；如需了解体验方式，请发信 [hello@heydusk.com](mailto:hello@heydusk.com)。
- **Momo**：家长陪伴的英语学习，开发中。
- **FrameForge / 小片场**：面向创作者的视频创作工具，开发中。
- **Ferry Dock / 渡口**：早期 alpha 的日常小工具。

产品能力与验收以各产品仓库为准。本仓库只维护营销站点。小咪的产品仓是 [Yankj/mimi](https://github.com/Yankj/mimi)。

## 本地预览

官网需要 Node.js `>=22.13.0`；小咪产品站需要 Node.js `>=20`。

```bash
# 官网（heydusk.com）
cd apps/company
npm install
npm run dev

# 小咪产品站（mimi.heydusk.com）
cd apps/mimi
npm run dev          # http://localhost:4173
```

检查：

```bash
cd apps/company && npm run build && npm test
cd apps/mimi && npm run build && npm run check
```

访客路径与本地检查说明见 [docs/website-visitor-journeys.md](docs/website-visitor-journeys.md)。分支与贡献约定见 [CONTRIBUTING.md](CONTRIBUTING.md)。Vercel 项目名、DNS 与部署注意事项见 [docs/vercel-and-dns.md](docs/vercel-and-dns.md)。

## 许可证

站点源码版权归属 Yankj / HeyDusk，未声明开源许可。

联系：hello@heydusk.com · GitHub：[Yankj](https://github.com/Yankj) · 博客：[blog.heydusk.com](https://blog.heydusk.com)
