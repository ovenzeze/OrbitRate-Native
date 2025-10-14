<template>
  <ScrollView class="page" scrollBarIndicatorVisible="false">
    <StackLayout class="container fade-in">
      <!-- Subtitle -->
      <Label text="Real-time exchange rates" class="text-secondary font-crimson" style="font-size: 14; margin: 0 0 16 0; opacity: 0.7;" />

      <!-- Converter Card -->
      <StackLayout class="card">
        <!-- You Send -->
        <StackLayout class="currency-section">
          <Label text="YOU SEND" class="label-caption" />
          <GridLayout columns="*, auto" class="currency-row">
            <TextField 
              col="0"
              v-model="amount"
              keyboardType="number"
              hint="0"
              class="amount-input"
            />
            <GridLayout col="1" columns="auto, auto, auto" class="currency-button">
              <CountryFlag col="0" :currency="fromCurrency" :size="24" style="vertical-align: center;" />
              <Label col="1" :text="fromCurrency" style="font-size: 15; font-weight: 600; color: #ffffff; margin-left: 12; vertical-align: center;" />
              <Label col="2" text="›" style="font-size: 16; margin-left: 8; color: #71717a; vertical-align: center;" />
            </GridLayout>
          </GridLayout>
        </StackLayout>

        <!-- Swap Button -->
        <Button 
          class="swap-button"
          :touchAnimation="swapButtonAnimation"
          @tap="swapCurrencies"
        >
          <Icon name="swap" :size="20" color="#6366f1" />
        </Button>

        <!-- You Receive -->
        <StackLayout class="currency-section">
          <Label text="YOU RECEIVE" class="label-caption" />
          <GridLayout columns="*, auto" class="currency-row">
            <Label 
              col="0"
              :text="convertedAmount"
              class="amount-display"
            />
            <GridLayout col="1" columns="auto, auto, auto" class="currency-button">
              <CountryFlag col="0" :currency="toCurrency" :size="24" style="vertical-align: center;" />
              <Label col="1" :text="toCurrency" style="font-size: 15; font-weight: 600; color: #ffffff; margin-left: 12; vertical-align: center;" />
              <Label col="2" text="›" style="font-size: 16; margin-left: 8; color: #71717a; vertical-align: center;" />
            </GridLayout>
          </GridLayout>
        </StackLayout>

        <!-- Divider -->
        <StackLayout class="divider" style="margin: 16 0;" />

        <!-- Rate Info -->
        <GridLayout columns="*, auto" style="padding-top: 12;">
          <Label 
            col="0" 
            :text="rateText"
            style="font-size: 13; color: #a1a1aa; vertical-align: center;"
          />
          <StackLayout col="1" orientation="horizontal" style="vertical-align: center;">
            <Icon 
              name="refresh"
              :size="14"
              color="#a1a1aa"
              :class="{ 'rotate': isRefreshing }"
              style="margin-right: 8; vertical-align: center;"
              @tap="refreshRates"
            />
            <Label 
              :text="updateTimeText"
              style="font-size: 13; color: #a1a1aa; vertical-align: center;"
            />
          </StackLayout>
        </GridLayout>
      </StackLayout>

      <!-- Quick Pairs Section -->
      <StackLayout style="margin-top: 20;">
        <GridLayout columns="*, auto" style="margin-bottom: 12;">
          <Label col="0" text="Quick pairs" style="font-size: 16; font-weight: 600; color: #ffffff;" />
          <Label col="1" text="See all" style="font-size: 13; font-weight: 600; color: #6366f1;" />
        </GridLayout>

        <!-- 第一行 -->
        <GridLayout columns="*, *, *" rows="auto" style="margin-bottom: 8;">
          <StackLayout 
            v-for="(pair, index) in quickPairs.slice(0, 3)"
            :key="index"
            :col="index"
            class="card-small"
            style="margin: 0 4;"
            @tap="loadQuickPair(pair.from, pair.to)"
          >
            <GridLayout columns="auto, auto" style="margin-bottom: 6; horizontal-align: center;">
              <CountryFlag col="0" :currency="pair.from" :size="22" />
              <CountryFlag col="1" :currency="pair.to" :size="22" style="margin-left: 8;" />
            </GridLayout>
            <Label :text="`${pair.from} ⇄ ${pair.to}`" style="font-size: 12; font-weight: 600; color: #ffffff; text-align: center;" />
          </StackLayout>
        </GridLayout>

        <!-- 第二行 -->
        <GridLayout columns="*, *, *" rows="auto">
          <StackLayout 
            v-for="(pair, index) in quickPairs.slice(3, 6)"
            :key="index + 3"
            :col="index"
            class="card-small"
            style="margin: 0 4;"
            @tap="loadQuickPair(pair.from, pair.to)"
          >
            <GridLayout columns="auto, auto" style="margin-bottom: 6; horizontal-align: center;">
              <CountryFlag col="0" :currency="pair.from" :size="22" />
              <CountryFlag col="1" :currency="pair.to" :size="22" style="margin-left: 6;" />
            </GridLayout>
            <Label :text="`${pair.from} ⇄ ${pair.to}`" style="font-size: 12; font-weight: 600; color: #ffffff; text-align: center;" />
          </StackLayout>
        </GridLayout>
      </StackLayout>
    </StackLayout>
  </ScrollView>
</template>

<script lang="ts">
import Vue from 'nativescript-vue';
import { CoreTypes } from '@nativescript/core';
import { mapState, mapActions, mapWritableState } from 'pinia';
import { useCurrencyStore } from '~/stores/currency';
import { useHistoryStore } from '~/stores/history';
import CountryFlag from '../components/CountryFlag.vue';
import Icon from '../components/Icon.vue';

export default Vue.extend({
  name: 'Convert',
  components: {
    CountryFlag,
    Icon
  },
  data() {
    return {
      // 快捷货币对 - 常用的货币转换组合
      quickPairs: [
        { from: 'USD', to: 'CNY' },  // 美元 → 人民币
        { from: 'EUR', to: 'USD' },  // 欧元 → 美元
        { from: 'GBP', to: 'USD' },  // 英镑 → 美元
        { from: 'JPY', to: 'CNY' },  // 日元 → 人民币
        { from: 'HKD', to: 'CNY' },  // 港币 → 人民币
        { from: 'AUD', to: 'USD' },  // 澳元 → 美元
      ],
      // Custom touch animation for swap button
      swapButtonAnimation: {
        down: {
          rotate: 180,
          scale: { x: 0.9, y: 0.9 },
          duration: 200,
          curve: CoreTypes.AnimationCurve.easeInOut,
        },
        up: {
          rotate: 0,
          scale: { x: 1, y: 1 },
          duration: 200,
          curve: CoreTypes.AnimationCurve.easeInOut,
        },
      }
    };
  },
  computed: {
    ...mapState(useCurrencyStore, [
      'fromCurrency',
      'toCurrency',
      'currentRate',
      'lastUpdated',
      'rateText'
    ]),
    ...mapWritableState(useCurrencyStore, ['amount']),

    convertedAmount(): string {
      const store = useCurrencyStore();
      return store.convertedAmount.toFixed(2);
    },

    isRefreshing(): boolean {
      return useCurrencyStore().isLoading;
    },

    rate(): number {
      return useCurrencyStore().currentRate || 0;
    },

    updateTimeText(): string {
      const lastUpdated = useCurrencyStore().lastUpdated;
      if (!lastUpdated) return 'Not updated yet';

      const now = new Date();
      const diff = Math.floor((now.getTime() - lastUpdated.getTime()) / 1000 / 60);
      if (diff < 1) return 'Updated just now';
      if (diff < 60) return `Updated ${diff}m ago`;
      const hours = Math.floor(diff / 60);
      if (hours < 24) return `Updated ${hours}h ago`;
      return 'Updated 1d ago';
    }
  },
  methods: {
    ...mapActions(useCurrencyStore, {
      fetchRates: 'fetchRates',
      swapCurrencies: 'swapCurrencies',
      setFromCurrency: 'setFromCurrency',
      setToCurrency: 'setToCurrency'
    }),

    async refreshRates() {
      console.log('Refreshing rates...');
      await this.fetchRates();
    },

    async loadQuickPair(from: string, to: string) {
      console.log(`Loading pair: ${from} → ${to}`);
      this.setFromCurrency(from);
      this.setToCurrency(to);
    },

    async saveConversion() {
      const currencyStore = useCurrencyStore();
      const historyStore = useHistoryStore();

      if (currencyStore.currentRate) {
        await historyStore.addRecord({
          from_currency: currencyStore.fromCurrency,
          to_currency: currencyStore.toCurrency,
          amount: currencyStore.amount,
          result: currencyStore.convertedAmount,
          rate: currencyStore.currentRate
        });
      }
    }
  },
  mounted() {
    // Fetch initial rates when component is mounted
    const store = useCurrencyStore();
    if (!store.lastUpdated || store.isRateStale) {
      this.fetchRates();
    }
  }
});
</script>

<style scoped lang="scss">
@import '../styles/variables';

.container {
  padding: 8 $spacing-page $spacing-page $spacing-page;
}

.currency-section {
  margin-bottom: 16;
}

.label-caption {
  font-size: 13;
  font-weight: 600;
  color: $text-secondary;
  letter-spacing: 0.05;
  margin-bottom: 16;
  text-transform: uppercase;
}

.currency-row {
  margin-bottom: 8;
}

.amount-input {
  font-size: 48;
  font-weight: 600;
  color: $text-primary;
  background-color: transparent;
  border-width: 0;
  placeholder-color: $text-muted;
  font-family: 'Menlo', 'Monaco', monospace;
}

.amount-display {
  font-size: 48;
  font-weight: 600;
  color: $color-accent;
  font-family: 'Menlo', 'Monaco', monospace;
}

.currency-button {
  background-color: $bg-secondary;
  border-radius: 32;
  border-width: 1;
  border-color: $color-border;
  padding: 8 16;
  margin-left: 12;
}

.swap-button {
  font-size: 24;
  color: $color-accent;
  background-color: transparent;
  border-width: 0;
  horizontal-align: center;
  margin: 8 0;
}

.card-small {
  background-color: $bg-secondary;
  border-radius: 10;
  padding: 10 6;
  border-width: 0;
  border-color: rgba(99, 102, 241, 0.2);
}
</style>

