<template>
  <Image 
    :src="flagUrl" 
    :width="size" 
    :height="size" 
    :borderRadius="size / 2"
    stretch="aspectFill"
    :loadMode="loadMode"
    @loadStart="onLoadStart"
    @loadEnd="onLoadEnd"
    @error="onError"
  />
</template>

<script lang="ts">
import Vue from 'nativescript-vue';
import { ImageSource } from '@nativescript/core';
import { imageCacheService } from '~/services/core/image-cache.service';

// 货币到国家代码映射 - 移到常量文件
const CURRENCY_COUNTRY_MAP: Record<string, string> = {
  USD: 'us', CNY: 'cn', EUR: 'eu', GBP: 'gb', JPY: 'jp',
  KRW: 'kr', AUD: 'au', CAD: 'ca', CHF: 'ch', HKD: 'hk',
  SGD: 'sg', NZD: 'nz', THB: 'th', MXN: 'mx', INR: 'in'
};

export default Vue.extend({
  name: 'CountryFlag',
  props: {
    currency: {
      type: String,
      required: true,
      validator: (value: string) => value.length === 3
    },
    size: {
      type: Number,
      default: 28,
      validator: (value: number) => value > 0
    },
    lazy: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isLoading: false,
      hasError: false
    };
  },
  computed: {
    flagUrl(): string {
      const country = CURRENCY_COUNTRY_MAP[this.currency] || 'us';
      return `https://flagcdn.com/w80/${country}.png`;
    },
    loadMode(): 'sync' | 'async' {
      return this.lazy ? 'async' : 'sync';
    }
  },
  methods: {
    onLoadStart() {
      this.isLoading = true;
      this.hasError = false;
    },
    onLoadEnd() {
      this.isLoading = false;
    },
    onError() {
      this.isLoading = false;
      this.hasError = true;
      console.warn(`Failed to load flag for currency: ${this.currency}`);
    }
  }
});
</script>

<style scoped lang="scss">
// 组件内部样式
</style>

