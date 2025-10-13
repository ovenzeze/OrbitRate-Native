# 在开发设备上安装 OrbitRate

**目标**: 在已注册的 iPhone/iPad 上安装和测试应用

---

## 方法一：使用 Xcode 直接安装（推荐，5分钟）

### 前提条件
- ✅ iPhone/iPad 已通过 USB 连接到 Mac
- ✅ 设备已在 Apple Developer 中注册
- ✅ 设备已信任此电脑

---

### 步骤

#### 1. 连接设备（1分钟）

```bash
# 1. 用 USB 线连接 iPhone 到 Mac
# 2. iPhone 上会弹出"信任此电脑"提示，点击"信任"
# 3. 输入设备密码
```

验证设备已连接：
```bash
# 在终端中运行
xcrun xctrace list devices
```

你应该能看到你的设备列表。

---

#### 2. 打开 Xcode 项目（30秒）

```bash
cd /Users/clayzhang/Code/OrbitRate-Native

# 如果 platforms/ios 不存在，先初始化
if [ ! -d "platforms/ios" ]; then
  echo "初始化 iOS 平台..."
  ns platform add ios
fi

# 打开项目
open platforms/ios/OrbitRateNative.xcodeproj
```

---

#### 3. 配置签名（1分钟）

在 Xcode 中：

1. 左侧选择项目 "OrbitRateNative"（蓝色图标）
2. 选择 TARGETS > OrbitRateNative
3. "Signing & Capabilities" 标签
4. 配置：
   - ✅ **Automatically manage signing**: 勾选
   - **Team**: Zemin Lu (ZWR64GCC4R)
   - **Signing Certificate**: Apple Development

Xcode 会自动处理 Provisioning Profile。

---

#### 4. 选择你的设备（30秒）

在 Xcode 顶部工具栏：
- 点击设备选择器（中间位置）
- 选择你的 iPhone/iPad（应该显示设备名称，如"Clay's iPhone"）

⚠️ 如果看不到你的设备：
- 确保设备已解锁
- 检查 USB 连接
- 尝试重新插拔
- 在设备上重新点击"信任"

---

#### 5. 运行到设备（2分钟）

1. 点击 Xcode 左上角的 **播放按钮 ▶️**（或按 Cmd + R）
2. 等待构建（第一次可能需要2-3分钟）
3. 构建完成后应用会自动安装并启动

**第一次运行时的额外步骤**：

iPhone 会提示"不受信任的开发者"：

1. 在 iPhone 上：设置 > 通用 > VPN与设备管理
2. 找到 "Zemin Lu" 或你的开发者账号
3. 点击 "信任 Zemin Lu"
4. 确认信任

5. 返回主屏幕，重新打开 OrbitRate

---

#### 6. 测试应用 ✓

应用现在运行在你的设备上！测试以下功能：

- [ ] 应用启动正常
- [ ] 显示名称为 "OrbitRate"
- [ ] App 图标显示正确
- [ ] 货币转换功能
- [ ] 底部导航工作正常
- [ ] 所有页面都能正常访问
- [ ] 没有崩溃或错误

---

## 方法二：使用 NativeScript CLI（如果 CLI 工作正常）

### 直接运行到设备

```bash
cd /Users/clayzhang/Code/OrbitRate-Native

# 查看可用设备
ns device list

# 运行到指定设备
ns run ios --device "你的设备名称"

# 或者让它自动选择
ns run ios --device
```

这个方法会：
1. 构建应用
2. 自动安装到连接的设备
3. 启动应用
4. 显示控制台日志

---

## 方法三：通过 TestFlight（适合多设备/远程测试）

### 适用场景
- 需要在多个设备上测试
- 设备不在身边（远程测试）
- 想要分享给其他测试人员

### 步骤

#### 1. 创建 Archive（使用 Xcode）

```bash
cd /Users/clayzhang/Code/OrbitRate-Native
open platforms/ios/OrbitRateNative.xcodeproj
```

在 Xcode 中：
1. 选择 "Generic iOS Device"
2. Product > Archive
3. 等待完成

#### 2. 上传到 TestFlight

Archive 完成后：
1. 选择 Archive
2. "Distribute App" > "App Store Connect" > "Upload"
3. 选择 "TestFlight & App Store"
4. 上传

#### 3. 在 App Store Connect 配置 TestFlight

1. 访问 https://appstoreconnect.apple.com
2. My Apps > OrbitRate
3. TestFlight 标签
4. 等待处理（10-30分钟）
5. 添加内部测试人员（自己的 Apple ID）

#### 4. 在设备上安装 TestFlight

1. 在 iPhone 上下载 TestFlight app（App Store）
2. 登录你的 Apple ID
3. 接受测试邀请
4. 点击 "安装"

---

## 🐛 故障排除

### 设备未显示在 Xcode 中

**解决方案**：
```bash
# 1. 检查设备连接
xcrun xctrace list devices

# 2. 重启设备和 Xcode
# 3. 检查 iOS 版本是否过低（需要 iOS 13+）
# 4. 尝试不同的 USB 线或端口
```

### "Could not launch" 错误

**原因**: 设备未信任开发者

**解决方案**：
1. iPhone: 设置 > 通用 > VPN与设备管理
2. 信任开发者证书
3. 重新运行

### "No provisioning profiles found"

**解决方案**：
```bash
# 在 Xcode 中
# 1. Preferences > Accounts
# 2. 选择 Apple ID
# 3. Download Manual Profiles
# 4. 重新尝试
```

### 构建失败

**检查**：
```bash
cd /Users/clayzhang/Code/OrbitRate-Native

# 1. 清理项目
ns clean

# 2. 重新安装依赖
rm -rf node_modules
pnpm install

# 3. 重新初始化 iOS 平台
ns platform remove ios
ns platform add ios

# 4. 在 Xcode 中重新尝试
```

---

## 📱 开发模式特性

在开发设备上运行时，你可以：

### 1. 实时日志查看

在 Xcode 中查看：
- View > Debug Area > Show Debug Area
- 可以看到 `console.log()` 输出

或使用 Safari 开发者工具：
1. iPhone: 设置 > Safari > 高级 > Web Inspector 打开
2. Mac Safari: 开发 > [你的设备] > OrbitRate

### 2. 调试

使用 Xcode 调试器：
- 设置断点
- 检查变量
- 单步执行

### 3. 热重载（HMR）

如果使用 `ns run ios`，代码更改会自动刷新应用。

---

## ✅ 测试检查清单

在真机上测试以下项目：

### 基础功能
- [ ] 应用启动速度
- [ ] 启动画面显示
- [ ] App 图标在主屏幕上显示正确
- [ ] 应用名称为 "OrbitRate"

### 核心功能
- [ ] 货币转换计算正确
- [ ] 货币选择器工作正常
- [ ] 历史记录保存和显示
- [ ] 收藏功能正常
- [ ] 设置页面可访问

### 用户体验
- [ ] 界面流畅，无卡顿
- [ ] 触摸响应正常
- [ ] 动画流畅
- [ ] 字体清晰可读
- [ ] 颜色和对比度合适

### 边界情况
- [ ] 网络断开时应用正常工作（离线功能）
- [ ] 切换到后台再返回正常
- [ ] 接听电话后返回正常
- [ ] 低电量模式下正常工作

### 不同设备（如果有）
- [ ] iPhone（不同尺寸）
- [ ] iPad（如果支持）
- [ ] 横屏模式（如果支持）

---

## 🎯 快速命令

```bash
# 查看连接的设备
xcrun xctrace list devices

# 查看 Provisioning Profiles
xcrun security find-identity -v -p codesigning

# 清理项目
cd /Users/clayzhang/Code/OrbitRate-Native
ns clean

# 查看日志
ns run ios --log trace
```

---

## 📝 开发技巧

### 1. 保持设备连接

开发时保持设备连接，这样可以：
- 快速测试更改
- 实时查看日志
- 立即发现崩溃

### 2. 使用多个测试设备

如果可能，在不同的设备上测试：
- 新款 iPhone（iOS 17）
- 旧款 iPhone（iOS 13-14）
- 不同屏幕尺寸

### 3. 记录问题

发现问题时记录：
- 设备型号和 iOS 版本
- 重现步骤
- 截图或录屏

---

## 🚀 准备提交前的最后检查

在设备上测试通过后：

1. ✅ 所有功能正常
2. ✅ 没有崩溃
3. ✅ 性能良好
4. ✅ 用户体验流畅
5. ✅ 准备好截图

然后：
- 使用 Xcode 创建 Release Archive
- 上传到 App Store Connect
- 提交审核

---

**祝测试顺利！** 🎉

如有问题，参考：
- `BUILD_ISSUE_AND_SOLUTION.md` - 构建问题
- `QUICK_BUILD_GUIDE.md` - 快速构建
- `docs/IOS_RELEASE_CHECKLIST.md` - 完整清单

