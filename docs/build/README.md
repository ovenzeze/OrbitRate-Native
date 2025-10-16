# 构建和发布文档

本目录包含 OrbitRate Native 项目的所有构建和发布相关文档。

---

## 📚 文档索引

### 快速开始
- **[快速构建指南](./QUICK_BUILD_GUIDE.md)** - 15分钟完成 iOS 应用构建和上传
- **[设备安装指南](./INSTALL_ON_DEVICE.md)** - 在开发设备上安装和测试应用

### 问题解决
- **[构建问题与解决方案](./BUILD_ISSUE_AND_SOLUTION.md)** - 常见构建问题的解决方案

### 发布流程
- **[iOS 发布检查清单](../IOS_RELEASE_CHECKLIST.md)** - 完整的 App Store 发布检查清单

---

## 🚀 推荐工作流

### 1. 首次构建
1. 阅读 [快速构建指南](./QUICK_BUILD_GUIDE.md)
2. 按照指南在 Xcode 中打开项目
3. 配置代码签名
4. 选择设备并运行

### 2. 设备测试
1. 参考 [设备安装指南](./INSTALL_ON_DEVICE.md)
2. 在真机上测试所有功能
3. 验证用户体验

### 3. 发布准备
1. 查看 [iOS 发布检查清单](../IOS_RELEASE_CHECKLIST.md)
2. 准备 App Store 截图和元数据
3. 创建 Release Archive
4. 上传到 App Store Connect

### 4. 问题排查
如果遇到构建问题，参考 [构建问题与解决方案](./BUILD_ISSUE_AND_SOLUTION.md)

---

## ⚡ 快速命令

```bash
# 打开 Xcode 项目
open platforms/ios/OrbitRateNative.xcodeproj

# 清理项目
ns clean

# 在设备上运行
ns run ios --device

# 创建发布构建
ns build ios --for-device --release
```

---

## 📞 需要帮助？

如果遇到问题：

1. **构建失败**: 查看 [构建问题与解决方案](./BUILD_ISSUE_AND_SOLUTION.md)
2. **设备连接问题**: 参考 [设备安装指南](./INSTALL_ON_DEVICE.md)
3. **发布流程**: 查看 [iOS 发布检查清单](../IOS_RELEASE_CHECKLIST.md)

---

**最后更新**: 2025-10-13  
**维护者**: OrbitRate Team
