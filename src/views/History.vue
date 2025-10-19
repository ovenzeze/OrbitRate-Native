<template>
  <Page class="page">
    <ActionBar title="History" flat="true">
      <ActionItem 
        ios.systemIcon="13" 
        android.systemIcon="ic_menu_search"
        @tap="onSearch"
      />
    </ActionBar>
    
    <GridLayout rows="*, auto">
      <ScrollView row="0">
      <StackLayout class="container">
        <Label text="Recent conversions" class="text-secondary" style="font-size: 15; margin-bottom: 24;" />
        
        <!-- Empty State -->
        <StackLayout v-if="historyItems.length === 0" class="empty-state">
          <Label text.decode="&#xf1da;" class="fas" style="font-size: 64; margin-bottom: 16;" />
          <Label text="No conversion history yet" class="title-section" style="margin-bottom: 8;" />
          <Label 
            text="Start converting currencies to see your history here" 
            class="text-tertiary" 
            style="font-size: 14; text-align: center;"
            textWrap="true"
          />
        </StackLayout>

        <!-- History List -->
        <StackLayout v-else>
          <StackLayout 
            v-for="item in historyItems"
            :key="item.id"
            class="card"
            style="margin-bottom: 12;"
          >
            <!-- Header -->
            <GridLayout columns="*, auto" style="margin-bottom: 4;">
              <Label 
                col="0" 
                :text="`${item.fromFlag} ${item.from} → ${item.to}`"
                style="font-size: 16; font-weight: 600;"
              />
              <Label 
                col="1" 
                text.decode="&#xf005;"
                class="fas"
                style="font-size: 20; color: #ef4444;"
                @tap="toggleFavorite(item)"
              />
            </GridLayout>
            <Label :text="item.time" class="text-tertiary" style="font-size: 12; margin-bottom: 16;" />

            <!-- Amounts -->
            <GridLayout columns="*, auto, *" style="margin-bottom: 16;">
              <StackLayout col="0">
                <Label text="You sent" class="text-tertiary" style="font-size: 11; margin-bottom: 4;" />
                <Label :text="`${item.sentAmount} ${item.from}`" style="font-size: 16; font-weight: 600;" />
              </StackLayout>
              <Label col="1" text="⇄" style="font-size: 20; color: #6366f1; horizontal-align: center;" />
              <StackLayout col="2">
                <Label text="You received" class="text-tertiary" style="font-size: 11; margin-bottom: 4;" />
                <Label :text="`${item.receivedAmount} ${item.to}`" style="font-size: 16; font-weight: 600;" />
              </StackLayout>
            </GridLayout>

            <!-- Rate -->
            <Label 
              :text="`📈 1 ${item.from} = ${item.rate} ${item.to}`"
              class="text-secondary"
              style="font-size: 14; margin-bottom: 16;"
            />

            <!-- Actions -->
            <GridLayout columns="*, auto" style="margin-top: 8;">
              <Button 
                col="0" 
                text="Repeat conversion" 
                class="text-accent"
                style="font-size: 14; background-color: transparent; border-width: 0; horizontal-align: left; padding: 0;"
                @tap="repeatConversion(item)"
              />
              <Label 
                col="1" 
                text.decode="&#xf1f8;"
                class="fas"
                style="font-size: 18; color: #ef4444;"
                @tap="deleteItem(item)"
              />
            </GridLayout>
          </StackLayout>
        </StackLayout>
      </StackLayout>
      </ScrollView>
      
      <!-- 底部导航栏 -->
      <BottomNavBar row="1" activeTab="history" />
    </GridLayout>
  </Page>
</template>

<script lang="ts">
import Vue from 'nativescript-vue';
import BottomNavBar from '../components/layout/BottomNavBar.vue';

interface HistoryItem {
  id: string;
  from: string;
  to: string;
  fromFlag: string;
  sentAmount: string;
  receivedAmount: string;
  rate: string;
  time: string;
  isFavorite: boolean;
}

export default Vue.extend({
  name: 'History',
  components: {
    BottomNavBar
  },
  data() {
    return {
      historyItems: [] as HistoryItem[]
    };
  },
  methods: {
    onSearch() {
      console.log('Search history');
    },
    toggleFavorite(item: HistoryItem) {
      item.isFavorite = !item.isFavorite;
      console.log('Toggle favorite:', item);
    },
    repeatConversion(item: HistoryItem) {
      console.log('Repeat conversion:', item);
      // TODO: Navigate to Convert page with these values
    },
    deleteItem(item: HistoryItem) {
      const index = this.historyItems.indexOf(item);
      if (index > -1) {
        this.historyItems.splice(index, 1);
      }
    }
  }
});
</script>

<style scoped lang="scss">
@use '../styles/variables' as *;

.container {
  padding: $spacing-page;
}

.empty-state {
  padding: 48 24;
  text-align: center;
}
</style>

