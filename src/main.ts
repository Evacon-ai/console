import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Quasar, Dialog, Notify, Loading } from 'quasar'
import i18n from './i18n'
import MazPhoneNumberInput from 'maz-ui/components/MazPhoneNumberInput'
import { useThemeHandler } from 'maz-ui';
import 'maz-ui/css/main.css'
import { useUserStore } from './stores/userStore'
import { useI18n } from 'vue-i18n'

// Import Quasar css
import 'quasar/dist/quasar.css'
// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'

import App from './App.vue'
import Dashboard from './pages/Dashboard.vue'
import Projects from './pages/Projects.vue'
import Profile from './pages/Profile.vue'
import Organizations from './pages/Organizations.vue'
import Users from './pages/Users.vue'
import SignIn from './pages/SignIn.vue'
import ResetPassword from './pages/ResetPassword.vue'
import NewPassword from './pages/NewPassword.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { 
    path: '/', 
    redirect: () => {
      return { name: 'dashboard' }
    }
  },
  { 
    path: '/login', 
    name: 'login',
    component: SignIn,
    meta: { requiresGuest: true }
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: ResetPassword,
    meta: { requiresGuest: true }
  },
  {
    path: '/new-password',
    name: 'new-password',
    component: NewPassword
  },
  { 
    path: '/dashboard', 
    name: 'dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  { 
    path: '/projects', 
    name: 'projects',
    component: Projects,
    meta: { requiresAuth: true }
  },
  { 
    path: '/profile', 
    name: 'profile',
    component: Profile,
    meta: { requiresAuth: true }
  },
  { 
    path: '/organizations', 
    name: 'organizations',
    component: Organizations,
    meta: { requiresAuth: true }
  },
  { 
    path: '/users', 
    name: 'users',
    component: Users,
    meta: { requiresAuth: true }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)

// Initialize user store
const userStore = useUserStore(pinia)

// Navigation guard
router.beforeEach(async (to, from, next) => {
  await userStore.initSession()

  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    next({ name: 'login' })
  } else if (to.meta.requiresGuest && userStore.isAuthenticated) {
    next({ name: 'dashboard' })
  } else {
    next()
  }
})

// Set initial language from localStorage or default to 'en'
const savedLanguage = localStorage.getItem('language') || 'en'
i18n.global.locale.value = savedLanguage

app.use(router)
app.use(Quasar, {
  plugins: {
    Dialog, 
    Notify,
    Loading
  },
  config: {
    dark: true,
    brand: {
      primary: '#424242',
      secondary: '#26A69A',
      accent: '#9C27B0',
      dark: '#1D1D1D',
      positive: '#21BA45',
      negative: '#C10015',
      info: '#31CCEC',
      warning: '#F2C037'
    }
  }
})
app.use(i18n)
app.component('MazPhoneNumberInput', MazPhoneNumberInput)

app.mount('#app')