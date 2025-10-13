<template>
  <Page class="page">
    <ActionBar title="Currency" flat="true" class="action-bar" />
    
    <ScrollView>
      <StackLayout class="container">
        <!-- Header -->
        <StackLayout class="header">
          <Label text="Currency" class="title" />
          <Label text="Real-time exchange rates" class="subtitle" />
        </StackLayout>

        <!-- Converter Card -->
        <StackLayout class="converter-card">
          <!-- You Send -->
          <StackLayout class="currency-section">
            <Label text="YOU SEND" class="label-small" />
            <GridLayout columns="*, auto" class="currency-row">
              <TextField 
                col="0"
                v-model="amount"
                keyboardType="number"
                hint="0.00"
                class="amount-input"
                @textChange="onAmountChange"
              />
              <Button 
                col="1" 
                :text="fromCurrency"
                class="currency-button"
              />
            </GridLayout>
          </StackLayout>

          <!-- Swap Button -->
          <Button 
            text="⇄" 
            class="swap-button"
            @tap="swapCurrencies"
          />

          <!-- You Receive -->
          <StackLayout class="currency-section">
            <Label text="YOU RECEIVE" class="label-small" />
            <GridLayout columns="*, auto" class="currency-row">
              <Label 
                col="0"
                :text="convertedAmount"
                class="amount-display"
              />
              <Button 
                col="1" 
                :text="toCurrency"
                class="currency-button"
              />
            </GridLayout>
          </StackLayout>

          <!-- Divider -->
          <StackLayout class="divider" />

          <!-- Rate Info -->
          <GridLayout columns="*, auto" class="rate-info">
            <Label 
              col="0" 
              :text="rateText"
              class="rate-text"
            />
            <Label 
              col="1" 
              text="🔄" 
              class="refresh-icon"
            />
          </GridLayout>
        </StackLayout>
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script lang="ts">
  import Vue from "nativescript-vue";

  export default Vue.extend({
    data() {
      return {
        amount: "100",
        fromCurrency: "USD",
        toCurrency: "CNY",
        rate: 7.2456
      };
    },
    computed: {
      convertedAmount(): string {
        const amt = parseFloat(this.amount || "0");
        const result = amt * this.rate;
        return result.toFixed(2);
      },
      rateText(): string {
        return `1 ${this.fromCurrency} = ${this.rate.toFixed(4)} ${this.toCurrency}`;
      }
    },
    methods: {
      onAmountChange() {
        // Computed property will auto update
      },
      swapCurrencies() {
        const temp = this.fromCurrency;
        this.fromCurrency = this.toCurrency;
        this.toCurrency = temp;
        // In real app, would also inverse the rate
        this.rate = 1 / this.rate;
      }
    }
  });
</script>

<style scoped lang="scss">
  .page {
    background-color: #13151f;
  }

  .action-bar {
    background-color: #13151f;
    color: #ffffff;
  }

  .container {
    padding: 24;
  }

  .header {
    margin-bottom: 24;
  }

  .title {
    font-size: 32;
    font-weight: bold;
    color: #ffffff;
    margin-bottom: 4;
  }

  .subtitle {
    font-size: 15;
    color: #a1a1aa;
  }

  .converter-card {
    background-color: #1a1d29;
    border-radius: 16;
    padding: 20;
  }

  .currency-section {
    margin-bottom: 16;
  }

  .label-small {
    font-size: 11;
    color: #71717a;
    letter-spacing: 0.8;
    margin-bottom: 12;
  }

  .currency-row {
    margin-bottom: 8;
  }

  .amount-input {
    font-size: 40;
    font-weight: 600;
    color: #ffffff;
    background-color: transparent;
    border-width: 0;
    placeholder-color: #52525b;
  }

  .amount-display {
    font-size: 40;
    font-weight: 600;
    color: #ffffff;
  }

  .currency-button {
    font-size: 14;
    font-weight: 600;
    color: #ffffff;
    background-color: #27293a;
    border-radius: 20;
    padding: 8 16;
    margin-left: 12;
  }

  .swap-button {
    font-size: 24;
    color: #6366f1;
    background-color: transparent;
    border-width: 0;
    horizontal-align: center;
    margin: 8 0;
  }

  .divider {
    height: 1;
    background-color: #27272a;
    margin: 16 0;
  }

  .rate-info {
    padding-top: 8;
  }

  .rate-text {
    font-size: 14;
    color: #a1a1aa;
  }

  .refresh-icon {
    font-size: 18;
  }
</style>
