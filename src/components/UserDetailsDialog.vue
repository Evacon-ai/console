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

          <q-select
            v-if="form.level === 'customer'"
            v-show="canEdit"
            v-model="form.organization_id"
            :options="organizationOptions" 
            :label="$t('organizations.organization')"
            class="q-mt-md"
            outlined
            emit-value
            map-options
            :disable="loading || (userStore.currentUser?.level === 'customer' && userStore.currentUser?.role === 'admin')"
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
              <div v-else>Select organization</div>
            </template>
          </q-select>

          <!-- Hidden organization field for customer admins -->
          <q-input
            v-if="form.level === 'customer' && userStore.currentUser?.level === 'customer' && userStore.currentUser?.role === 'admin'"
            v-model="form.organization_id"
            type="hidden"
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
import { ref, computed, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '../stores/userStore'
import { useUsersStore } from '../stores/usersStore'
import { useOrganizationsStore } from '../stores/organizationsStore'
import { UserPlus, UserCog, Building2 } from 'lucide-vue-next'
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
const usersStore = useUsersStore()
const { formatTime } = useTimeFormatter()
const organizationsStore = useOrganizationsStore()

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
  role: 'user' as UserRole,
  level: '',
  organization_id: ''
})

onMounted(() => {
  if (props.user?.organization_id) {
    organizationsStore.fetchOrganizationById(props.user.organization_id)
  }
})

const canEdit = computed(() => {
  // Evacon admins can edit all users
  // Customer admins can edit users in their own organization
  return userStore.isEvaconAdmin || 
    (userStore.currentUser?.level === 'customer' && 
     userStore.currentUser?.role === 'admin' && 
     userStore.currentUser?.organization_id === props.user?.organization_id)
})

const availableRoles = computed(() => {
  return [
    { label: t('profile.roles.user'), value: 'user' },
    { label: t('profile.roles.admin'), value: 'admin' }
  ]
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

watch(() => props.user, async (newUser) => {
  if (newUser) {
    // Reset user metadata
    createdByUser.value = null
    updatedByUser.value = null
    
    form.value = {
      first_name: newUser.first_name || '',
      last_name: newUser.last_name || '',
      email: newUser.email || '',
      role: newUser.role || 'customer_user',
      level: newUser.level || 'customer',
      organization_id: newUser.organization_id || ''
    }
    
    // Fetch user metadata
    if (newUser.updated_by) {
      updatedByUser.value = await userStore.fetchUserMetadata(newUser.updated_by)
    }
  }
}, { immediate: true })

const getFullName = (user: UserMetadata | null) => {
  if (!user) return '—'
  return `${user.first_name} ${user.last_name}`.trim() || '—'
}

const onSubmit = async () => {
  if (!canEdit.value) return
  
  // For customer admins, ensure organization_id is set to their own organization
  if (userStore.currentUser?.level === 'customer' && userStore.currentUser?.role === 'admin') {
    form.value.organization_id = userStore.currentUser.organization_id
  }
  
  loading.value = true
  error.value = null

  try {
    await usersStore.updateUser(props.user.id, {
      first_name: form.value.first_name,
      last_name: form.value.last_name,
      email: form.value.email,
      organization_id: form.value.organization_id,
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
  
  // Customer admins can only delete users from their own organization
  if (userStore.currentUser?.level === 'customer' && 
      userStore.currentUser?.role === 'admin' && 
      props.user.organization_id !== userStore.currentUser.organization_id) {
    error.value = t('users.cannotDeleteUserFromDifferentOrg')
    showDeleteConfirm.value = false
    return
  }
  
  loading.value = true
  error.value = null

  try {
    await usersStore.deleteUser(props.user.id)

    dialogOpen.value = false
    showDeleteConfirm.value = false
    emit('user-updated')
  } catch (e) {
    error.value = e instanceof Error ? e.message : t('users.failedToDeleteUser')
  } finally {
    loading.value = false
  }
}

watch(() => dialogOpen.value, (newVal) => {
  if (newVal) {
    if (props.user?.organization_id) {
      organizationsStore.fetchOrganizationById(props.user.organization_id)
    }
  }
})
</script>

<style scoped>
.default-logo {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  border-radius: 50%;
}

.body--dark .default-logo {
  background-color: #424242;
}
</style>