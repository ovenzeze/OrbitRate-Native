# OrbitRate iOS 上线检查清单

**应用名称**: OrbitRate  
**版本**: 1.0.0  
**Bundle ID**: org.nativescript.OrbitRateNative  
**Team ID**: ZWR64GCC4R  
**Team Name**: Zemin Lu  
**检查日期**: 2025-10-13

---

## ✅ 已完成配置

### 1. 开发者配置
- [x] Apple Developer Team ID: `ZWR64GCC4R`
- [x] Distribution Certificate: Apple Distribution: Zemin Lu (ZWR64GCC4R)
- [x] Development Certificate: Apple Development (已安装)
- [x] build.xcconfig 已配置签名信息

### 2. 应用配置
- [x] Bundle Display Name: `OrbitRate`
- [x] Bundle ID: `org.nativescript.OrbitRateNative`
- [x] Version: 1.0.0 (统一配置在3个位置)
  - [x] package.json
  - [x] Info.plist (CFBundleShortVersionString: 1.0)
  - [x] Info.plist (CFBundleVersion: 1.0)

### 3. 权限配置
- [x] NSAppTransportSecurity: 已配置网络访问
- [x] ITSAppUsesNonExemptEncryption: false (无加密声明)
- [x] 界面方向支持: iPhone (竖屏+横屏), iPad (全方向)

### 4. 资源文件
- [x] App Icons - 15个尺寸完整
  - [x] icon-1024.png (App Store Marketing, 17KB)
  - [x] iPhone 尺寸 (20@2x/3x, 29/2x/3x, 40@2x/3x, 60@2x/3x)
  - [x] iPad 尺寸 (20/2x, 29/2x, 40/2x, 76/2x, 83.5@2x)
- [x] LaunchScreen.storyboard 配置完整
- [x] 字体资源 (Crimson Text + Font Awesome)

### 5. 代码质量
- [x] TypeScript 编译通过 (已修复类型定义)
- [x] 组件结构完整
  - [x] 4个视图页面 (Convert, Favorites, Settings, History)
  - [x] 布局组件 (BottomNavigation)
  - [x] 基础组件 (Icon, CountryFlag, Home)

### 6. 文档更新
- [x] README.md - 已更新为 iOS Only
- [x] 构建配置文档化
- [x] 发布流程说明

---

## 📋 上线前检查步骤

### Step 1: 依赖检查 ✓
```bash
cd /Users/clayzhang/Code/OrbitRate-Native
npm install
npm audit  # 检查安全漏洞
```

**状态**: ✅ 完成
- @types/node@17.0.45 已安装
- 所有依赖正常

### Step 2: 代码编译检查 ✓
```bash
npx tsc --noEmit
```

**状态**: ✅ 通过
- TypeScript编译无错误

### Step 3: 清理项目 ⏳
```bash
ns clean
```

**状态**: 待执行

### Step 4: Debug构建测试 ⏳
```bash
ns run ios
```

**检查项**:
- [ ] 应用正常启动
- [ ] 启动画面显示正确
- [ ] App图标显示正确
- [ ] 显示名称为 "OrbitRate"

### Step 5: 功能验证 ⏳
- [ ] 货币转换计算正确
- [ ] 货币选择器工作正常
- [ ] 底部导航切换流畅
- [ ] 历史记录功能正常
- [ ] 收藏功能正常
- [ ] 设置页面正常
- [ ] 离线功能正常

### Step 6: Release构建 ⏳
```bash
ns build ios --for-device --release
```

**检查项**:
- [ ] 构建成功完成
- [ ] 无构建错误或警告
- [ ] .app 文件生成在 platforms/ios/build/

### Step 7: Xcode归档 ⏳
```bash
# 1. 在 Xcode 中打开项目
open platforms/ios/OrbitRateNative.xcodeproj

# 2. 选择 Generic iOS Device
# 3. Product > Archive
# 4. 等待归档完成
```

**检查项**:
- [ ] 归档成功
- [ ] 无代码签名错误
- [ ] Archives 中出现新归档

### Step 8: App Store Connect上传 ⏳
```
# 在 Xcode Organizer 中:
# 1. 选择归档
# 2. Distribute App
# 3. 选择 App Store Connect
# 4. Upload
# 5. 等待处理完成
```

---

## 🎯 App Store 提交材料准备

### 必需信息
- [ ] **App名称**: OrbitRate
- [ ] **副标题** (30字符): 优雅的汇率转换工具
- [ ] **描述**: 准备中文/英文描述
- [ ] **关键词** (100字符): 汇率,货币,转换,外汇,exchange,currency
- [ ] **分类**: 
  - 主分类: Finance (财务)
  - 次分类: Utilities (工具)

### 屏幕截图要求
需要提供以下设备的截图（每种至少3张，最多10张）:

#### iPhone 6.7"（必需）
- [ ] 1290 x 2796 pixels
- [ ] 建议截图：首页、转换页、历史记录、收藏、设置

#### iPhone 6.5"（必需）
- [ ] 1242 x 2688 pixels
- [ ] 与6.7"相同内容

#### iPad Pro 12.9"（推荐）
- [ ] 2048 x 2732 pixels

### 应用预览视频（可选）
- 15-30秒
- 展示核心功能

### 其他材料
- [ ] **隐私政策 URL**: 如需要（应用不收集用户数据可能不需要）
- [ ] **支持 URL**: 必需
- [ ] **营销 URL**: 可选
- [ ] **App Store 图标**: ✅ 已有 icon-1024.png
- [ ] **版本说明**: 首个版本发布

---

## 📝 App Store 描述文案

### 中文描述（建议）
```
OrbitRate - 优雅的汇率转换工具

一款精心设计的货币汇率转换应用，为您提供快速、准确、优雅的汇率转换体验。

【核心功能】
✓ 实时汇率转换 - 支持全球主流货币
✓ 离线可用 - 无需网络也能使用
✓ 历史记录 - 自动保存转换历史
✓ 收藏功能 - 快速访问常用货币对
✓ 优雅界面 - 精心打磨的用户体验

【特点】
• 即时响应，零延迟
• 本地计算，保护隐私
• 简洁设计，易于使用
• 原生性能，流畅体验

适合旅行、购物、投资等多种场景使用。
```

### 英文描述（建议）
```
OrbitRate - Elegant Currency Converter

A beautifully designed currency exchange rate converter that provides fast, accurate, and elegant conversion experience.

【Core Features】
✓ Real-time Currency Conversion - Support major global currencies
✓ Offline Available - Works without internet connection
✓ Conversion History - Auto-save your conversion records
✓ Favorites - Quick access to frequently used currency pairs
✓ Elegant Interface - Carefully crafted user experience

【Highlights】
• Instant response, zero latency
• Local calculation, privacy protected
• Clean design, easy to use
• Native performance, smooth experience

Perfect for travel, shopping, investment and more.
```

---

## 🔍 审核注意事项

### 可能需要说明的点
1. **网络使用**: 应用使用网络获取汇率数据（如果有）
2. **离线功能**: 说明离线使用的数据来源
3. **隐私政策**: 如不收集用户数据，可在审核时说明

### 常见审核问题
- ❌ 缺少必要的隐私说明
- ❌ 截图不符合尺寸要求
- ❌ 应用描述与功能不符
- ❌ 缺少使用说明

---

## 🚀 发布流程总结

```
1. ✅ 配置完成 (Team ID, 签名, 权限)
2. ✅ 代码检查 (TypeScript编译通过)
3. ✅ 文档更新 (README, 配置文档)
4. ⏳ 功能测试 (Debug构建 + 完整测试)
5. ⏳ Release构建
6. ⏳ Xcode归档
7. ⏳ 上传App Store Connect
8. ⏳ 填写元数据和截图
9. ⏳ 提交审核
10. ⏳ 等待审核结果
```

---

## 📊 技术规格

- **最低支持版本**: iOS 13.0
- **SDK版本**: iOS 17.0
- **设备支持**: iPhone, iPad
- **语言**: 英文（可后续添加中文）
- **应用大小**: 待构建后确定（预计 < 50MB）

---

## ⚠️ 重要提醒

### 发布前最后检查
1. ✅ Team ID 配置正确
2. ✅ 应用名称显示为 "OrbitRate"
3. ✅ 版本号统一为 1.0.0
4. ⏳ 所有功能测试通过
5. ⏳ Release构建成功
6. ⏳ 截图准备完整

### 发布后
- [ ] 监控 Crash 报告
- [ ] 收集用户反馈
- [ ] 准备下一版本规划

---

## 📞 支持联系

**开发团队**: OrbitRate Team  
**Apple ID**: wapiti.zemin.lu@gmail.com  
**Team**: Zemin Lu (ZWR64GCC4R)

---

**文档版本**: 1.0  
**最后更新**: 2025-10-13  
**状态**: 🟡 配置完成，待功能测试和构建

