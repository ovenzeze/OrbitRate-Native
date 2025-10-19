import { createPinia, PiniaVuePlugin } from 'pinia'
import Vue from 'nativescript-vue'

// Install Pinia plugin for Vue 2
Vue.use(PiniaVuePlugin)

// Create and export pinia instance
export const pinia = createPinia()
