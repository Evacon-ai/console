<template>
  <div class="window-height window-width row justify-center items-center bg-container">
    <div class="column" style="max-width: 480px; width: 90%">
      <q-card class="q-pa-lg login-card">
        <div class="absolute-top-right q-pa-md">
          <LanguageSelector />
        </div>
        
        <q-card-section class="text-center" style="margin-top: 80px">
          <Logo class="q-mb-lg" :size="64" />
          <div class="text-h5 q-mb-md">{{ $t('auth.signInTitle') }}</div>
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

            <q-input
              v-model="password"
              :type="isPwd ? 'password' : 'text'"
              :label="$t('common.password')"
              outlined
              :rules="[val => !!val || $t('auth.passwordRequired')]"
              :class="{ 'rtl-input': isRTL }"
              :loading="userStore.loading"
              :disable="userStore.loading"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>

            <div class="row items-center justify-between q-mt-md" :class="{ reverse: isRTL }">
              <q-checkbox v-model="remember" :label="$t('common.rememberMe')" :disable="userStore.loading" />
              <q-btn 
                flat 
                color="primary" 
                :label="$t('common.forgotPassword')" 
                :disable="userStore.loading"
                @click="router.push('/forgot-password')"
              />
            </div>

            <template v-if="userStore.error">
              <div class="text-negative text-caption q-mb-md">
                {{ userStore.error }}
              </div>
            </template>

            <q-btn
              type="submit"
              color="primary"
              class="full-width q-py-sm q-mt-xl"
              size="large"
              :label="$t('common.signIn')"
              :loading="userStore.loading"
            />
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
import Logo from '../components/Logo.vue'
import LanguageSelector from '../components/LanguageSelector.vue'

const router = useRouter()
const { locale } = useI18n()
const userStore = useUserStore()

const email = ref('')
const password = ref('')
const isPwd = ref(true)
const remember = ref(false)
const isRTL = computed(() => ['ar', 'he'].includes(locale.value))

const onSubmit = async () => {
  const success = await userStore.login({
    email: email.value,
    password: password.value
  })

  if (success) {
    if (remember.value) {
      localStorage.setItem('remember', 'true')
    }
    router.push('/dashboard')
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
  min-height: 680px;
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

.reverse {
  flex-direction: row-reverse;
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
</style>