<template>
  <Page class="page">
    <GridLayout rows="auto, *, auto">
      <!-- 固定标题栏 - iOS 原生风格 -->
      <GridLayout row="0" class="title-bar" columns="auto, *, auto">
        <!-- 左侧按钮区域 -->
        <StackLayout col="0" class="title-bar-left">
          <!-- 预留位置，可根据需要添加返回按钮等 -->
        </StackLayout>
        
        <!-- 居中标题 -->
        <Label col="1" :text="currentTitle" class="title-bar-text" />
        
        <!-- 右侧按钮区域 -->
        <StackLayout col="2" class="title-bar-right">
          <!-- 预留位置，可根据需要添加操作按钮 -->
        </StackLayout>
      </GridLayout>
      
      <!-- 主内容区域 -->
      <StackLayout row="1">
        <component :is="currentComponent" :key="activeTab" class="fade-in" />
      </StackLayout>

      <!-- 底部导航栏 -->
      <GridLayout row="2" columns="*, *, *, *" class="bottom-nav">
        <StackLayout 
          col="0" 
          class="nav-item"
          :class="{ active: activeTab === 'convert' }"
          @tap="switchTab('convert')"
        >
          <Icon name="convert" :size="24" :color="activeTab === 'convert' ? '#6366f1' : '#71717a'" class="nav-icon" />
          <Label text="Convert" class="nav-label" />
        </StackLayout>

        <StackLayout 
          col="1" 
          class="nav-item"
          :class="{ active: activeTab === 'history' }"
          @tap="switchTab('history')"
        >
          <Icon name="history" :size="24" :color="activeTab === 'history' ? '#6366f1' : '#71717a'" class="nav-icon" />
          <Label text="History" class="nav-label" />
        </StackLayout>

        <StackLayout 
          col="2" 
          class="nav-item"
          :class="{ active: activeTab === 'favorites' }"
          @tap="switchTab('favorites')"
        >
          <Icon name="favorites" :size="24" :color="activeTab === 'favorites' ? '#6366f1' : '#71717a'" class="nav-icon" />
          <Label text="Favorites" class="nav-label" />
        </StackLayout>

        <StackLayout 
          col="3" 
          class="nav-item"
          :class="{ active: activeTab === 'settings' }"
          @tap="switchTab('settings')"
        >
          <Icon name="settings" :size="24" :color="activeTab === 'settings' ? '#6366f1' : '#71717a'" class="nav-icon" />
          <Label text="Settings" class="nav-label" />
        </StackLayout>
      </GridLayout>
    </GridLayout>
  </Page>
</template>

<script lang="ts">
import Vue from 'nativescript-vue';
import { ApplicationSettings } from '@nativescript/core';
import Convert from '../../views/Convert.vue';
import History from '../../views/History.vue';
import Favorites from '../../views/Favorites.vue';
import Settings from '../../views/Settings.vue';
import Icon from '../Icon.vue';

const LAST_TAB_KEY = 'lastActiveTab';

export default Vue.extend({
  name: 'BottomNavigation',
  components: {
    Convert,
    History,
    Favorites,
    Settings,
    Icon
  },
  data() {
    // 恢复上次的标签页
    const lastTab = ApplicationSettings.getString(LAST_TAB_KEY, 'convert') as 'convert' | 'history' | 'favorites' | 'settings';
    
    return {
      activeTab: lastTab
    };
  },
  computed: {
    currentComponent(): string {
      const componentMap = {
        convert: 'Convert',
        history: 'History',
        favorites: 'Favorites',
        settings: 'Settings'
      };
      return componentMap[this.activeTab];
    },
    currentTitle(): string {
      const titleMap = {
        convert: 'Currency',
        history: 'History',
        favorites: 'Favorites',
        settings: 'Settings'
      };
      return titleMap[this.activeTab];
    }
  },
  methods: {
    switchTab(tab: 'convert' | 'history' | 'favorites' | 'settings') {
      if (this.activeTab === tab) {
        return; // 防止重复切换
      }
      
      this.activeTab = tab;
      
      // 保存当前标签页状态
      ApplicationSettings.setString(LAST_TAB_KEY, tab);
      
      console.log(`[Navigation] Switched to ${tab} tab`);
    },
    showInfo() {
      console.log('[Navigation] Show info tapped');
      // TODO: 显示应用信息或帮助
    }
  }
});
</script>

<style scoped lang="scss">
@import '../../styles/variables';

.page {
  background-color: $bg-primary;
}

// 固定标题栏 - iOS 原生风格
.title-bar {
  background-color: $bg-primary;
  padding: 8 16;
  border-bottom-width: 0;
  border-bottom-color: rgba(255, 255, 255, 0.08);
}

.title-bar-left,
.title-bar-right {
  width: 60;
  vertical-align: center;
}

.title-bar-text {
  font-size: 24;
  font-weight: 600;
  color: $text-primary;
  text-align: center;
  vertical-align: center;
}

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

