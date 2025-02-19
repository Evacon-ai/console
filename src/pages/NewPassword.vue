<template>
  <div class="window-height window-width row justify-center items-center bg-container">
    <div class="column" style="max-width: 480px; width: 90%">
      <q-card class="q-pa-lg login-card">
        <div class="absolute-top-right q-pa-md">
          <LanguageSelector />
        </div>
        
        <q-card-section class="text-center" style="margin-top: 80px">
          <Logo class="q-mb-lg" :size="64" />
          <div class="text-h5 q-mb-md">{{ $t('auth.setNewPassword') }}</div>
          <p class="text-grey-7">{{ $t('auth.setNewPasswordInstructions') }}</p>
        </q-card-section>

        <q-card-section class="q-px-lg">
          <q-form @submit="onSubmit" class="q-gutter-md">
            <q-input
              v-model="password"
              :type="isPwd ? 'password' : 'text'"
              :label="$t('auth.newPassword')"
              outlined
              :rules="[
                val => !!val || $t('auth.passwordRequired'),
                val => val.length >= 8 || $t('auth.passwordTooShort')
              ]"
              :class="{ 'rtl-input': isRTL }"
              :loading="loading"
              :disable="loading"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>

            <q-input
              v-model="confirmPassword"
              :type="isConfirmPwd ? 'password' : 'text'"
              :label="$t('auth.confirmPassword')"
              outlined
              :rules="[
                val => !!val || $t('auth.confirmPasswordRequired'),
                val => val === password || $t('auth.passwordsDoNotMatch')
              ]"
              :class="{ 'rtl-input': isRTL }"
              :loading="loading"
              :disable="loading"
            >
              <template v-slot:append>
                <q-icon
                  :name="isConfirmPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isConfirmPwd = !isConfirmPwd"
                />
              </template>
            </q-input>

            <template v-if="error">
              <div class="text-negative text-caption q-mb-md">
                {{ formatError(error) }}
              </div>
            </template>

            <template v-if="success">
              <div class="text-positive text-caption q-mb-md">
                {{ $t('auth.passwordResetSuccess') }}
              </div>
            </template>

            <div class="row q-col-gutter-md">
              <div class="col-12">
                <q-btn
                  type="submit"
                  color="primary"
                  class="full-width q-py-sm"
                  size="large"
                  :label="$t('auth.resetPassword')"
                  :loading="loading"
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
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { supabase } from '../lib/supabase'
import Logo from '../components/Logo.vue'
import LanguageSelector from '../components/LanguageSelector.vue'

const router = useRouter()
const route = useRoute()
const { locale, t } = useI18n()

const password = ref('')
const confirmPassword = ref('')
const isPwd = ref(true)
const isConfirmPwd = ref(true)
const success = ref(false)
const loading = ref(false)
const error = ref<string | null>(null)
const isRTL = computed(() => ['ar', 'he'].includes(locale.value))

onMounted(async () => {
  const hashParams = new URLSearchParams(window.location.hash.substring(1))
  const accessToken = hashParams.get('access_token')
  const refreshToken = hashParams.get('refresh_token')
  const type = hashParams.get('type')

  if (!accessToken || !refreshToken || type !== 'recovery') {
    error.value = t('auth.invalidResetLink')
    setTimeout(() => {
      router.push('/login')
    }, 3000)
    return
  }

  try {
    const { error: sessionError } = await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken
    })

    if (sessionError) {
      throw sessionError
    }
  } catch (e) {
    error.value = t('auth.invalidResetLink')
    setTimeout(() => {
      router.push('/login')
    }, 3000)
  }
})

const formatError = (error: string) => {
  if (error.includes('rate limit exceeded')) {
    return t('auth.rateLimitExceeded')
  }
  return error
}

const onSubmit = async () => {
  if (password.value !== confirmPassword.value) {
    return
  }

  loading.value = true
  error.value = null
  success.value = false

  try {
    const { error: updateError } = await supabase.auth.updateUser({
      password: password.value
    })

    if (updateError) throw updateError

    success.value = true
    setTimeout(() => {
      router.push('/login')
    }, 3000)
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to update password'
  } finally {
    loading.value = false
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
</style>