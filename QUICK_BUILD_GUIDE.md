# OrbitRate iOS 快速构建指南

**目标**: 最快速度完成 iOS 应用构建和上传

---

## 🎯 最简单的方法：使用 Xcode

### 前提条件
- ✅ 已安装 Xcode 14+
- ✅ 已配置 Apple Developer 账号
- ✅ 证书已安装在钥匙串

### 步骤（15分钟完成）

#### 1. 打开项目（1分钟）

```bash
cd /Users/clayzhang/Code/OrbitRate-Native
open platforms/ios/OrbitRateNative.xcodeproj
```

**如果 platforms/ios 不存在**: 
见下面的"初始化平台"部分。

---

#### 2. 配置签名（2分钟）

在 Xcode 中：

1. 左侧选择项目 "OrbitRateNative"（蓝色图标）
2. 选择 TARGETS > OrbitRateNative
3. 点击 "Signing & Capabilities" 标签
4. 配置如下：
   - ✅ Automatically manage signing: **勾选**
   - Team: **Zemin Lu (ZWR64GCC4R)**
   - Signing Certificate: **Apple Development** (Debug) / **Apple Distribution** (Release)

如果看到错误，点击 "Try Again" 或手动选择证书。

---

#### 3. 选择目标设备（30秒）

在 Xcode 顶部工具栏：
- 点击设备选择器（OrbitRateNative > iPhone 15 Pro 之类的）
- 选择 **"Any iOS Device (arm64)"** 或 **"Generic iOS Device"**

⚠️ **重要**: 必须选择真实设备或 Generic，不能是模拟器！

---

#### 4. Archive（5-10分钟）

1. Menu: **Product** > **Archive**
2. 等待构建完成（进度在顶部显示）
3. 如果有错误，查看错误信息并修复

**常见错误**:
- "Signing requires a development team": 回到步骤2重新配置
- "Code signing error": 检查钥匙串中的证书
- "Bundle identifier has already been registered": 正常，继续

---

#### 5. 上传到 App Store Connect（2分钟）

Archive 成功后会自动打开 **Organizer** 窗口：

1. 选择刚才的 Archive（最上面的）
2. 点击右侧 **"Distribute App"** 按钮
3. 选择 **"App Store Connect"**
4. 选择 **"Upload"**
5. 保持默认选项，点击 **"Next"**
6. 确认信息，点击 **"Upload"**
7. 等待上传完成（看到 ✓ 成功提示）

---

#### 6. 在 App Store Connect 中查看（1分钟）

1. 打开浏览器访问: https://appstoreconnect.apple.com
2. 登录账号: wapiti.zemin.lu@gmail.com
3. 选择 "My Apps"
4. 应该能看到 OrbitRate（或需要创建新应用）
5. 等待处理（10-30分钟）

---

## 🔧 初始化平台（如果需要）

如果 `platforms/ios` 目录不存在，需要先初始化：

### 选项 A：尝试 NativeScript CLI

```bash
cd /Users/clayzhang/Code/OrbitRate-Native
ns platform add ios
```

如果成功，继续步骤 1。  
如果失败，使用选项 B。

### 选项 B：手动修复 CLI（5分钟）

```bash
# 1. 卸载当前的 NativeScript
pnpm remove -g nativescript

# 2. 使用 npm 重新安装
npm install -g nativescript

# 3. 初始化平台
ns platform add ios

# 4. 继续步骤 1
```

---

## ⚡ Debug 构建（快速测试）

如果只是想测试应用，不需要 Archive：

```bash
# 在模拟器中运行
cd /Users/clayzhang/Code/OrbitRate-Native
ns run ios
```

或在 Xcode 中：
1. 选择模拟器（如 iPhone 15 Pro）
2. 点击播放按钮 ▶️
3. 等待构建和启动

---

## 📊 进度检查

- [ ] Xcode 项目已打开
- [ ] 代码签名配置完成
- [ ] 选择了 Generic iOS Device
- [ ] Archive 成功创建
- [ ] 上传到 App Store Connect
- [ ] 在 appstoreconnect.apple.com 中可见

---

## ❌ 故障排除

### Archive 按钮灰色
- **原因**: 选择了模拟器
- **解决**: 重新选择 "Generic iOS Device"

### "No signing certificate found"
- **原因**: 证书未安装或过期
- **解决**: 打开 Xcode > Preferences > Accounts > Download Manual Profiles

### "Build failed"
- **原因**: 代码错误或依赖问题
- **解决**: 查看错误信息，修复后重试

### 上传后在 App Store Connect 看不到
- **原因**: 处理需要时间
- **解决**: 等待 10-30 分钟，刷新页面

---

## 🎉 成功后的步骤

Archive 上传成功后：

1. **等待处理**: 10-30分钟
2. **准备截图**: 至少 iPhone 6.7" 和 6.5" 各3张
3. **填写元数据**:
   - App 名称: OrbitRate
   - 副标题: 优雅的汇率转换工具
   - 描述: 见 `docs/IOS_RELEASE_CHECKLIST.md`
   - 关键词: 汇率,货币,转换,外汇
   - 分类: Finance

4. **提交审核**: 在 App Store Connect 中点击 "Submit for Review"

---

## 📞 关键信息

- **Team ID**: ZWR64GCC4R
- **Bundle ID**: org.nativescript.OrbitRateNative
- **Version**: 1.0.0
- **Apple ID**: wapiti.zemin.lu@gmail.com

---

**最后更新**: 2025-10-13  
**预计总时间**: 15-20分钟（不含 App Store 处理时间）

