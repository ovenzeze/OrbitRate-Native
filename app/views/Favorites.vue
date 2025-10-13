<template>
  <Page class="page">
    <ActionBar title="Favorites" flat="true">
      <ActionItem 
        text="+ New" 
        @tap="addNewFavorite"
        ios.position="right"
        android.position="actionBar"
      />
    </ActionBar>
    
    <ScrollView>
      <StackLayout class="container">
        <Label text="Your saved conversions" class="text-secondary" style="font-size: 15; margin-bottom: 24;" />
        
        <!-- Tabs -->
        <GridLayout columns="*, *" rows="auto" class="tabs">
          <Label 
            col="0" 
            text="Saved Pairs" 
            :class="['tab', { 'tab-active': activeTab === 'pairs' }]"
            @tap="activeTab = 'pairs'"
          />
          <Label 
            col="1" 
            text="Saved Results" 
            :class="['tab', { 'tab-active': activeTab === 'results' }]"
            @tap="activeTab = 'results'"
          />
        </GridLayout>

        <!-- Empty State -->
        <StackLayout v-if="getFavorites().length === 0" class="empty-state">
          <Label text.decode="&#xf005;" class="fas" style="font-size: 64; margin-bottom: 16;" />
          <Label 
            :text="activeTab === 'pairs' ? 'No saved pairs yet' : 'No saved results yet'"
            class="title-section" 
            style="margin-bottom: 8;" 
          />
          <Label 
            :text="activeTab === 'pairs' 
              ? 'Save your favorite currency pairs for quick access'
              : 'Save conversion results to keep track of specific amounts'"
            class="text-tertiary" 
            style="font-size: 14; text-align: center;"
            textWrap="true"
          />
        </StackLayout>

        <!-- Saved Pairs -->
        <StackLayout v-else-if="activeTab === 'pairs'">
          <StackLayout 
            v-for="pair in savedPairs"
            :key="pair.id"
            class="card"
            style="margin-bottom: 12;"
            @tap="loadPair(pair)"
          >
            <GridLayout columns="*, auto">
              <Label 
                col="0" 
                :text="`${pair.fromFlag} ${pair.from}  ⇄  ${pair.toFlag} ${pair.to}`"
                style="font-size: 18; font-weight: 600;"
              />
              <Label 
                col="1" 
                text.decode="&#xf005;"
                class="fas"
                style="font-size: 20; color: #ef4444;"
                @tap.stop="removeFavorite(pair)"
              />
            </GridLayout>
            <Label 
              :text="`1 ${pair.from} = ${pair.rate} ${pair.to}`"
              class="text-secondary"
              style="font-size: 14; margin-top: 8;"
            />
          </StackLayout>
        </StackLayout>

        <!-- Saved Results -->
        <StackLayout v-else>
          <StackLayout 
            v-for="result in savedResults"
            :key="result.id"
            class="card"
            style="margin-bottom: 12;"
          >
            <GridLayout columns="*, auto" style="margin-bottom: 12;">
              <Label 
                col="0" 
                :text="`${result.fromFlag} ${result.amount} ${result.from}`"
                style="font-size: 18; font-weight: 600;"
              />
              <Label 
                col="1" 
                text.decode="&#xf005;"
                class="fas"
                style="font-size: 20; color: #ef4444;"
                @tap="removeFavorite(result)"
              />
            </GridLayout>
            <GridLayout columns="auto, *, auto" style="padding: 12; background-color: #13151f; border-radius: 12;">
              <Label col="0" text="⇄" style="font-size: 20; color: #6366f1; margin-right: 12;" />
              <StackLayout col="1">
                <Label :text="`${result.toFlag} ${result.to}`" style="font-size: 14; margin-bottom: 2;" />
                <Label :text="`@ ${result.rate}`" class="text-tertiary" style="font-size: 12;" />
              </StackLayout>
              <Label col="2" :text="result.convertedAmount" style="font-size: 18; font-weight: 600; color: #10b981;" />
            </GridLayout>
          </StackLayout>
        </StackLayout>
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script lang="ts">
import Vue from 'nativescript-vue';

interface SavedPair {
  id: string;
  from: string;
  to: string;
  fromFlag: string;
  toFlag: string;
  rate: string;
}

interface SavedResult {
  id: string;
  amount: string;
  from: string;
  to: string;
  fromFlag: string;
  toFlag: string;
  rate: string;
  convertedAmount: string;
}

export default Vue.extend({
  name: 'Favorites',
  data() {
    return {
      activeTab: 'pairs' as 'pairs' | 'results',
      savedPairs: [] as SavedPair[],
      savedResults: [] as SavedResult[]
    };
  },
  methods: {
    getFavorites() {
      return this.activeTab === 'pairs' ? this.savedPairs : this.savedResults;
    },
    addNewFavorite() {
      console.log('Add new favorite');
      // TODO: Show modal to add favorite
    },
    loadPair(pair: SavedPair) {
      console.log('Load pair:', pair);
      // TODO: Navigate to Convert with this pair
    },
    removeFavorite(item: any) {
      console.log('Remove favorite:', item);
      if (this.activeTab === 'pairs') {
        const index = this.savedPairs.indexOf(item);
        if (index > -1) this.savedPairs.splice(index, 1);
      } else {
        const index = this.savedResults.indexOf(item);
        if (index > -1) this.savedResults.splice(index, 1);
      }
    }
  }
});
</script>

<style scoped lang="scss">
@import '../styles/variables';

.container {
  padding: $spacing-page;
}

.tabs {
  border-bottom-width: 1;
  border-bottom-color: $color-border;
  margin-bottom: 24;
}

.tab {
  font-size: 16;
  color: $text-tertiary;
  text-align: center;
  padding: 12;
}

.tab-active {
  color: $color-accent;
  font-weight: $font-weight-semibold;
  border-bottom-width: 2;
  border-bottom-color: $color-accent;
}

.empty-state {
  padding: 48 24;
  text-align: center;
}
</style>

