<template>
  <q-btn-dropdown
    flat
    :label="getCurrentLanguageName"
    class="language-selector"
    text-color="white"
  >
    <q-list>
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
  </q-btn-dropdown>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const i18n = useI18n()

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
  const currentLang = languages.find(lang => lang.code === i18n.locale.value)
  return currentLang ? currentLang.name : 'English'
})

const changeLanguage = (locale: string) => {
  i18n.locale.value = locale
  localStorage.setItem('language', locale)
}
</script>

<style scoped>
.language-selector {
  font-size: 0.9rem;
}

.language-selector :deep(.q-btn__content) {
  text-transform: none;
}

.language-selector :deep(.q-item) {
  justify-content: flex-start;
  padding-left: 16px;
}

.language-selector :deep(.q-item__section) {
  text-align: left;
}
</style>