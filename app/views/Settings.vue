<template>
  <ScrollView class="page">
    <StackLayout class="container">
      <Label text="Settings" class="title-main" style="margin-bottom: 24;" />
      
      <!-- Appearance Section -->
      <Label text="APPEARANCE" class="text-tertiary" style="font-size: 12; margin-bottom: 16; text-transform: uppercase; letter-spacing: 0.8;" />
      
      <StackLayout class="card" style="margin-bottom: 24;">
        <GridLayout columns="*, auto">
          <StackLayout col="0">
            <Label text.decode="&#xf186;" class="fas" style="font-size: 20; margin-bottom: 4;" />
            <Label text="Theme" style="font-size: 16; font-weight: 600; margin-bottom: 2;" />
            <Label text="Dark mode" class="text-secondary" style="font-size: 13;" />
          </StackLayout>
          <Label col="1" text="⚫️" style="font-size: 20;" />
        </GridLayout>
      </StackLayout>

      <!-- General Section -->
      <Label text="GENERAL" class="text-tertiary" style="font-size: 12; margin-bottom: 16; text-transform: uppercase; letter-spacing: 0.8;" />
      
      <StackLayout class="card" style="margin-bottom: 12;">
        <GridLayout columns="*, auto">
          <StackLayout col="0">
            <Label text.decode="&#xf1c0;" class="fas" style="font-size: 20; margin-bottom: 4;" />
            <Label text="Data Source" style="font-size: 16; font-weight: 600; margin-bottom: 2;" />
            <Label text="ExchangeRate-API" class="text-secondary" style="font-size: 13;" />
            <Label text="Last updated: 5 minutes ago" class="text-secondary" style="font-size: 13;" />
          </StackLayout>
        </GridLayout>
      </StackLayout>

      <StackLayout class="card" style="margin-bottom: 12;">
        <GridLayout columns="*, auto">
          <StackLayout col="0">
            <Label text.decode="&#xf02d;" class="fas" style="font-size: 20; margin-bottom: 4;" />
            <Label text="Getting Started" style="font-size: 16; font-weight: 600;" />
          </StackLayout>
          <Label col="1" text.decode="&#xf054;" class="fas" style="font-size: 16; color: #71717a;" />
        </GridLayout>
      </StackLayout>

      <StackLayout class="card" style="margin-bottom: 24;">
        <GridLayout columns="*, auto">
          <StackLayout col="0">
            <Label text.decode="&#xf021;" class="fas" style="font-size: 20; margin-bottom: 4;" />
            <Label text="Restore Purchases" style="font-size: 16; font-weight: 600;" />
          </StackLayout>
          <Label col="1" text.decode="&#xf054;" class="fas" style="font-size: 16; color: #71717a;" />
        </GridLayout>
      </StackLayout>

      <!-- About Section -->
      <Label text="ABOUT" class="text-tertiary" style="font-size: 12; margin-bottom: 16; text-transform: uppercase; letter-spacing: 0.8;" />
      
      <StackLayout class="card" style="margin-bottom: 12;">
        <GridLayout columns="*, auto">
          <StackLayout col="0">
            <Label text.decode="&#xf05a;" class="fas" style="font-size: 20; margin-bottom: 4;" />
            <Label text="About App" style="font-size: 16; font-weight: 600;" />
          </StackLayout>
          <Label col="1" text.decode="&#xf054;" class="fas" style="font-size: 16; color: #71717a;" />
        </GridLayout>
      </StackLayout>

      <StackLayout class="card" style="margin-bottom: 12;">
        <GridLayout columns="*, auto">
          <StackLayout col="0">
            <Label text.decode="&#xf15c;" class="fas" style="font-size: 20; margin-bottom: 4;" />
            <Label text="Terms of Service" style="font-size: 16; font-weight: 600;" />
          </StackLayout>
          <Label col="1" text.decode="&#xf054;" class="fas" style="font-size: 16; color: #71717a;" />
        </GridLayout>
      </StackLayout>

      <StackLayout class="card" style="margin-bottom: 24;">
        <GridLayout columns="*, auto">
          <StackLayout col="0">
            <Label text.decode="&#xf023;" class="fas" style="font-size: 20; margin-bottom: 4;" />
            <Label text="Privacy Policy" style="font-size: 16; font-weight: 600;" />
          </StackLayout>
          <Label col="1" text.decode="&#xf054;" class="fas" style="font-size: 16; color: #71717a;" />
        </GridLayout>
      </StackLayout>

      <!-- Footer -->
      <StackLayout style="text-align: center; padding: 24 0;">
        <Label text="Version 1.0.0" class="text-tertiary" style="font-size: 13; margin-bottom: 8;" />
        <Label text="© 2025 Currency App" class="text-tertiary" style="font-size: 13;" />
      </StackLayout>
    </StackLayout>
  </ScrollView>
</template>

<script lang="ts">
import Vue from 'nativescript-vue';

export default Vue.extend({
  name: 'Settings'
});
</script>

<style scoped lang="scss">
@import '../styles/variables';

.container {
  padding: $spacing-page;
}
</style>

