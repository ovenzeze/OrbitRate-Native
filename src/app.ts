import Vue from 'nativescript-vue'
import VueCompositionAPI from '@vue/composition-api'
import { NativeScriptService } from './services/core/nativescript.service'
import { pinia } from './stores'
import BottomNavigation from './components/layout/BottomNavigation.vue'

// 注册 Composition API
Vue.use(VueCompositionAPI)

declare let __DEV__: boolean;

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = !__DEV__

// Enable global tap animations for better UX
NativeScriptService.enableGlobalTapAnimations()
NativeScriptService.setTapAnimations({
  down: {
    scale: { x: 0.96, y: 0.96 },
    duration: 150,
    curve: NativeScriptService.AnimationCurve.easeInOut,
  },
  up: {
    scale: { x: 1, y: 1 },
    duration: 150,
    curve: NativeScriptService.AnimationCurve.easeInOut,
  },
})

new Vue({
  pinia,
  render: (h) => h(BottomNavigation),
}).$start()
