import Vue from 'nativescript-vue'
import { TouchManager, CoreTypes } from '@nativescript/core'
import { pinia } from './stores'
import BottomNavigation from './components/layout/BottomNavigation.vue'
import { performanceService } from './services/core/performance.service'
import { logger } from './services/core/logger.service'

declare let __DEV__: boolean;

// Performance monitoring
performanceService.startTimer('app-init')

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

// Create Vue app with performance monitoring
const app = new Vue({
  pinia,
  render: (h) => h(BottomNavigation),
})

// Start app and measure performance
app.$start().then(() => {
  const initTime = performanceService.endTimer('app-init')
  logger.info(`App initialized in ${initTime}ms`, 'App')
}).catch((error) => {
  logger.error('Failed to start app', 'App', error)
})
