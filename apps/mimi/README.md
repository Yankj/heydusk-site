# Mimi 小咪 · 产品官网

Product site for **Mimi / 小咪** → https://mimi.heydusk.com

给家长的育儿助理，**今日安排 + 长期成长**是双核心。当前主流程为本机中文文字输入、补充信息、确认安排、今天时间线与成长目标/完成记录/观察；图片、语音育儿提取、长期记忆、多设备/家庭共享与周期能力仍待推进。当前源码与同版 iOS/真实家庭验收分开描述。

公司站为 sibling `apps/company` → https://heydusk.com，品牌层级与目录见[统一入口](../../docs/brand-product-system.md)。mimi 保留自己的橙奶油色小猫视觉；本仓只维护营销摘要，[产品合同与证据](https://github.com/Yankj/mimi)在产品仓。

## 文案事实源

2026-10-26 核对 mimi 主干 `db41ad3`，已含 #126 / #128 / #130。以 `parenting-core.md` 的双核心与 `interaction-natural-input-v0.5.md` 的最新自然输入为准；`ios-parenting-usable-gaps-2026-10-25.md` 保留当时缺口和通知验证边界，不能用旧日期状态覆盖新主路径。完整来源见统一入口，不在这里复制技术清单。

- `content.json` 放短文案、虚构演示和当前/待验证/规划摘要；`src/index.html` 放页面结构和栏目文案。
- `src/app.js` 的确认只改变网页演示状态，不保存安排或触发 App/模型。
- 当前仅提供介绍与邮件咨询，不承诺直接体验或开放内测。联系仍使用 `hello@heydusk.com` 的 mailto 入口，不宣称已获内测名额、App Store 或 TestFlight 分发。
- 只描述已有本机记录改删能力，不承诺账号删除、导出或完整记忆控制已完成。
- 本站原有中文单页；本轮不新增英文产品站。公司站保留中英版本。

## 开发与检查

```sh
cd apps/mimi
npm run build    # → dist/
npm run check    # links, anchors, retired-content guard
npm run dev      # build + serve http://localhost:4173 (PORT=… to override)
```

无依赖，Node ≥ 20。样例均为虚构、标明流程示意，颜色偏好仅保存在浏览器本地；不加营销追踪或表单。品牌快照位于 `brand/`，产品仓品牌目录仍为权威来源。保留旧 URL 重定向与既有联系入口。

Vercel：Root Directory `apps/mimi`，Build `npm run build`，Output `dist`，Production branch `main`。本轮仅本地审阅，不触发部署。
