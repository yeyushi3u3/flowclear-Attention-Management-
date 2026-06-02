---
name: flowclear-project-overview
description: 静流 FlowClear 网页版 Demo 项目总览 — 技术栈、功能模块、启动方式
metadata:
  type: project
---

# 静流 (FlowClear) — 项目存档点

**存档日期**: 2026-06-01
**当前版本**: V1.2 (commit `218b6ad`)
**历史版本**: 
  - V1.1 (commit `2b1366d`) — 红色Toast、消息分类、滑动删除、全页面暗色
  - V1.0 (commit `a821fa5`) — MVP Demo 初始版本
**位置**: `d:\xinxizhengli\1.2\`

## 项目定位

跨App信息聚合与智能筛选工具的网页版Demo，帮助信息溺水者管理注意力：
- 仅红色（重要紧急）消息触发即时通知
- 所有更新统一浏览摘要并按需跳转
- 支持双视图（四象限看板 + 呼吸感时间轴）
- 支持专注时段保护与多维度视图

**Why:** 基于 PRD `静流_FlowClear_V1.0_最终封版PRD - 副本.md` 开发，完整覆盖全部 P0 功能。

**How to apply:** 以此为基线版本，后续开发从该目录继续。

## 技术栈

- React 19 + TypeScript 6
- Vite 8 (构建工具)
- Tailwind CSS 4 (样式)
- Framer Motion 12 (动画)
- Zustand 5 (状态管理，persist 中间件持久化)
- React Router DOM 7 (路由)
- Lucide React 1.17 (SVG 图标)
- date-fns 4 (日期工具)

## 版本历史

| 版本 | Commit | 日期 | 说明 |
|------|--------|------|------|
| V1.2 | `218b6ad` | 2026-06-01 | 删除计数即时更新 + AnimatePresence重构 |
| V1.1 | `2b1366d` | 2026-06-01 | 红色Toast通知 + 消息分类 + 滑动删除 + 全页面暗色 |
| V1.0 | `a821fa5` | 2026-05-31 | MVP Demo 初始版本（P0 全覆盖） |

```bash
git log --oneline        # 查看所有版本
git reset --hard 218b6ad # 回退到 V1.2（最新）
git reset --hard 2b1366d # 回退到 V1.1
git reset --hard a821fa5 # 回退到 V1.0
```

## 已实现功能 (P0 全覆盖 + V1.1 增强)

1. **首次引导与模拟状态机** — 三阶段：教学模拟数据注入 → 切换视图后擦除 → 空白禅意状态
2. **双视图仪表盘** — 四象限看板 (红/蓝/黄/灰) + 呼吸感时间轴，零延迟切换
3. **规则配置中心** — 抽屉式，关键词匹配 + 范围限定(白名单) + 排除词(黑名单防误杀)
4. **摘要预览与跳转** — ≤100字摘要 + "查看原文" (http/mailto协议)
5. **即时通知策略** — 仅红色消息触发浏览器 Notification API
6. **信息源聚合** — 模拟4种源：浏览器通知/RSS/邮件/日历
7. **暗色模式** — 完整12色暗色调色板，一键切换持久化
8. **消息模拟器** — 每25秒自动注入，规则引擎实时评分

## UI/UX Pro Max Skill 应用

- 所有 emoji 图标替换为 Lucide SVG
- 按钮最小触摸目标 44×44px
- 全组件 aria-label / role 语义标注
- focus-visible 焦点环
- prefers-reduced-motion 适配
- 150-300ms transition-colors 微交互
- 暗色模式完整支持

## 项目结构

```
1.2/
├── index.html, package.json, vite.config.ts, tsconfig*.json
├── public/favicon.svg
├── dist/                  # 已构建的生产版本
└── src/
    ├── App.tsx, main.tsx, index.css
    ├── types/index.ts
    ├── stores/            # useAppStore, useMessageStore, useRuleStore
    ├── data/              # identityPresets, mockMessages, tutorialMessages
    ├── utils/             # ruleEngine, notifications, summary, dateFormat
    ├── components/
    │   ├── common/        # EmptyState, PriorityBadge
    │   ├── dashboard/     # DashboardHeader, KanbanView, TimelineView, MessageCard
    │   ├── rules/         # RuleConfigDrawer, RuleList, RuleForm, AdvancedConfig
    │   └── tutorial/      # TutorialOverlay
    └── pages/
        ├── OnboardingPage.tsx
        └── DashboardPage.tsx
```

## 启动方式

```bash
cd d:/xinxizhengli/1.2
npm run dev        # 开发服务器 (默认端口5173)
npm run build      # 生产构建
npm run preview    # 预览生产构建 (端口4173)
```

或直接打开: `d:\xinxizhengli\1.2\dist\index.html`

## 相关文件

- PRD: [[flowclear-prd]]
- 设计系统: UI/UX Pro Max skill (`d:\xinxizhengli\1.1\.claude\skills\ui-ux-pro-max\`)
- 原始参考项目: `d:\xinxizhengli\flowclear\`
- V1.1 更新说明: [[flowclear-v1.1]]
