# Iconify Icon System Usage Guide

## 概述

OrbitRate Native 集成了 Iconify 多图标库系统，支持四个主流图标库，提供类似 Nuxt Icon 的使用体验。

## 支持的图标库

| 前缀 | 图标库 | 描述 | 图标数量 |
|------|--------|------|----------|
| `ph:` | Phosphor Icons | 现代、优雅的图标库 | ~6,000 |
| `fa:` | Font Awesome 6 | 最流行的图标库 | ~2,000 |
| `heroicons:` | Heroicons | Tailwind 官方图标库 | ~300 |
| `mdi:` | Material Design Icons | Google Material 图标 | ~7,000 |

## 基础使用

### 1. 导入组件

```vue
<script>
import IconifyIcon from '@/components/IconifyIcon.vue';

export default {
  components: {
    IconifyIcon
  }
};
</script>
```

### 2. 使用图标

```vue
<template>
  <StackLayout>
    <!-- Phosphor Icons -->
    <IconifyIcon name="ph:house" size="lg" color="#6366f1" />
    <IconifyIcon name="ph:heart" size="md" color="#ef4444" />
    
    <!-- Font Awesome -->
    <IconifyIcon name="fa:home" size="lg" color="#10b981" />
    <IconifyIcon name="fa:star" size="md" color="#f59e0b" />
    
    <!-- Heroicons -->
    <IconifyIcon name="heroicons:home" size="lg" color="#8b5cf6" />
    <IconifyIcon name="heroicons:heart" size="md" color="#ec4899" />
    
    <!-- Material Design Icons -->
    <IconifyIcon name="mdi:home" size="lg" color="#06b6d4" />
    <IconifyIcon name="mdi:heart" size="md" color="#f43f5e" />
  </StackLayout>
</template>
```

## Props API

### name (必填)
- **类型**: `string`
- **格式**: `collection:icon-name`
- **示例**: `"ph:house"`, `"fa:home"`, `"heroicons:home"`, `"mdi:home"`

### size (可选)
- **类型**: `string | number`
- **默认值**: `'md'`
- **预设值**: `'xs'`, `'sm'`, `'md'`, `'lg'`, `'xl'`, `'2xl'`
- **自定义**: 数字值（像素）

```vue
<!-- 预设尺寸 -->
<IconifyIcon name="ph:house" size="lg" />

<!-- 自定义尺寸 -->
<IconifyIcon name="ph:house" :size="28" />
```

### color (可选)
- **类型**: `string`
- **默认值**: `'#ffffff'`
- **支持格式**: 十六进制、RGB、HSL、颜色名称

```vue
<!-- 十六进制 -->
<IconifyIcon name="ph:house" color="#6366f1" />

<!-- RGB -->
<IconifyIcon name="ph:house" color="rgb(99, 102, 241)" />

<!-- 颜色名称 -->
<IconifyIcon name="ph:house" color="blue" />
```

## 常用图标示例

### 导航图标
```vue
<IconifyIcon name="ph:house" size="lg" color="#6366f1" />      <!-- 首页 -->
<IconifyIcon name="ph:gear" size="lg" color="#10b981" />       <!-- 设置 -->
<IconifyIcon name="ph:heart" size="lg" color="#ef4444" />      <!-- 收藏 -->
<IconifyIcon name="ph:clock" size="lg" color="#f59e0b" />      <!-- 历史 -->
```

### 操作图标
```vue
<IconifyIcon name="ph:plus" size="md" color="#22c55e" />       <!-- 添加 -->
<IconifyIcon name="ph:minus" size="md" color="#ef4444" />      <!-- 删除 -->
<IconifyIcon name="ph:check" size="md" color="#10b981" />      <!-- 确认 -->
<IconifyIcon name="ph:x" size="md" color="#ef4444" />          <!-- 取消 -->
```

### 内容图标
```vue
<IconifyIcon name="ph:file" size="md" color="#3b82f6" />       <!-- 文件 -->
<IconifyIcon name="ph:folder" size="md" color="#8b5cf6" />     <!-- 文件夹 -->
<IconifyIcon name="ph:image" size="md" color="#06b6d4" />      <!-- 图片 -->
<IconifyIcon name="ph:download" size="md" color="#10b981" />   <!-- 下载 -->
```

## 性能特性

### 智能缓存
- 图标自动缓存，避免重复网络请求
- 内存缓存，应用重启后重新加载
- 缓存命中率统计

### 加载状态
- 加载中显示 ⏳ 占位符
- 加载失败显示 ❓ 占位符
- 2秒超时保护

### 错误处理
- 网络错误自动降级
- 无效图标名称处理
- 控制台警告日志

## 最佳实践

### 1. 图标选择
- 优先使用 Phosphor Icons（现代、一致）
- 常用图标考虑预加载
- 避免频繁切换图标库

### 2. 性能优化
- 相同图标复用组件实例
- 合理设置图标尺寸
- 避免在列表中使用过多图标

### 3. 样式建议
- 使用主题颜色变量
- 保持图标尺寸一致性
- 考虑深色/浅色主题适配

```vue
<!-- 推荐：使用主题颜色 -->
<IconifyIcon name="ph:house" size="lg" color="$color-accent" />

<!-- 推荐：保持尺寸一致 -->
<IconifyIcon name="ph:house" size="lg" />
<IconifyIcon name="ph:gear" size="lg" />
```

## 测试页面

访问 **Settings > Development > Icon Test** 查看：
- 所有图标库示例
- 尺寸和颜色演示
- 性能统计信息
- 缓存测试功能

## 故障排除

### 图标不显示
1. 检查图标名称格式：`collection:icon-name`
2. 确认网络连接正常
3. 查看控制台错误日志

### 加载缓慢
1. 检查网络连接
2. 查看缓存命中率
3. 考虑预加载常用图标

### 样式问题
1. 检查 color 属性格式
2. 确认 size 属性值
3. 验证父容器样式

## 更新日志

### v1.0.0
- 支持四个图标库：ph, fa, heroicons, mdi
- 智能缓存系统
- 完整的错误处理
- 性能统计功能
- 测试页面集成

