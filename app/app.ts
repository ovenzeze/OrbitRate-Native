import Vue from 'nativescript-vue'
import { TouchManager, CoreTypes } from '@nativescript/core'
import { pinia } from './stores'
import BottomNavigation from './components/layout/BottomNavigation.vue'

declare let __DEV__: boolean;

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = !__DEV__

// Enable global tap animations for better UX
TouchManager.enableGlobalTapAnimations = true
TouchManager.animations = {
  down: {
    scale: { x: 0.96, y: 0.96 },
    duration: 150,
    curve: CoreTypes.AnimationCurve.easeInOut,
  },
  up: {
    scale: { x: 1, y: 1 },
    duration: 150,
    curve: CoreTypes.AnimationCurve.easeInOut,
  },
}

new Vue({
  pinia,
  render: (h) => h(BottomNavigation),
}).$start()
