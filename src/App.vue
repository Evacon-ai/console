<template>
  <q-layout view="hHh LpR lff" :dir="isRTL ? 'rtl' : 'ltr'" class="app-container">
    <q-header v-if="!isGuestPage" class="bg-transparent q-pa-sm">
      <q-toolbar class="q-px-none">
        <q-btn
          flat
          dense
          round
          aria-label="Menu"
          class="lt-md"
          @click="leftDrawerOpen = !leftDrawerOpen"
        >
          <component :is="Menu" class="w-5 h-5" />
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-if="!isGuestPage"
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :width="250"
      :breakpoint="1024"
      :side="isRTL ? 'right' : 'left'"
      :dark="$q.dark.isActive"
      :class="$q.dark.isActive ? 'bg-dark' : 'bg-grey-1'"
    >
      <!-- Logo at the top of drawer -->
      <div class="drawer-header q-ma-sm">
        <Logo :showText="true" textClass="text-subtitle1" :size="32" @click="handleOrgClick" />
      </div>

      <!-- Navigation Menu -->
      <q-list padding class="menu-list">
        <q-item
          v-for="link in links"
          :key="link.path"
          :to="link.path"
          clickable
          v-ripple
          :active="route?.path === link.path"
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
          <UserMenu />
        </q-list>
      </div>
    </q-drawer>

    <OrganizationDetails
      v-if="selectedOrg"
      v-model="showOrgDetails"
      :organization="selectedOrg"
      @organization-updated="handleOrgUpdated"
    />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { Home, FolderKanban, Users, Building2, Menu } from 'lucide-vue-next'
import { useQuasar, useDialogPluginComponent } from 'quasar'
import { useUserStore } from './stores/userStore'
import { useOrganizationsStore } from './stores/organizationsStore'
import Logo from './components/Logo.vue'
import UserMenu from './components/UserMenu.vue'
import OrganizationDetails from './components/OrganizationDetails.vue'

const route = useRoute()
const router = useRouter()
const { locale } = useI18n()
const userStore = useUserStore()
const organizationsStore = useOrganizationsStore()
const $q = useQuasar()
const leftDrawerOpen = ref($q.screen.gt.sm)
const showOrgDetails = ref(false)
const selectedOrg = ref(null)

const isRTL = computed(() => ['ar', 'he'].includes(locale.value))
const isGuestPage = computed(() => {
  const guestPages = ['/login', '/forgot-password', '/new-password']
  return route?.path ? guestPages.includes(route.path) : false
})

const links = computed(() => {
  const allLinks = [
    { icon: Home, label: 'common.home', path: '/dashboard' },
    { icon: Building2, label: 'organizations.title', path: '/organizations' },
    { icon: FolderKanban, label: 'common.projects', path: '/projects' },
    { icon: Users, label: 'users.title', path: '/users' }
  ]

  // Evacon users see all menu items
  if (userStore.currentUser?.level === 'evacon') {
    return allLinks
  }

  // Customer admin sees projects and users
  if (userStore.currentUser?.level === 'customer' && userStore.currentUser?.role === 'admin') {
    return allLinks.filter(link => link.path === '/projects' || link.path === '/users')
  }

  // Customer user sees only projects
  if (userStore.currentUser?.level === 'customer' && userStore.currentUser?.role === 'user') {
    return allLinks.filter(link => link.path === '/projects')
  }

  return []
})

const handleOrgClick = (org) => {
  selectedOrg.value = org
  showOrgDetails.value = true
  if (org?.id) {
    organizationsStore.fetchOrganizationById(org.id)
  }
}

const handleOrgUpdated = async (updatedOrg) => {
  if (updatedOrg?.id) {
    await organizationsStore.fetchOrganizationById(updatedOrg.id)
    // Update the selected org with the latest data
    selectedOrg.value = organizationsStore.organizations.find(org => org.id === updatedOrg.id) || selectedOrg.value
  }
}
</script>

<style>
.app-container {
  height: 100vh;
  overflow: hidden;
  padding-top: 0 !important;
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

/* Header styles */
.q-header {
  backdrop-filter: blur(10px);
  background: rgba(0, 0, 0, 0.1) !important;
}

.body--dark .q-header {
  background: rgba(255, 255, 255, 0.1) !important;
}

/* Hide header on larger screens */
@media (min-width: 1024px) {
  .q-header {
    display: none;
  }
}
</style>