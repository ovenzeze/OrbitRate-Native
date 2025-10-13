# OrbitRate Native

<div align="center">

![OrbitRate Logo](docs/assets/logo.png)

**优雅的货币汇率转换应用 - NativeScript Vue 版本**

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/OrbitRate/OrbitRate-Native/releases)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![NativeScript](https://img.shields.io/badge/NativeScript-8.9+-orange.svg)](https://nativescript.org/)
[![Vue](https://img.shields.io/badge/Vue-2.6-brightgreen.svg)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue.svg)](https://www.typescriptlang.org/)
[![iOS](https://img.shields.io/badge/iOS-14.0+-black.svg)](https://www.apple.com/ios/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Code of Conduct](https://img.shields.io/badge/code%20of-conduct-ff69b4.svg)](CODE_OF_CONDUCT.md)

[Features](#-功能特性) • [Screenshots](#-截图) • [Installation](#-快速开始) • [Documentation](#-文档) • [Contributing](#-贡献) • [License](#-许可)

</div>

---

## 📱 项目概述

OrbitRate Native 是使用 NativeScript + Vue.js 开发的原生移动应用，提供流畅的货币汇率转换体验。

**当前平台**: 📱 iOS Only (v1.0.0)

### 核心特点
- 🎨 **原生体验**: 真正的原生性能和手感
- ⚡ **即时响应**: 本地计算，零延迟
- 📱 **优雅设计**: 精心打磨的iOS用户界面
- 💾 **离线可用**: 本地缓存，完全离线工作

## 📸 截图

<div align="center">

| Convert | History | Favorites | Settings |
|---------|---------|-----------|----------|
| ![Convert Screen](docs/screenshots/convert.png) | ![History Screen](docs/screenshots/history.png) | ![Favorites Screen](docs/screenshots/favorites.png) | ![Settings Screen](docs/screenshots/settings.png) |

*Dark mode interface with elegant animations and smooth transitions*

</div>

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

## 🗺️ 路线图

### Version 1.1.0 (Q4 2025)
- [ ] 🌐 Exchange rate API integration
- [ ] 🔄 Real-time rate updates
- [ ] 🔍 Currency search functionality
- [ ] 📊 Rate history chart

### Version 1.2.0 (Q1 2026)
- [ ] 🤖 Android platform support
- [ ] 🔔 Rate alert notifications
- [ ] 📤 Export conversion history
- [ ] 🌍 Multi-language support (中文, English, 日本語)

### Version 2.0.0 (Q2 2026)
- [ ] 📊 Advanced analytics dashboard
- [ ] 🎨 Theme customization
- [ ] 🔐 iCloud sync
- [ ] 📱 Widget support (iOS 14+)
- [ ] ⌚ Apple Watch companion app

[查看完整路线图](https://github.com/OrbitRate/OrbitRate-Native/projects)

## 🤝 贡献

我们欢迎所有形式的贡献！无论是报告 bug、提出新功能建议，还是提交代码，都请查看我们的[贡献指南](CONTRIBUTING.md)。

### 如何贡献

1. 🍴 Fork 本仓库
2. 🌱 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. ✅ 提交你的更改 (`git commit -m 'feat: add some AmazingFeature'`)
4. 📤 推送到分支 (`git push origin feature/AmazingFeature`)
5. 🎉 开启一个 Pull Request

### 贡献者

感谢所有为这个项目做出贡献的开发者！

<a href="https://github.com/OrbitRate/OrbitRate-Native/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=OrbitRate/OrbitRate-Native" />
</a>

## 📞 联系方式

- **Issues**: [GitHub Issues](https://github.com/OrbitRate/OrbitRate-Native/issues)
- **Discussions**: [GitHub Discussions](https://github.com/OrbitRate/OrbitRate-Native/discussions)
- **Email**: [Insert contact email]
- **Twitter**: [@OrbitRate](https://twitter.com/OrbitRate)

## 🙏 致谢

- [NativeScript](https://nativescript.org/) - 强大的移动应用框架
- [Vue.js](https://vuejs.org/) - 渐进式 JavaScript 框架
- [Font Awesome](https://fontawesome.com/) - 图标库
- [ExchangeRate-API](https://www.exchangerate-api.com/) - 汇率数据源
- 所有的贡献者和支持者

## 📄 许可

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## ⭐ Star History

如果这个项目对你有帮助，请给我们一个 star！⭐

[![Star History Chart](https://api.star-history.com/svg?repos=OrbitRate/OrbitRate-Native&type=Date)](https://star-history.com/#OrbitRate/OrbitRate-Native&Date)

---

<div align="center">

**Made with ❤️ by OrbitRate Team**

**Version**: 1.0.0 | **Last Updated**: 2025-10-13

[⬆ Back to Top](#orbitrate-native)

</div>

