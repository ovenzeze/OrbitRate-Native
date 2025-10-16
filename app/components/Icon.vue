<template>
  <Label 
    :text="iconCode" 
    class="icon"
    :style="iconStyle"
  />
</template>

<script lang="ts">
import Vue from 'nativescript-vue';

// 系统图标映射 (测试用)
// 使用系统支持的 Unicode 字符
const iconMap: Record<string, string> = {
  // 底部导航 - 使用系统图标
  'convert': '$',             // 美元符号
  'history': '📋',            // 剪贴板 emoji
  'favorites': '⭐',          // 星星 emoji
  'settings': '⚙️',           // 齿轮 emoji
  
  // Settings 页面
  'moon': '\uf186',           // moon (Moon)
  'database': '\uf1c0',       // database (Database)
  'book': '\uf02d',           // book (BookOpen)
  'refresh': '\uf021',        // sync (RotateCcw/RefreshCw)
  'info': '\uf05a',           // info-circle (Info)
  'file': '\uf15c',           // file-alt (FileText)
  'shield': '\uf023',         // lock (Shield)
  'chevron-right': '\uf054',  // chevron-right (ChevronRight)
  
  // History/Favorites 页面
  'heart-filled': '\uf004',   // heart solid (Heart filled)
  'trash': '\uf2ed',          // trash-alt (Trash2)
  'search': '\uf002',         // search (Search)
  'plus': '\uf067',           // plus (Plus)
  'x': '\uf00d',              // times (X)
  
  // 其他
  'bookmark': '\uf02e',       // bookmark (Bookmark)
  'trending': '\uf201',       // chart-line (TrendingUp)
  'swap': '\uf362',           // arrows-alt-v (swap vertical)
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

