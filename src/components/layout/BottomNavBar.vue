<template>
  <GridLayout columns="*, *, *, *" class="bottom-nav">
    <StackLayout 
      col="0" 
      class="nav-item"
      :class="{ active: activeTab === 'convert' }"
      @tap="navigateToPage('convert')"
    >
      <Icon name="convert" :size="24" :color="activeTab === 'convert' ? '#6366f1' : '#71717a'" class="nav-icon" />
      <Label text="Convert" class="nav-label" />
    </StackLayout>

    <StackLayout 
      col="1" 
      class="nav-item"
      :class="{ active: activeTab === 'history' }"
      @tap="navigateToPage('history')"
    >
      <Icon name="history" :size="24" :color="activeTab === 'history' ? '#6366f1' : '#71717a'" class="nav-icon" />
      <Label text="History" class="nav-label" />
    </StackLayout>

    <StackLayout 
      col="2" 
      class="nav-item"
      :class="{ active: activeTab === 'favorites' }"
      @tap="navigateToPage('favorites')"
    >
      <Icon name="favorites" :size="24" :color="activeTab === 'favorites' ? '#6366f1' : '#71717a'" class="nav-icon" />
      <Label text="Favorites" class="nav-label" />
    </StackLayout>

    <StackLayout 
      col="3" 
      class="nav-item"
      :class="{ active: activeTab === 'settings' }"
      @tap="navigateToPage('settings')"
    >
      <Icon name="settings" :size="24" :color="activeTab === 'settings' ? '#6366f1' : '#71717a'" class="nav-icon" />
      <Label text="Settings" class="nav-label" />
    </StackLayout>
  </GridLayout>
</template>

<script lang="ts">
import Vue from 'nativescript-vue';
import { Frame } from '@nativescript/core';
import Icon from '../Icon.vue';

export default Vue.extend({
  name: 'BottomNavBar',
  components: {
    Icon
  },
  props: {
    activeTab: {
      type: String,
      default: 'convert'
    }
  },
  methods: {
    navigateToPage(pageName: string) {
      const frame = Frame.getFrameById('mainFrame');
      if (frame) {
        const pageMap = {
          convert: 'src/views/Convert',
          history: 'src/views/History', 
          favorites: 'src/views/Favorites',
          settings: 'src/views/Settings'
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

.bottom-nav {
  background-color: rgba(24, 24, 27, 0.85);
  backdrop-filter: blur(10px);
  border-top-width: 0.5;
  border-top-color: rgba(255, 255, 255, 0.05);
  padding: 8 0 12 0;
}

.nav-item {
  padding: 8;
  horizontal-align: center;
  vertical-align: center;
}

.nav-icon {
  font-size: 24;
  text-align: center;
  margin-bottom: 4;
  opacity: 0.4;
  transition: opacity 0.2s;
}

.nav-label {
  font-size: 10;
  text-align: center;
  color: rgba(161, 161, 170, 0.7);
  letter-spacing: 0.02;
}

.nav-item.active .nav-icon {
  opacity: 1;
}

.nav-item.active .nav-label {
  color: $color-accent;
  font-weight: $font-weight-semibold;
  opacity: 1;
}
</style>

