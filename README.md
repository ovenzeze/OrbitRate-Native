# OrbitRate Native

> 优雅的货币汇率转换应用 - NativeScript Vue 版本

## 📱 项目概述

OrbitRate Native 是使用 NativeScript + Vue.js 开发的原生移动应用，提供流畅的货币汇率转换体验。

**当前平台**: 📱 iOS Only (v1.0.0)

### 核心特点
- 🎨 **原生体验**: 真正的原生性能和手感
- ⚡ **即时响应**: 本地计算，零延迟
- 📱 **优雅设计**: 精心打磨的iOS用户界面
- 💾 **离线可用**: 本地缓存，完全离线工作

## 🚀 快速开始

### 环境要求

- Node.js 14+
- NativeScript CLI 8.9+
- macOS + Xcode 14+ (iOS开发必需)
- Apple Developer Account (Team ID: ZWR64GCC4R)

### 安装依赖

```bash
npm install
```

### 运行应用

```bash
# iOS 调试运行
ns run ios

# iOS 调试模式 (Chrome DevTools)
ns debug ios --chrome

# 清理项目
ns clean
```

**注意**: 当前版本仅支持 iOS 平台。

### 清理项目

```bash
ns clean
```

## 📚 文档

详细的开发文档位于 `docs/` 目录：

- **[产品设计文档](./docs/PRODUCT_SPEC.md)** - 完整的功能和设计规范
- **[NativeScript-Vue 指南](./docs/nativescript-vue/README.md)** - 开发教程和最佳实践
  - [快速开始](./docs/nativescript-vue/GETTING_STARTED.md)
  - [关键差异与注意事项](./docs/nativescript-vue/KEY_DIFFERENCES.md) ⭐ 必读
  - [最佳实践](./docs/nativescript-vue/BEST_PRACTICES.md)
  - [高级主题](./docs/nativescript-vue/ADVANCED_TOPICS.md)

## 📦 项目结构

```
app/
├── components/          # 可复用组件
│   ├── base/           # 基础UI组件
│   ├── currency/       # 货币相关组件
│   └── layout/         # 布局组件
├── views/              # 页面视图
│   ├── Convert.vue     # 转换页面（首页）
│   ├── History.vue     # 历史记录
│   ├── Favorites.vue   # 收藏页面
│   └── Settings.vue    # 设置页面
├── store/              # 状态管理 (Vuex)
├── services/           # API 和工具服务
├── utils/              # 工具函数
├── styles/             # 全局样式
├── assets/             # 静态资源
├── App.vue             # 根组件
└── app.ts              # 应用入口
```

## 🎯 功能特性

### 核心功能 (P0)
- ✅ 货币转换计算
- ✅ 货币选择器
- ✅ 历史记录
- ✅ 底部导航
- ✅ 主题切换

### 重要功能 (P1)
- 🔄 Quick Pairs（快速货币对）
- ⭐ 收藏功能（货币对 + 转换结果）
- 🔄 汇率刷新

### 增强功能 (P2)
- 🔍 搜索历史
- 📊 汇率走势图
- 🔔 汇率提醒

## 🎨 设计规范

### 颜色系统
- 主色: `#6366f1` (蓝紫色)
- 深色背景: `#13151f`
- 卡片背景: `#1a1d29`

### 字体
- Crimson Text (400, 600, 700)

### 尺寸
- 卡片圆角: 16dp
- 按钮圆角: 32dp
- 页面边距: 24dp

## 🛠️ 技术栈

- **Framework**: NativeScript 8.9+
- **UI Framework**: Vue.js 2.6
- **Language**: TypeScript 5.4
- **State Management**: Vuex
- **HTTP**: @nativescript/core Http
- **Storage**: ApplicationSettings / SecureStorage

## 📝 开发规范

### 命名约定
- 组件: PascalCase (e.g., `CurrencyCard.vue`)
- 文件夹: kebab-case (e.g., `currency-picker/`)
- 变量/函数: camelCase (e.g., `convertCurrency`)
- 常量: UPPER_SNAKE_CASE (e.g., `DEFAULT_CURRENCY`)

### Git 提交规范
```
<type>: <简短描述>

🚀 主要更新:
- 具体变更1
- 具体变更2

✅ 验证完成:
- 验证项目1
```

类型: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

## 🐛 调试

### Chrome DevTools
```bash
ns debug ios --chrome
ns debug android --chrome
```

然后在 Chrome 打开: `chrome://inspect`

### 日志
```typescript
import { Trace } from '@nativescript/core';

// 启用追踪
Trace.enable();
Trace.addCategories(Trace.categories.Debug);

// 输出日志
console.log('Debug info');
```

## 📦 构建发布

### iOS Release 构建
```bash
# 清理项目
ns clean

# Release 构建
ns build ios --for-device --release

# 使用 Xcode Archive 进行归档
# 在 Xcode 中打开 platforms/ios/OrbitRateNative.xcodeproj
# Product > Archive > Distribute App
```

### 构建配置
- **Team ID**: ZWR64GCC4R
- **Team Name**: Zemin Lu
- **Bundle ID**: org.nativescript.OrbitRateNative
- **Version**: 1.0.0

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可

MIT License

---

**Version**: 1.0.0  
**Last Updated**: 2025-10-13

