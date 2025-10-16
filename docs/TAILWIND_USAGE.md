# ⚠️ Tailwind CSS 在 NativeScript 中的使用指南

> **注意**: 此文档已过时。根据构建问题，Tailwind CSS 已被临时禁用。项目当前使用 SCSS 进行样式管理。

# Tailwind CSS 在 NativeScript 中的使用指南

## 安装完成 ✅

已成功安装并配置：
- `@nativescript/tailwind` v4.0.5
- `tailwindcss` v4.1.14
- `postcss` v8.5.6

## 配置文件

### `tailwind.config.js`
- ✅ 配置了内容路径：`./app/**/*.{css,xml,html,vue,svelte,ts,tsx}`
- ✅ 启用了暗黑模式：使用 `.ns-dark` 类
- ✅ 添加了平台特定变体：`android:` 和 `ios:`
- ✅ 扩展了主题色彩（OrbitRate 品牌色）
- ✅ 禁用了 `preflight`（浏览器重置样式）

### `postcss.config.js`
- ✅ 配置了 Tailwind CSS 插件

### `app.scss`
- ✅ 引入了 Tailwind 指令

## 使用方法

### 1. 基础样式类

在 XML/Vue 模板中直接使用 Tailwind 类：

```xml
<Label text="Hello World" class="text-xl font-bold text-primary" />
```

### 2. 响应式设计

NativeScript 不支持传统的响应式断点，但可以使用平台特定样式：

```xml
<Label 
  text="Platform Specific" 
  class="text-base ios:text-lg android:text-sm" 
/>
```

### 3. 暗黑模式

NativeScript 会自动在根元素添加 `.ns-dark` 类：

```xml
<Label 
  text="Dark Mode" 
  class="text-text-primary dark:text-text-secondary" 
/>
```

### 4. 自定义颜色

已在 `tailwind.config.js` 中定义的品牌色：

```xml
<!-- 主色 -->
<Button class="bg-primary text-white" />

<!-- 强调色 -->
<Label class="text-accent" />

<!-- 背景色 -->
<StackLayout class="bg-bg-secondary" />

<!-- 文字色 -->
<Label class="text-text-primary" />
<Label class="text-text-secondary" />
<Label class="text-text-tertiary" />
```

### 5. 间距和布局

```xml
<!-- Padding -->
<StackLayout class="p-4 px-6 py-8" />

<!-- Margin -->
<Label class="m-4 mx-auto my-2" />

<!-- Flexbox (使用 NativeScript 的 FlexboxLayout) -->
<FlexboxLayout class="flex-row justify-between items-center" />
```

### 6. 圆角和边框

```xml
<StackLayout class="rounded-lg border border-gray-300" />
<Button class="rounded-full" />
```

### 7. 字体

```xml
<Label class="font-sans text-base" />
<Label class="font-mono text-sm" />
<Label class="font-bold text-xl" />
```

## 支持的 Tailwind 功能

### ✅ 完全支持
- 颜色（text, background, border）
- 间距（padding, margin）
- 字体大小和粗细
- 圆角
- 不透明度
- 平台特定样式（ios:, android:）
- 暗黑模式（dark:）

### ⚠️ 部分支持
- Flexbox（需要使用 FlexboxLayout）
- Grid（需要使用 GridLayout）
- 定位（absolute, relative）

### ❌ 不支持
- 伪类（hover, focus, active）- 使用 NativeScript 的触摸事件
- 动画类 - 使用 NativeScript 的动画 API
- 媒体查询 - 使用平台特定样式
- 阴影 - 使用 NativeScript 的 elevation（Android）或 shadow 属性（iOS）

## 示例：转换现有样式

### 之前（SCSS）
```scss
.card {
  background-color: #18181b;
  border-radius: 16;
  padding: 16;
  margin-bottom: 12;
}
```

### 之后（Tailwind）
```xml
<StackLayout class="bg-bg-secondary rounded-card p-card mb-3" />
```

## 最佳实践

1. **混合使用**：Tailwind 用于常见样式，复杂动画和特定效果使用 SCSS
2. **自定义主题**：在 `tailwind.config.js` 中扩展主题以匹配设计系统
3. **平台特定**：使用 `ios:` 和 `android:` 前缀处理平台差异
4. **组件类**：使用 `@apply` 指令创建可复用的组件类

## 性能提示

- Tailwind 会在构建时生成 CSS，不影响运行时性能
- 只有实际使用的类会被包含在最终包中
- 建议定期清理未使用的类

## 调试

如果样式不生效：
1. 检查 `tailwind.config.js` 中的 `content` 路径
2. 确保文件扩展名在配置中
3. 重新构建项目：`ns clean` 然后 `ns run`
4. 检查是否与现有 SCSS 样式冲突

## 下一步

现在可以开始在项目中使用 Tailwind CSS！建议：
1. 逐步迁移现有组件
2. 为常用样式组合创建自定义类
3. 利用平台特定样式优化 UI


