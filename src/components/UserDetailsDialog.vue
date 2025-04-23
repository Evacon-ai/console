<template>
  <q-dialog v-model="dialogOpen" persistent>
    <q-card style="min-width: 400px">
      <q-card-section class="row items-center">
        <div class="text-h6">{{ $t('users.editUser') }}</div>
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
                :disable="loading || !canEdit"
              />
            </div>
            <div class="col-12 col-sm-6">
              <q-input
                v-model="form.last_name"
                :label="$t('users.lastName')"
                outlined
                :rules="[val => !!val || $t('users.lastNameRequired')]"
                :disable="loading || !canEdit"
              />
            </div>
          </div>

          <q-input
            v-model="form.email"
            type="email"
            :label="$t('common.email')"
            class="q-mt-md"
            outlined
            disable
          />

          <q-select
            v-model="form.role"
            :options="availableRoles"
            :label="$t('users.role')"
            class="q-mt-md"
            outlined
            emit-value
            map-options
            :disable="loading || !canEdit"
          />

          <div class="text-caption text-grey-7 q-mt-lg">
            <div class="row items-center q-gutter-x-sm">
       
              {{ $t('users.addedBy', { name: getFullName(createdByUser), date: formatTime(props.user?.created_at) }) }}
            </div>
            <div class="row items-center q-gutter-x-sm q-mt-sm">
       
              {{ $t('users.updatedBy', { name: getFullName(updatedByUser), date: formatTime(props.user?.updated_at) }) }}
            </div>
          </div>

          <div v-if="error" class="text-negative q-mt-sm">
            {{ error }}
          </div>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn
            v-if="canEdit"
            flat
            color="negative"
            :label="$t('users.deleteUser')"
            :disable="loading"
            @click="showDeleteConfirm = true"
            class="q-mr-auto"
          />
          <q-btn
            flat
            :label="$t('common.cancel')"
            :disable="loading"
            v-close-popup
          />
          <q-btn
            v-if="canEdit"
            :loading="loading"
            type="submit"
            color="primary"
            :label="$t('common.save')"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>

  <!-- Delete Confirmation Dialog -->
  <q-dialog v-model="showDeleteConfirm" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <div class="text-h6">{{ $t('users.confirmDelete') }}</div>
      </q-card-section>

      <q-card-section>
        {{ $t('users.confirmDeleteMessage') }}
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat :label="$t('common.cancel')" v-close-popup />
        <q-btn
          flat
          color="negative"
          :label="$t('users.deleteUser')"
          :loading="loading"
          @click="handleDelete"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '../stores/userStore'
import api from '../lib/axios'
import { UserPlus, UserCog } from 'lucide-vue-next'
import { useTimeFormatter } from '../utils/formatTime'
import type { UserRole } from '../types'

interface UserMetadata {
  first_name: string
  last_name: string
}

const props = defineProps<{
  modelValue: boolean
  user: any | null
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'user-updated'): void
}>()

const { t } = useI18n()
const userStore = useUserStore()
const { formatTime } = useTimeFormatter()

const dialogOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const loading = ref(false)
const error = ref<string | null>(null)
const showDeleteConfirm = ref(false)
const createdByUser = ref<UserMetadata | null>(null)
const updatedByUser = ref<UserMetadata | null>(null)
const form = ref({
  first_name: '',
  last_name: '',
  email: '',
  role: 'customer_user' as UserRole
})

const canEdit = computed(() => {
  // Only Evacon admins can edit users
  return userStore.isEvaconAdmin
})

const availableRoles = computed(() => {
  return [
    { label: t('profile.roles.user'), value: 'user' },
    { label: t('profile.roles.admin'), value: 'admin' }
  ]
})

watch(() => props.user, (newUser) => {
  if (newUser) {
    // Reset user metadata
    createdByUser.value = null
    updatedByUser.value = null
    
    form.value = {
      first_name: newUser.first_name || '',
      last_name: newUser.last_name || '',
      email: newUser.email || '',
      role: newUser.role || 'customer_user'
    }
    
    // Fetch user metadata
    if (newUser.created_by) {
      fetchUserMetadata(newUser.created_by).then(user => {
        createdByUser.value = user
      })
    }
    
    if (newUser.updated_by) {
      fetchUserMetadata(newUser.updated_by).then(user => {
        updatedByUser.value = user
      })
    }
  }
}, { immediate: true })

const fetchUserMetadata = async (userId: string): Promise<UserMetadata> => {
  try {
    const response = await api.get(`/users/${userId}`)
    return {
      first_name: response.first_name,
      last_name: response.last_name
    }
  } catch (e) {
    console.error('Failed to fetch user metadata:', e)
    return {
      first_name: '—',
      last_name: ''
    }
  }
}

const getFullName = (user: UserMetadata | null) => {
  if (!user) return '—'
  return `${user.first_name} ${user.last_name}`.trim() || '—'
}

const onSubmit = async () => {
  if (!canEdit.value) return
  
  loading.value = true
  error.value = null

  try {
    await api.put(`/users/${props.user.id}`, {
      first_name: form.value.first_name,
      last_name: form.value.last_name,
      email: form.value.email,
      role: form.value.role,
      level: form.value.role.startsWith('customer_') ? 'customer' : 'evacon'
    })

    dialogOpen.value = false
    emit('user-updated')
  } catch (e) {
    error.value = e instanceof Error ? e.message : t('users.failedToUpdateUser')
  } finally {
    loading.value = false
  }
}

const handleDelete = async () => {
  if (!props.user) return
  
  loading.value = true
  error.value = null

  try {
    // Delete user through our API which will handle both database and Firebase deletion
    await api.delete(`/users/${props.user.id}`)

    dialogOpen.value = false
    showDeleteConfirm.value = false
    emit('user-updated')
  } catch (e) {
    error.value = e instanceof Error ? e.message : t('users.failedToDeleteUser')
  } finally {
    loading.value = false
  }
}
</script>