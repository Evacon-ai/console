<template>
  <q-btn-dropdown
    flat
    no-caps
    class="user-menu"
  >
    <template v-slot:label>
      <div class="row items-center no-wrap">
        <q-avatar size="24px" class="q-mr-sm">
          <img :src="avatarUrl">
        </q-avatar>
        <div :class="$q.dark.isActive ? 'text-white' : 'text-dark'">
          {{ userStore.currentUser?.first_name }} {{ userStore.currentUser?.last_name }}
        </div>
      </div>
    </template>

    <q-list style="min-width: 200px">
      <q-item>
        <q-item-section>
          <q-item-label>{{ userStore.currentUser?.first_name }} {{ userStore.currentUser?.last_name }}</q-item-label>
          <q-item-label caption>{{ userStore.currentUser?.email }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-separator />

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
  </q-btn-dropdown>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { User, Languages, LogOut, Moon, Sun } from 'lucide-vue-next'
import { useQuasar } from 'quasar'
import { useUserStore } from '../stores/userStore'

const router = useRouter()
const { locale, t } = useI18n()
const userStore = useUserStore()
const $q = useQuasar()

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
  const name = `${userStore.currentUser?.first_name || ''} ${userStore.currentUser?.last_name || ''}`.trim()
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=24&background=0D8ABC&color=fff`
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

<style scoped>
.user-menu {
  padding-right: 8px;
}

.user-menu :deep(.q-btn__content) {
  flex-wrap: nowrap;
}

.user-menu :deep(.q-btn__wrapper) {
  padding-right: 4px;
}

.text-dark {
  color: #424242;
}
</style>