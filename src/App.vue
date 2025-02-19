<template>
  <q-layout view="hHh LpR lff" :dir="isRTL ? 'rtl' : 'ltr'" class="app-container">
    <q-drawer
      v-if="!isGuestPage"
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :width="250"
      :side="isRTL ? 'right' : 'left'"
      :dark="$q.dark.isActive"
      :class="$q.dark.isActive ? 'bg-dark' : 'bg-grey-1'"
    >
      <!-- Logo at the top of drawer -->
      <div class="drawer-header q-ma-sm">
        <Logo :showText="true" textClass="text-subtitle1" :size="32" />
      </div>

      <!-- Navigation Menu -->
      <q-list padding class="menu-list">
        <q-item
          v-for="link in filteredLinks"
          :key="link.path"
          :to="link.path"
          clickable
          v-ripple
          :active="route.path === link.path"
          active-class="menu-item-active"
        >
          <q-item-section avatar>
            <component :is="link.icon" class="w-5 h-5" />
          </q-item-section>
          <q-item-section>{{ $t(link.label) }}</q-item-section>
        </q-item>
      </q-list>

      <!-- User Menu at Bottom -->
      <div class="absolute-bottom q-mb-md" :class="$q.dark.isActive ? 'bg-dark' : 'bg-grey-1'">
        <q-list>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-avatar size="32px">
                <img :src="avatarUrl">
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ userStore.currentUser?.firstName }} {{ userStore.currentUser?.lastName }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-icon name="chevron_right" />
            </q-item-section>

            <q-menu anchor="top right" self="top right" :offset="[200, 8]">
              <q-list style="min-width: 200px">
                <q-item clickable v-close-popup @click="router.push('/profile')">
                  <q-item-section avatar>
                    <User class="w-5 h-5" />
                  </q-item-section>
                  <q-item-section>{{ $t('common.profile') }}</q-item-section>
                </q-item>

                <q-item clickable>
                  <q-item-section avatar>
                    <Languages class="w-5 h-5" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ getCurrentLanguageName }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-icon name="chevron_right" />
                  </q-item-section>

                  <q-menu anchor="top end" self="top start" :offset="[0, 0]">
                    <q-list style="min-width: 150px">
                      <q-item
                        v-for="lang in languages"
                        :key="lang.code"
                        clickable
                        v-close-popup
                        @click="changeLanguage(lang.code)"
                      >
                        <q-item-section>
                          <q-item-label>{{ lang.name }}</q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-item>

                <q-item clickable>
                  <q-item-section avatar>
                    <Moon v-if="$q.dark.isActive" class="w-5 h-5" />
                    <Sun v-else class="w-5 h-5" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ $t('common.theme') }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-icon name="chevron_right" />
                  </q-item-section>

                  <q-menu anchor="top end" self="top start" :offset="[0, 0]">
                    <q-list style="min-width: 150px">
                      <q-item
                        clickable
                        v-close-popup
                        @click="$q.dark.set(false)"
                      >
                        <q-item-section>
                          <q-item-label>{{ $t('common.lightMode') }}</q-item-label>
                        </q-item-section>
                        <q-item-section side>
                          <q-icon v-if="!$q.dark.isActive" name="check" />
                        </q-item-section>
                      </q-item>
                      <q-item
                        clickable
                        v-close-popup
                        @click="$q.dark.set(true)"
                      >
                        <q-item-section>
                          <q-item-label>{{ $t('common.darkMode') }}</q-item-label>
                        </q-item-section>
                        <q-item-section side>
                          <q-icon v-if="$q.dark.isActive" name="check" />
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-item>

                <q-separator />

                <q-item clickable v-close-popup @click="handleSignOut">
                  <q-item-section avatar>
                    <LogOut class="w-5 h-5" />
                  </q-item-section>
                  <q-item-section>{{ $t('common.signOut') }}</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-item>
        </q-list>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { Home, FolderKanban, Users, User, Languages, LogOut, Moon, Sun } from 'lucide-vue-next'
import { useQuasar } from 'quasar'
import { useUserStore } from './stores/userStore'
import Logo from './components/Logo.vue'

const route = useRoute()
const router = useRouter()
const { locale } = useI18n()
const userStore = useUserStore()
const $q = useQuasar()
const leftDrawerOpen = ref(true)

const isRTL = computed(() => ['ar', 'he'].includes(locale.value))
const isGuestPage = computed(() => ['/login', '/forgot-password', '/new-password'].includes(route.path))

const links = [
  { icon: Home, label: 'common.home', path: '/dashboard' },
  { icon: FolderKanban, label: 'common.projects', path: '/projects' },
  { icon: Users, label: 'users.title', path: '/users', requiresEvacon: true }
]

const filteredLinks = computed(() => 
  links.filter(link => !link.requiresEvacon || userStore.isEvaconStaff)
)

const languages = [
  { code: 'en', name: 'English' },
  { code: 'ar', name: 'العربية' },
  { code: 'de', name: 'Deutsch' },
  { code: 'es', name: 'Español' },
  { code: 'he', name: 'עברית' },
  { code: 'ru', name: 'Русский' },
  { code: 'pl', name: 'Polski' }
]

const getCurrentLanguageName = computed(() => {
  const currentLang = languages.find(lang => lang.code === locale.value)
  return currentLang ? currentLang.name : 'English'
})

const avatarUrl = computed(() => {
  const name = `${userStore.currentUser?.firstName || ''} ${userStore.currentUser?.lastName || ''}`.trim()
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=32&background=0D8ABC&color=fff`
})

const changeLanguage = (lang: string) => {
  locale.value = lang
  localStorage.setItem('language', lang)
}

const handleSignOut = async () => {
  await userStore.logout()
  router.push('/login')
}
</script>

<style>
.app-container {
  height: 100vh;
  overflow: hidden;
}

.drawer-header {
  height: 64px;
  display: flex;
  align-items: center;
}

.menu-list {
  height: calc(100vh - 64px - 72px); /* Viewport height - header - user menu */
  overflow-y: auto;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.menu-list::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.menu-list {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.menu-item-active {
  background: rgba(255, 255, 255, 0.1) !important;
  border-left: 4px solid var(--q-secondary);
  color: var(--q-secondary) !important;
}

[dir="rtl"] .menu-item-active {
  border-left: none;
  border-right: 4px solid var(--q-secondary);
}

/* Global button styles */
.q-btn {
  text-transform: none !important;
}

/* Global RTL styles */
[dir="rtl"] .q-drawer__content {
  direction: rtl;
}

[dir="rtl"] .q-item__section--avatar {
  margin-right: 0;
  margin-left: 16px;
}

[dir="rtl"] .q-field__before {
  padding-right: 0;
  padding-left: 12px;
}

[dir="rtl"] .q-field__after {
  padding-left: 0;
  padding-right: 12px;
}

[dir="rtl"] .q-field__label {
  left: unset;
  right: 0;
  transform-origin: right !important;
}

[dir="rtl"] .q-btn-group {
  flex-direction: row-reverse;
}

[dir="rtl"] .q-timeline__entry--right .q-timeline__content {
  margin-right: 40px;
  margin-left: 0;
}

/* User menu styles */
.user-menu-item {
  border-radius: 8px;
  transition: background-color 0.3s;
}

.user-menu-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

/* Active menu item styles for light mode */
body:not(.body--dark) .menu-item-active {
  background: rgba(0, 0, 0, 0.1) !important;
}
</style>