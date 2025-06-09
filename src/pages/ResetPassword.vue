<template>
  <div class="window-height window-width row justify-center items-center bg-container">
    <div class="column" style="max-width: 480px; width: 90%">
      <q-card class="q-pa-lg login-card">
        <div class="absolute-top-right q-pa-md">
          <LanguageSelector />
        </div>
        
        <q-card-section class="text-center" style="margin-top: 80px">
          <Logo class="q-mb-lg" :size="64" />
          <div class="text-h5 q-mb-md">{{ $t('auth.resetPassword') }}</div>
          <p class="text-grey-7">{{ $t('auth.resetPasswordInstructions') }}</p>
        </q-card-section>

        <q-card-section class="q-px-lg">
          <q-form @submit="onSubmit" class="q-gutter-md">
            <q-input
              v-model="email"
              type="email"
              :label="$t('common.email')"
              outlined
              :rules="[val => !!val || $t('auth.emailRequired')]"
              :class="{ 'rtl-input': isRTL }"
              :loading="userStore.loading"
              :disable="userStore.loading"
            />

            <template v-if="userStore.error">
              <div class="text-negative text-caption q-mb-md">
                {{ formatError(userStore.error) }}
              </div>
            </template>

            <template v-if="success">
              <div class="text-positive text-caption q-mb-md">
                {{ $t('auth.resetPasswordSuccess') }}
              </div>
            </template>

            <div class="row q-col-gutter-md">
              <div class="col-12 col-sm-6">
                <q-btn
                  flat
                  color="primary"
                  class="full-width q-py-sm"
                  :label="$t('common.back')"
                  :disable="userStore.loading"
                  @click="router.push('/login')"
                />
              </div>
              <div class="col-12 col-sm-6">
                <q-btn
                  type="submit"
                  color="primary"
                  class="full-width q-py-sm reset-btn"
                  size="large"
                  :label="$t('auth.sendResetLink')"
                  :loading="userStore.loading"
                />
              </div>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '../stores/userStore'
import Logo from '../components/shared/Logo.vue'
import LanguageSelector from '../components/shared/LanguageSelector.vue'

const router = useRouter()
const { locale, t } = useI18n()
const userStore = useUserStore()

const email = ref('')
const success = ref(false)
const isRTL = computed(() => ['ar', 'he'].includes(locale.value))

const formatError = (error: string) => {
  if (error.includes('rate limit exceeded')) {
    return t('auth.rateLimitExceeded')
  }
  return error
}

const onSubmit = async () => {
  success.value = false
  const result = await userStore.resetPassword(email.value)
  if (result) {
    success.value = true
    setTimeout(() => {
      router.push('/login')
    }, 3000)
  }
}
</script>

<style scoped>
.bg-container {
  position: relative;
  overflow: hidden;
  background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
              url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=2000&q=80');
  background-size: cover;
  background-position: center;
}

.login-card {
  min-height: 600px;
  display: flex;
  flex-direction: column;
  position: relative;
}

.rtl-input {
  direction: rtl;
}

.rtl-input :deep(.q-field__label) {
  right: 0;
  left: auto !important;
  transform-origin: right !important;
}

.rtl-input :deep(.q-field__native),
.rtl-input :deep(.q-field__prefix),
.rtl-input :deep(.q-field__suffix) {
  text-align: right;
}

.column {
  position: relative;
  z-index: 1;
}

.q-form {
  max-width: 400px;
  margin: 0 auto;
  margin-top: 20px;
}

.reset-btn {
  font-size: 0.875rem !important;
}
</style>