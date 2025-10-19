<template>
  <Page class="page">
    <ActionBar title="Test Page" />
    <StackLayout>
      <Label text="Hello World!" class="h2 text-center" />
      <Label text="If you can see this, the app is working!" class="text-center" />
    </StackLayout>
  </Page>
</template>

<script lang="ts">
import Vue from 'nativescript-vue';

export default Vue.extend({
  name: 'TestPage'
});
</script>

<style scoped lang="scss">
@use '../styles/variables' as *;

.page {
  background-color: $bg-primary;
}

.h2 {
  font-size: 24;
  color: $text-primary;
  margin: 20;
}
</style>
