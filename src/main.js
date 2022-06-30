import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import { routes } from './routes.js'
import { createRouter, createWebHistory } from 'vue-router'
import { darkModeKey, styleKey } from '@/config.js'
import './css/main.css'
// import vSelect from 'vue-select'
// import 'vue-select/dist/vue-select.css'


const app = createApp(App)
// app.component('v-select', vSelect)

const router = createRouter({
  history: createWebHistory(),
  routes,
})

app.use(createPinia())
app.use(router)
app.mount('#app')
