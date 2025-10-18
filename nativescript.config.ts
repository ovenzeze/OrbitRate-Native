import { NativeScriptConfig } from '@nativescript/core';

export default {
  id: 'org.nativescript.OrbitRateNative',
  appPath: 'app',
  appResourcesPath: 'App_Resources',
  android: {
    v8Flags: '--expose_gc',
    markingMode: 'none',
    // 添加性能优化配置
    enableProguard: true,
    generateTypings: true,
    // 内存优化
    maxHeapSize: '512m'
  },
  ios: {
    // iOS 优化配置
    enableProguard: true,
    generateTypings: true
  },
  // 添加插件配置
  plugins: [
    // 如果需要使用特定插件，在这里配置
  ],
  // 添加钩子配置
  hooks: [
    // 构建钩子
  ]
} as NativeScriptConfig;