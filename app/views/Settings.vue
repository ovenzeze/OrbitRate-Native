<template>
  <ScrollView class="page">
    <StackLayout class="container">
      <!-- Appearance Section -->
      <Label text="APPEARANCE" class="section-header" />
      
      <StackLayout class="card setting-item">
        <GridLayout columns="auto, *, auto" rows="auto">
          <StackLayout col="0" class="icon-wrapper">
            <Label text.decode="&#xf186;" class="fas setting-icon" />
          </StackLayout>
          <StackLayout col="1" class="setting-content">
            <Label text="Theme" class="setting-title" />
            <Label :text="isDarkMode ? 'Dark mode' : 'Light mode'" class="setting-description" />
          </StackLayout>
          <Switch col="2" :checked="isDarkMode" @checkedChange="onThemeChange" class="setting-switch" />
        </GridLayout>
      </StackLayout>

      <!-- General Section -->
      <Label text="GENERAL" class="section-header" />
      
      <!-- Data Source - Info item (non-clickable) -->
      <StackLayout class="card setting-item info-item">
        <GridLayout columns="auto, *" rows="auto">
          <StackLayout col="0" class="icon-wrapper">
            <Label text.decode="&#xf1c0;" class="fas setting-icon" />
          </StackLayout>
          <StackLayout col="1" class="setting-content">
            <Label text="Data Source" class="setting-title" />
            <Label text="ExchangeRate-API" class="setting-description" />
            <Label :text="'Last updated: ' + lastUpdateTime" class="setting-meta" />
          </StackLayout>
        </GridLayout>
      </StackLayout>

      <!-- Getting Started - Clickable item -->
      <StackLayout class="card setting-item clickable" @tap="onGettingStarted">
        <GridLayout columns="auto, *, auto" rows="auto">
          <StackLayout col="0" class="icon-wrapper">
            <Label text.decode="&#xf02d;" class="fas setting-icon" />
          </StackLayout>
          <StackLayout col="1" class="setting-content">
            <Label text="Getting Started" class="setting-title" />
          </StackLayout>
          <Label col="2" text.decode="&#xf054;" class="fas setting-arrow" />
        </GridLayout>
      </StackLayout>

      <!-- Restore Purchases - Clickable item -->
      <StackLayout class="card setting-item clickable" @tap="onRestorePurchases">
        <GridLayout columns="auto, *, auto" rows="auto">
          <StackLayout col="0" class="icon-wrapper">
            <Label text.decode="&#xf021;" class="fas setting-icon" />
          </StackLayout>
          <StackLayout col="1" class="setting-content">
            <Label text="Restore Purchases" class="setting-title" />
          </StackLayout>
          <Label col="2" text.decode="&#xf054;" class="fas setting-arrow" />
        </GridLayout>
      </StackLayout>

      <!-- About Section -->
      <Label text="ABOUT" class="section-header" />
      
      <StackLayout class="card setting-item clickable" @tap="onAboutApp">
        <GridLayout columns="auto, *, auto" rows="auto">
          <StackLayout col="0" class="icon-wrapper">
            <Label text.decode="&#xf05a;" class="fas setting-icon" />
          </StackLayout>
          <StackLayout col="1" class="setting-content">
            <Label text="About App" class="setting-title" />
          </StackLayout>
          <Label col="2" text.decode="&#xf054;" class="fas setting-arrow" />
        </GridLayout>
      </StackLayout>

      <StackLayout class="card setting-item clickable" @tap="onTermsOfService">
        <GridLayout columns="auto, *, auto" rows="auto">
          <StackLayout col="0" class="icon-wrapper">
            <Label text.decode="&#xf15c;" class="fas setting-icon" />
          </StackLayout>
          <StackLayout col="1" class="setting-content">
            <Label text="Terms of Service" class="setting-title" />
          </StackLayout>
          <Label col="2" text.decode="&#xf054;" class="fas setting-arrow" />
        </GridLayout>
      </StackLayout>

      <StackLayout class="card setting-item clickable" @tap="onPrivacyPolicy">
        <GridLayout columns="auto, *, auto" rows="auto">
          <StackLayout col="0" class="icon-wrapper">
            <Label text.decode="&#xf023;" class="fas setting-icon" />
          </StackLayout>
          <StackLayout col="1" class="setting-content">
            <Label text="Privacy Policy" class="setting-title" />
          </StackLayout>
          <Label col="2" text.decode="&#xf054;" class="fas setting-arrow" />
        </GridLayout>
      </StackLayout>

      <!-- Footer -->
      <StackLayout class="footer">
        <Label text="OrbitRate" class="footer-app-name" />
        <Label text="Version 1.0.0" class="footer-text" />
        <Label text="© 2025 OrbitRate" class="footer-text" />
      </StackLayout>
    </StackLayout>
  </ScrollView>
</template>

<script lang="ts">
import Vue from 'nativescript-vue';
import { NativeScriptService } from '~/services/core/nativescript.service';

const THEME_KEY = 'app_theme';
const LAST_UPDATE_KEY = 'data_last_update';

export default Vue.extend({
  name: 'Settings',
  data() {
    return {
      isDarkMode: true, // Default to dark mode
      lastUpdateTime: '5 minutes ago',
      isInitialized: false // 防止初始化时触发弹窗
    };
  },
  mounted() {
    // Load theme preference
    const savedTheme = NativeScriptService.getString(THEME_KEY, 'dark');
    this.isDarkMode = savedTheme === 'dark';
    
    // Load last update time
    const savedUpdateTime = NativeScriptService.getString(LAST_UPDATE_KEY, '5 minutes ago');
    this.lastUpdateTime = savedUpdateTime;
    
    // 标记为已初始化，防止 Switch 组件触发弹窗
    this.isInitialized = true;
    
    console.log('[Settings] Component mounted, theme:', savedTheme);
  },
  methods: {
    toggleTheme() {
      this.isDarkMode = !this.isDarkMode;
      this.saveThemePreference();
    },
    onThemeChange(args: any) {
      this.isDarkMode = args.object.checked;
      // 只有在初始化完成后才保存主题设置
      if (this.isInitialized) {
        this.saveThemePreference();
      }
    },
    saveThemePreference() {
      const theme = this.isDarkMode ? 'dark' : 'light';
      NativeScriptService.setString(THEME_KEY, theme);
      console.log('[Settings] Theme changed to:', theme);
      
      // TODO: Apply theme to entire app
      // 移除弹窗提示，避免每次切换标签页都显示
    },
    onGettingStarted() {
      console.log('[Settings] Getting Started tapped');
      NativeScriptService.showAlert({
        title: 'Getting Started',
        message: 'Welcome to OrbitRate! Convert currencies with real-time exchange rates.',
        okButtonText: 'Got it'
      });
    },
    onRestorePurchases() {
      console.log('[Settings] Restore Purchases tapped');
      NativeScriptService.showAlert({
        title: 'Restore Purchases',
        message: 'No purchases to restore.',
        okButtonText: 'OK'
      });
    },
    onAboutApp() {
      console.log('[Settings] About App tapped');
      NativeScriptService.showAlert({
        title: 'About OrbitRate',
        message: 'OrbitRate is a modern currency converter app with support for 150+ currencies.\n\nVersion: 1.0.0',
        okButtonText: 'OK'
      });
    },
    onTermsOfService() {
      console.log('[Settings] Terms of Service tapped');
      NativeScriptService.showAlert({
        title: 'Terms of Service',
        message: 'Terms of Service will be displayed here.',
        okButtonText: 'OK'
      });
    },
    onPrivacyPolicy() {
      console.log('[Settings] Privacy Policy tapped');
      NativeScriptService.showAlert({
        title: 'Privacy Policy',
        message: 'Privacy Policy will be displayed here.',
        okButtonText: 'OK'
      });
    }
  }
});
</script>

<style scoped lang="scss">
@import '../styles/variables';

.container {
  padding: $spacing-page;
}

// Section headers
.section-header {
  font-size: 13;
  font-weight: $font-weight-semibold;
  color: #71717a;
  text-transform: uppercase;
  letter-spacing: 0.01;
  margin-bottom: 10;
  margin-top: 24;
  padding-left: 4;
}

.section-header:first-child {
  margin-top: 0;
}

// Setting item container
.setting-item {
  margin-bottom: 8;
  padding: 14 16;
  background-color: $bg-secondary;
  border-radius: 12;
}

// Info item (non-clickable)
.info-item {
  opacity: 0.95;
}

// Clickable items
.clickable {
  &:active {
    background-color: rgba(99, 102, 241, 0.08);
    transform: scale(0.98);
  }
}

// Icon wrapper (left side)
.icon-wrapper {
  width: 40;
  height: 40;
  background-color: rgba(99, 101, 241, 0.019);
  border-radius: 20;
  margin-right: 12;
  vertical-align: center;
}

.setting-icon {
  font-size: 18;
  color: #8b8bf5;
  text-align: center;
  vertical-align: center;
  line-height: 40;
}

// Setting content (middle)
.setting-content {
  vertical-align: center;
  padding: 2 0;
}


.setting-description {
  font-size: 14;
  color: $text-secondary;
  letter-spacing: 0;
}

.setting-meta {
  font-size: 12;
  color: $text-tertiary;
  margin-top: 3;
  letter-spacing: 0;
}

// Arrow icon (right side)
.setting-arrow {
  font-size: 13;
  color: #52525b;
  vertical-align: center;
  margin-left: 8;
  opacity: 0.6;
}

// Switch component
.setting-switch {
  vertical-align: center;
  margin-left: 8;
}

// Footer
.footer {
  text-align: center;
  padding: 40 0 24 0;
  margin-top: 24;
}

.footer-app-name {
  font-size: 16;
  font-weight: $font-weight-semibold;
  color: $text-primary;
  margin-bottom: 6;
  letter-spacing: 0.01;
  text-transform: uppercase;
}

.footer-text {
  font-size: 12;
  color: $text-tertiary;
  margin-bottom: 3;
  letter-spacing: 0;
}
</style>

