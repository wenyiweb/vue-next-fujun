import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import FastClick from 'fastclick'
// 引入flexible
import 'lib-flexible/flexible'
// 引入需要打包的外部样式
import '@/assets/scss/index.scss'
// 当fastclick和better-scroll冲突时，可以给标签加class="needsClick"
FastClick.attach(document.body)
const app = createApp(App)
/**
 * 懒加载组件配置
 */
app.use(router).use(store).mount('#app')
