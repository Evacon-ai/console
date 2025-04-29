<template>
  <div class="users-panel">
    <div class="row items-center justify-between q-mb-lg">
      <div class="text-subtitle1 text-weight-medium">{{ $t('organizations.users.title') }}</div>
      <q-btn
        color="primary"
        icon="add"
        :label="$t('organizations.users.addUser')"
        :disable="!canEdit"
      >
        <q-tooltip v-if="!canEdit">
          {{ $t('organizations.users.onlyAdminsCanAdd') }}
        </q-tooltip>
      </q-btn>
    </div>

    <q-table
      flat
      bordered
      :rows="users"
      :columns="columns"
      row-key="id"
      :loading="loading"
      :pagination="{ rowsPerPage: 10 }"
      :rows-per-page-label="$t('common.table.rowsPerPage')"
      :records-per-page-label="$t('common.table.recordsPerPage')"
      :no-data-label="$t('common.table.noData')"
      :no-results-label="$t('common.table.noResults')"
      :loading-label="$t('common.table.loading')"
      :selected-records-label="$t('common.table.selectedRecords')"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="name" :props="props">
            <div class="row items-center">
              <q-avatar size="32px">
                <img :src="getUserAvatar(props.row)" :alt="getUserFullName(props.row)">
              </q-avatar>
              <div class="q-ml-sm">
                {{ getUserFullName(props.row) }}
              </div>
            </div>
          </q-td>
          <q-td key="email" :props="props">
            {{ props.row.email }}
          </q-td>
          <q-td key="role" :props="props">
            <q-chip
              :color="getRoleColor(`${props.row.level}_${props.row.role}`)"
              text-color="white"
              size="sm"
            >
              {{ props.row.role === 'admin' ? $t('organizations.users.roles.administrator') : $t('organizations.users.roles.user') }}
            </q-chip>
          </q-td>
          <q-td key="joined" :props="props">
            {{ formatTime(props.row.created_at) }}
          </q-td>
          <q-td key="actions" :props="props">
            <q-btn
              flat
              round
              size="sm"
              color="primary"
              icon="more_vert"
              :disable="!canEdit"
            >
              <q-menu>
                <q-list style="min-width: 120px">
                  <q-item clickable v-close-popup>
                    <q-item-section @click="editUserRole(props.row)">{{ $t('organizations.users.editRole') }}</q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item 
                    clickable 
                    v-close-popup 
                    class="text-negative"
                    @click="confirmRemoveUser(props.row)"
                  >
                    <q-item-section>{{ $t('organizations.users.remove') }}</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </q-td>
        </q-tr>
      </template>

      <template v-slot:loading>
        <q-inner-loading showing color="primary">
          <q-spinner-dots size="50px" color="primary" />
        </q-inner-loading>
      </template>

      <template v-slot:no-data>
        <div class="full-width row flex-center q-pa-lg text-grey-7">
          <Users class="w-12 h-12 q-mb-md text-grey-5" />
          <div class="col-12 text-center">{{ $t('organizations.users.noUsers') }}</div>
          <div class="col-12 text-center text-caption">
            {{ $t('organizations.users.noUsersCaption') }}
          </div>
        </div>
      </template>
    </q-table>

    <!-- Remove User Confirmation Dialog -->
    <q-dialog v-model="showRemoveConfirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <div class="text-h6">{{ $t('organizations.users.removeTitle') }}</div>
        </q-card-section>

        <q-card-section v-if="selectedUser">
          <p>{{ $t('organizations.users.removeConfirm', { name: getUserFullName(selectedUser) }) }}</p>
          <p class="text-caption text-negative">{{ $t('organizations.users.removeWarning') }}</p>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat :label="$t('common.cancel')" v-close-popup />
          <q-btn
            flat
            color="negative"
            :label="$t('organizations.users.remove')"
            :loading="loading"
            @click="handleRemoveUser"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Role Edit Dialog -->
    <RoleEditDialog
      v-if="selectedUser"
      v-model="showRoleEdit"
      :user="selectedUser"
      @submit="handleRoleChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { Users } from 'lucide-vue-next'
import { useTimeFormatter } from '../../../utils/formatTime'
import { useUserStore } from '../../../stores/userStore'
import { useUsersStore } from '../../../stores/usersStore'
import RoleEditDialog from '../RoleEditDialog.vue'

const props = defineProps<{
  organizationId: string
}>()

const { t } = useI18n()
const { formatTime } = useTimeFormatter()
const userStore = useUserStore()
const usersStore = useUsersStore()
const showRemoveConfirm = ref(false)
const showRoleEdit = ref(false)
const selectedUser = ref<any>(null)
const loading = ref(false)

// Filter for customer users belonging to this organization
const users = computed(() => 
  usersStore.organizationUsers(props.organizationId).value
)

const columns = [
  {
    name: 'name',
    required: true,
    label: t('users.fullName'),
    align: 'left',
    field: row => getUserFullName(row),
    sortable: true
  },
  {
    name: 'email',
    required: true,
    label: t('common.email'),
    align: 'left',
    field: 'email',
    sortable: true
  },
  {
    name: 'role',
    required: true,
    label: t('users.role'),
    align: 'left',
    field: 'role',
    sortable: true
  },
  {
    name: 'joined',
    required: true,
    label: t('profile.joined', { date: '' }).replace('{date}', ''),
    align: 'left',
    field: 'created_at',
    format: (val) => formatTime(val),
    sortable: true
  },
  {
    name: 'actions',
    required: true,
    label: '',
    align: 'right',
    field: row => row
  }
]

// Only Evacon admins and organization admins can edit
const canEdit = computed(() => {
  return userStore.isEvaconAdmin || 
    (userStore.currentUser?.level === 'customer' && 
     userStore.currentUser?.role === 'admin' &&
     userStore.currentUser?.organization_id === props.organizationId)
})

const getUserFullName = (user: any) => {
  return `${user.first_name} ${user.last_name}`.trim()
}

const getUserAvatar = (user: any) => {
  const name = getUserFullName(user)
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=32&background=0D8ABC&color=fff`
}

// Add getRoleColor function to handle role colors
const getRoleColor = (role: string) => {
  switch (role) {
    case 'customer_admin':
    case 'evacon_admin':
      return 'indigo'
    case 'customer_user':
    case 'evacon_user':
      return 'blue'
    default:
      return 'grey'
  }
}

onMounted(() => {
  usersStore.fetchUsers()
})

const confirmRemoveUser = (user: any) => {
  selectedUser.value = user
  showRemoveConfirm.value = true
}

const editUserRole = (user: any) => {
  selectedUser.value = user
  showRoleEdit.value = true
}

const handleRoleChange = async (data: { role: string }) => {
  if (!selectedUser.value) return
  
  loading.value = true
  try {
    await usersStore.updateUser(selectedUser.value.id, {
      ...selectedUser.value,
      role: data.role
    })
    
    selectedUser.value = null
    await usersStore.fetchUsers()
  } catch (error) {
    console.error('Failed to update user role:', error)
  } finally {
    loading.value = false
  }
}

const handleRemoveUser = async () => {
  if (!selectedUser.value) return
  
  loading.value = true
  try {
    await usersStore.deleteUser(selectedUser.value.id)
    
    showRemoveConfirm.value = false
    selectedUser.value = null
    await usersStore.fetchUsers()
  } catch (error) {
    console.error('Failed to remove user:', error)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.users-panel {
  width: 100%;
}

.q-table__grid-content {
  min-height: 300px;
}
</style>