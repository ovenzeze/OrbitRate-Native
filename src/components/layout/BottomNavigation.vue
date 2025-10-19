<template>
  <Frame id="mainFrame" defaultPage="~/views/TestPage">
    <!-- Frame 将自动加载默认页面 -->
  </Frame>
</template>

<script lang="ts">
import Vue from 'nativescript-vue';
import { Frame } from '@nativescript/core';

export default Vue.extend({
  name: 'BottomNavigation',
  mounted() {
    // 设置全局导航方法
    (global as any).navigateToPage = this.navigateToPage;
  },
  methods: {
    navigateToPage(pageName: string) {
      const frame = Frame.getFrameById('mainFrame');
      if (frame) {
        const pageMap = {
          convert: '~/views/Convert',
          history: '~/views/History', 
          favorites: '~/views/Favorites',
          settings: '~/views/Settings'
        };
        
        const pagePath = pageMap[pageName as keyof typeof pageMap];
        if (pagePath) {
          frame.navigate(pagePath);
          console.log(`[Navigation] Navigated to ${pageName} page`);
        }
      }
    }
  }
});
</script>

<style scoped lang="scss">
@use '../../styles/variables' as *;

// Frame 容器样式
#mainFrame {
  background-color: $bg-primary;
}
</style>

