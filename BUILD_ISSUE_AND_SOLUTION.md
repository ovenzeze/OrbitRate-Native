# OrbitRate iOS 构建问题与解决方案

**日期**: 2025-10-13  
**问题**: NativeScript CLI 构建失败

---

## 🔴 当前问题

### 错误信息
```
Error: Cannot find module 'readable-stream/passthrough'
Require stack:
- /Users/clayzhang/Library/pnpm/global/5/.pnpm/node_modules/lazystream/lib/lazystream.js
- /Users/clayzhang/Library/pnpm/global/5/.pnpm/nativescript@8.9.3_@types+node@22.5.2_encoding@0.1.13/node_modules/archiver/...
```

### 问题分析
1. 全局 pnpm 安装的 NativeScript CLI (v8.9.3) 缺少 `readable-stream` 模块
2. NativeScript CLI 的虚拟存储结构导致模块查找失败
3. 已移除 @nativescript/tailwind 依赖但问题依然存在

---

## ✅ 已完成的配置

### 1. 核心配置 ✓
- [x] Team ID: ZWR64GCC4R
- [x] Apple ID: wapiti.zemin.lu@gmail.com
- [x] 代码签名配置
- [x] Info.plist 权限配置
- [x] TypeScript 编译通过
- [x] 移除 Tailwind 依赖（临时解决方案）

### 2. 资源文件 ✓
- [x] App Icons 完整（15个尺寸）
- [x] LaunchScreen 配置
- [x] 字体资源齐全

### 3. 文档 ✓
- [x] README.md 更新
- [x] 上线检查清单
- [x] 配置总结文档

---

## 🚀 推荐解决方案（按优先级）

### 方案一：使用 Xcode 直接构建 ⭐ 推荐

这是最可靠的方法，完全绕过 NativeScript CLI 的问题。

#### 步骤：

**1. 初始化 iOS 平台**
```bash
cd /Users/clayzhang/Code/OrbitRate-Native
ns platform add ios
```

如果这一步也失败，直接跳到方案二。

**2. 在 Xcode 中打开项目**
```bash
open platforms/ios/OrbitRateNative.xcodeproj
```

**3. 配置签名**
- 选择项目 > OrbitRateNative target
- Signing & Capabilities
- Team: Zemin Lu (ZWR64GCC4R)
- Signing Certificate: Apple Distribution / Apple Development

**4. 选择设备**
- 顶部工具栏选择 "Generic iOS Device" 或真实设备

**5. Archive**
- Menu: Product > Archive
- 等待构建完成（可能需要5-10分钟）
- Archive 完成后会自动打开 Organizer

**6. 发布到 App Store**
- 选择刚才的 Archive
- 点击 "Distribute App"
- 选择 "App Store Connect"
- 选择 "Upload"
- 按照向导完成上传

**优点**:
- ✅ 完全绕过 CLI 问题
- ✅ Xcode 是最稳定的构建方式
- ✅ 可以直接 Archive 和上传

**缺点**:
- ⚠️  需要先用 CLI 初始化 iOS 平台（一次性操作）

---

### 方案二：修复全局 pnpm NativeScript CLI

如果方案一的 `ns platform add ios` 也失败，需要修复全局环境。

#### 选项 2A：手动修复 pnpm 虚拟存储

```bash
# 1. 导航到 pnpm 全局 node_modules
cd /Users/clayzhang/Library/pnpm/global/5/.pnpm/node_modules

# 2. 安装 readable-stream
npm install readable-stream

# 3. 创建符号链接（如果需要）
ln -s /Users/clayzhang/Library/pnpm/global/5/node_modules/readable-stream ./readable-stream
```

#### 选项 2B：重新安装 NativeScript CLI

```bash
# 1. 卸载当前版本
pnpm remove -g nativescript

# 2. 清理 pnpm 缓存
pnpm store prune

# 3. 重新安装
pnpm add -g nativescript

# 4. 批准构建脚本
pnpm approve-builds -g nativescript
```

#### 选项 2C：使用 npm 安装 NativeScript

绕过 pnpm，直接使用 npm：

```bash
# 1. 卸载 pnpm 版本
pnpm remove -g nativescript

# 2. 使用 npm 全局安装
npm install -g nativescript

# 3. 验证
which ns
ns --version
```

---

### 方案三：使用 npx 运行本地 NativeScript

不使用全局 CLI，而是使用项目本地的版本：

```bash
cd /Users/clayzhang/Code/OrbitRate-Native

# 确保本地有 @nativescript/cli
pnpm add -D @nativescript/cli

# 使用 npx 运行
npx nativescript build ios --for-device --release
```

---

## 🎯 最快上线路径

### 立即执行（5-10分钟）

```bash
# 1. 进入项目目录
cd /Users/clayzhang/Code/OrbitRate-Native

# 2. 确保有 platforms/ios（如果没有，使用方案二修复 CLI 后再执行）
if [ ! -d "platforms/ios" ]; then
  echo "需要先初始化 iOS 平台"
  echo "请先修复 NativeScript CLI 或使用 Xcode 手动创建"
else
  echo "iOS 平台已存在，可以直接用 Xcode 打开"
fi

# 3. 在 Xcode 中打开
open platforms/ios/OrbitRateNative.xcodeproj

# 4. 按照方案一的步骤 3-6 操作
```

---

## 📋 替代方案：手动创建 Xcode 项目

如果 `ns platform add ios` 也失败，可以：

1. **导出应用代码**到新的 iOS 项目
2. 手动在 Xcode 中创建新项目
3. 集成 NativeScript Runtime
4. 添加应用代码

这个过程较复杂，不推荐除非必要。

---

## 🔍 调试信息

### 当前环境
```
NativeScript CLI: 8.9.3 (全局 pnpm)
Node: v23.x
pnpm: v10.10.0
Xcode: 需要检查版本
```

### 关键路径
- 全局 CLI: `/Users/clayzhang/Library/pnpm/global/5/.pnpm/nativescript@8.9.3...`
- 项目目录: `/Users/clayzhang/Code/OrbitRate-Native`
- 证书目录: `/Users/clayzhang/Documents/Certificate/Apple Certificate/`

### 已安装的证书
- Apple Distribution: Zemin Lu (ZWR64GCC4R) ✓
- Apple Development: clay.zhang@foxmail.com (79RKG6P4G2) ✓
- Apple Development: Zemin Lu (GKRBQJ3U6U) ✓

---

## ✅ 验证清单

构建成功后，请验证：

- [ ] 应用名称显示为 "OrbitRate"
- [ ] Bundle ID 为 `org.nativescript.OrbitRateNative`
- [ ] 版本号为 1.0.0
- [ ] App 图标正确
- [ ] 代码签名成功
- [ ] Archive 成功创建

---

## 📞 需要帮助？

如果遇到问题：

1. **Xcode 构建错误**: 检查代码签名配置，确保选择了正确的 Team
2. **Archive 失败**: 确保选择了 "Generic iOS Device" 而不是模拟器
3. **上传失败**: 检查 App Store Connect 账号权限

---

## 📚 相关文档

- [iOS 上线检查清单](./docs/IOS_RELEASE_CHECKLIST.md)
- [发布总结](./RELEASE_SUMMARY.md)
- [README](./README.md)

---

**最后更新**: 2025-10-13  
**状态**: 🟡 配置完成，CLI 问题待解决，建议使用 Xcode 直接构建

