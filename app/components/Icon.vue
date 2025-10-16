<template>
  <Label 
    :text="iconCode" 
    class="icon"
    :style="iconStyle"
  />
</template>

<script lang="ts">
import Vue from 'nativescript-vue';

// Font Awesome 图标映射
// 统一使用 Font Awesome 图标，确保一致性
const iconMap: Record<string, string> = {
  // 底部导航
  'convert': '\uf155',        // dollar-sign (Convert)
  'history': '\uf1da',        // clipboard-list (History)
  'favorites': '\uf005',      // heart (Favorites)
  'settings': '\uf013',       // cog (Settings)
  
  // Settings 页面
  'moon': '\uf186',           // moon (Dark mode)
  'database': '\uf1c0',       // database (Data source)
  'book': '\uf02d',           // book-open (Getting started)
  'refresh': '\uf021',        // sync (Restore purchases)
  'info': '\uf05a',           // info-circle (About)
  'file': '\uf15c',           // file-alt (Terms)
  'shield': '\uf023',         // shield (Privacy)
  'chevron-right': '\uf054',  // chevron-right (Arrow)
  
  // History/Favorites 页面
  'heart-filled': '\uf004',   // heart solid (Favorite)
  'trash': '\uf2ed',          // trash-alt (Delete)
  'search': '\uf002',         // search (Search)
  'plus': '\uf067',           // plus (Add)
  'x': '\uf00d',              // times (Close)
  
  // 其他功能
  'bookmark': '\uf02e',       // bookmark (Bookmark)
  'trending': '\uf201',       // chart-line (Trending)
  'swap': '\uf362',           // arrows-alt-v (Swap)
};

export default Vue.extend({
  name: 'Icon',
  props: {
    // 图标名称
    name: {
      type: String,
      required: true
    },
    // 图标大小
    size: {
      type: Number,
      default: 20
    },
    // 图标颜色
    color: {
      type: String,
      default: '#ffffff'
    }
  },
  computed: {
    iconCode(): string {
      return iconMap[this.name] || '\uf128'; // 默认问号图标
    },
    iconStyle(): string {
      return `font-size: ${this.size}; color: ${this.color};`;
    }
  }
});
</script>

<style scoped lang="scss">
.icon {
  text-align: center;
}
</style>

