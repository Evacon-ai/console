<template>
  <q-dialog v-model="dialogOpen" persistent>
    <q-card style="min-width: 400px">
      <q-card-section class="row items-center">
        <div class="text-h6">{{ $t('users.addUser') }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-form @submit="onSubmit" class="q-gutter-md">
        <q-card-section>
          <div class="row q-col-gutter-md">
            <div class="col-12 col-sm-6">
              <q-input
                v-model="form.firstName"
                :label="$t('users.firstName')"
                outlined
                :rules="[val => !!val || $t('users.firstNameRequired')]"
                :disable="loading"
              />
            </div>
            <div class="col-12 col-sm-6">
              <q-input
                v-model="form.lastName"
                :label="$t('users.lastName')"
                outlined
                :rules="[val => !!val || $t('users.lastNameRequired')]"
                :disable="loading"
              />
            </div>
          </div>

          <q-input
            v-model="form.email"
            type="email"
            :label="$t('common.email')"
            class="q-mt-md"
            outlined
            :rules="[
              val => !!val || $t('auth.emailRequired'),
              val => /^[^@]+@[^@]+\.[^@]+$/.test(val) || $t('users.invalidEmail')
            ]"
            :disable="loading"
          />

          <q-select
            v-model="form.role"
            :options="roleOptions"
            :label="$t('users.role')"
            class="q-mt-md"
            outlined
            emit-value
            map-options
            :disable="loading"
          />

          <div v-if="error" class="text-negative q-mt-sm">
            {{ error }}
          </div>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn
            flat
            :label="$t('common.cancel')"
            v-close-popup
            :disable="loading"
          />
          <q-btn
            :loading="loading"
            type="submit"
            color="primary"
            :label="$t('common.save')"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '../stores/userStore'
import { supabase } from '../lib/supabase'
import type { UserRole } from '../types'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'user-added'): void
}>()

const { t } = useI18n()
const userStore = useUserStore()

const dialogOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const loading = ref(false)
const error = ref<string | null>(null)
const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  role: 'customer_user' as UserRole
})

const roleOptions = computed(() => {
  const options = [
    { label: t('profile.roles.customer_user'), value: 'customer_user' },
    { label: t('profile.roles.customer_admin'), value: 'customer_admin' }
  ]

  if (userStore.isEvaconAdmin) {
    options.unshift(
      { label: t('profile.roles.evacon_staff'), value: 'evacon_staff' },
      { label: t('profile.roles.evacon_admin'), value: 'evacon_admin' }
    )
  }

  return options
})

const onSubmit = async () => {
  loading.value = true
  error.value = null

  try {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) throw new Error('Not authenticated')

    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-user`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify({
          firstName: form.value.firstName,
          lastName: form.value.lastName,
          email: form.value.email,
          role: form.value.role
        })
      }
    )

    const result = await response.json()
    if (!response.ok) {
      throw new Error(result.error || 'Failed to create user')
    }

    dialogOpen.value = false
    emit('user-added')
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to create user'
  } finally {
    loading.value = false
  }
}
</script>