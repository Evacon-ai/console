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
                v-model="form.first_name"
                :label="$t('users.firstName')"
                outlined
                :rules="[val => !!val || $t('users.firstNameRequired')]"
                :disable="loading"
              />
            </div>
            <div class="col-12 col-sm-6">
              <q-input
                v-model="form.last_name"
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
            v-model="form.level"
            :options="levelOptions"
            :label="$t('users.level')"
            class="q-mt-md"
            outlined
            emit-value
            map-options
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

          <q-select
            v-if="form.level === 'customer'"
            v-model="form.organization_id"
            :options="organizationOptions"
            :label="$t('organizations.organization')"
            class="q-mt-md"
            outlined
            emit-value
            map-options
            :rules="[val => !!val || $t('organizations.nameRequired')]"
          >
            <template v-slot:selected>
              <div class="row items-center" v-if="getSelectedOrg">
                <q-avatar size="24px" class="q-mr-sm">
                  <template v-if="getSelectedOrg.logo_url">
                    <img :src="getSelectedOrg.logo_url" :alt="getSelectedOrg.name">
                  </template>
                  <template v-else>
                    <div class="default-logo">
                      <Building2 class="w-4 h-4 text-grey-6" />
                    </div>
                  </template>
                </q-avatar>
                {{ getSelectedOrg.name }}
              </div>
            </template>
          </q-select>

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
import { useOrganizationsStore } from '../stores/organizationsStore'
import { Building2 } from 'lucide-vue-next'
import { createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../lib/firebase'
import { generateRandomPassword } from '../utils/password'
import api from '../lib/axios'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'user-added'): void
}>()

const { t } = useI18n()
const userStore = useUserStore()
const organizationsStore = useOrganizationsStore()

onMounted(() => {
  organizationsStore.fetchOrganizations()
})

const dialogOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const loading = ref(false)
const error = ref<string | null>(null)
const isPwd = ref(true)
const form = ref({
  first_name: '',
  last_name: '',
  email: '',
  level: '',
  role: '',
  organization_id: ''
})

const levelOptions = computed(() => {
  const options = [
    { label: t('users.levels.evacon'), value: 'evacon' },
    { label: t('users.levels.customer'), value: 'customer' }
  ]
  return options
})
  
const roleOptions = computed(() => {
  const options = [
    { label: t('profile.roles.user'), value: 'user' },
    { label: t('profile.roles.admin'), value: 'admin' }
  ]
  return options
})

const organizationOptions = computed(() => {
  return organizationsStore.organizations.map(org => ({
    label: org.name,
    value: org.id,
    logo_url: org.logo_url
  }))
})

const getSelectedOrg = computed(() => {
  return organizationsStore.organizations.find(org => org.id === form.value.organization_id)
})

watch(() => form.value.organization_id, (newId) => {
  if (newId) {
    organizationsStore.fetchOrganizationById(newId)
  }
})

const onSubmit = async () => {
  loading.value = true
  error.value = null

  try {

    // Send new user creation command to the server:
    
    await api.post('/users', {
      created_by: userStore.currentUser?.id,
      first_name: form.value.first_name,
      last_name: form.value.last_name,
      email: form.value.email,
      level: form.value.level,
      role: form.value.role,
      organization_id: form.value.level === 'customer' ? form.value.organization_id : null
    })

    dialogOpen.value = false
    emit('user-added')
  } catch (e) {
    // Handle Firebase-specific errors
    if (e instanceof Error) {
      if (e.message.includes('auth/email-already-in-use')) {
        error.value = t('users.emailAlreadyInUse')
      } else if (e.message.includes('auth/invalid-email')) {
        error.value = t('users.invalidEmail')
      } else {
        error.value = e.message
      }
    } else {
      error.value = t('users.failedToCreateUser')
    }
    error.value = e instanceof Error ? e.message : t('users.failedToCreateUser')
  } finally {
    loading.value = false
  }
}
</script>