<template>
  <Image 
    :src="flagUrl" 
    :width="size" 
    :height="size" 
    :borderRadius="size / 2"
    stretch="aspectFill"
  />
</template>

<script lang="ts">
import Vue from 'nativescript-vue';

// Currency to country code mapping
const currencyCountry: Record<string, string> = {
  USD: 'us',
  CNY: 'cn',
  EUR: 'eu',
  GBP: 'gb',
  JPY: 'jp',
  KRW: 'kr',
  AUD: 'au',
  CAD: 'ca',
  CHF: 'ch',
  HKD: 'hk',
  SGD: 'sg',
  NZD: 'nz',
  THB: 'th',
  MXN: 'mx',
  INR: 'in'
};

export default Vue.extend({
  name: 'CountryFlag',
  props: {
    // 货币代码，如 'USD', 'CNY'
    currency: {
      type: String,
      required: true
    },
    // 国旗尺寸
    size: {
      type: Number,
      default: 28
    }
  },
  computed: {
    flagUrl(): string {
      const country = currencyCountry[this.currency] || 'us';
      return `https://flagcdn.com/w80/${country}.png`;
    }
  }
});
</script>

<style scoped lang="scss">
// 组件内部样式
</style>

