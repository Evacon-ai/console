<template>
  <q-page padding>
    <div class="text-h4 q-mb-lg">{{ $t('profile.title') }}</div>

    <q-card flat bordered>
      <q-card-section class="q-pa-lg">
        <div class="row items-center">
          <q-avatar size="96px">
            <img :src="avatarUrl">
          </q-avatar>
          <div :class="isRTL ? 'q-mr-md' : 'q-ml-md'">
            <div class="text-h5">{{ userStore.currentUser?.firstName }} {{ userStore.currentUser?.lastName }}</div>
            <div class="text-subtitle1 text-grey-7">{{ userStore.currentUser?.email }}</div>
          </div>
          <q-space />
          <q-btn 
            color="negative" 
            :icon-right="isRTL ? 'logout' : undefined"
            :icon="!isRTL ? 'logout' : undefined"
            :label="$t('common.signOut')" 
            @click="handleSignOut"
          />
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section class="q-pa-lg">
        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-6">
            <div class="text-subtitle1 q-mb-md">{{ $t('profile.contactInfo') }}</div>
            <q-list>
              <q-item>
                <q-item-section avatar :class="{ 'items-end': isRTL }">
                  <Mail class="w-5 h-5 text-grey-7" />
                </q-item-section>
                <q-item-section>{{ userStore.currentUser?.email }}</q-item-section>
              </q-item>
            </q-list>
          </div>
          <div class="col-12 col-md-6">
            <div class="text-subtitle1 q-mb-md">{{ $t('profile.accountInfo') }}</div>
            <q-list>
              <q-item>
                <q-item-section avatar :class="{ 'items-end': isRTL }">
                  <Calendar class="w-5 h-5 text-grey-7" />
                </q-item-section>
                <q-item-section>
                  {{ $t('profile.joined', { date: formatDate(userStore.currentUser?.createdAt) }) }}
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar :class="{ 'items-end': isRTL }">
                  <Shield class="w-5 h-5 text-grey-7" />
                </q-item-section>
                <q-item-section>{{ getRoleDisplay }}</q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { Mail, Calendar, Shield } from 'lucide-vue-next'
import { useUserStore } from '../stores/userStore'

const router = useRouter()
const { t, locale } = useI18n()
const userStore = useUserStore()

const isRTL = computed(() => ['ar', 'he'].includes(locale.value))

const avatarUrl = computed(() => {
  const name = `${userStore.currentUser?.firstName || ''} ${userStore.currentUser?.lastName || ''}`.trim()
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=96&background=0D8ABC&color=fff`
})

const getRoleDisplay = computed(() => {
  if (userStore.currentUser?.role) {
    return t(`profile.roles.${userStore.currentUser?.role || "unknown"}`)
  } else {
    return ''
  }
})

const formatDate = (date?: string) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString(locale.value, {
    year: 'numeric',
    month: 'long'
  })
}

const handleSignOut = async () => {
  await userStore.logout()
  router.push('/login')
}
</script>