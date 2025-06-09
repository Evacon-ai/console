<template>
  <q-page padding>
    <div class="row items-center justify-between q-mb-lg">
      <div class="text-h4 q-mr-md">{{ $t('users.title') }}</div>
      <q-space />
      <q-btn
        flat
        round
        color="primary"
        icon="refresh"
        class="q-mr-sm"
        :loading="usersStore.loading"
        @click="loadUsers"
      >
        <q-tooltip>{{ $t('common.refresh') }}</q-tooltip>
      </q-btn>
      <q-btn
        color="primary"
        icon="add"
        :label="$t('users.addUser')"
        @click="showUserForm = true"
      />
    </div>

    <q-card flat bordered>
      <q-tabs
        v-model="activeTab"
        v-if="!isCustomerUser"
        class="bg-primary text-white" 
        active-color="primary"
        indicator-color="primary"
        align="justify"
        :breakpoint="0"
      >
        <q-tab 
          name="customers" 
          no-caps 
          class="q-px-md"
        >
          <template v-slot:default>
            <div class="row items-center q-gutter-x-sm">
              <Users class="w-5 h-5" />
              <div>{{ $t('users.customerUsers') }}</div>
            </div>
          </template>
        </q-tab>
        <q-tab 
          v-if="userStore.isEvaconAdmin" 
          name="evacon" 
          no-caps 
          class="q-px-md"
        >
          <template v-slot:default>
            <div class="row items-center q-gutter-x-sm">
              <Shield class="w-5 h-5" />
              <div>{{ $t('users.evaconStaff') }}</div>
            </div>
          </template>
        </q-tab>
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="activeTab" animated>
        <!-- Customer Users Panel -->
        <q-tab-panel name="customers">
          <q-table
            :rows="usersStore.customerUsers"
            :columns="getCustomerColumns"
            row-key="id"
            :loading="usersStore.loading"
            :pagination="{ rowsPerPage: 10 }"
            :rows-per-page-label="$t('common.table.rowsPerPage')"
            :records-per-page-label="$t('common.table.recordsPerPage')"
            :no-data-label="$t('common.table.noData')"
            :no-results-label="$t('common.table.noResults')"
            :loading-label="$t('common.table.loading')"
            :selected-records-label="$t('common.table.selectedRecords')"
          >
            <template v-slot:body="props">
              <q-tr
                :props="props"
                class="cursor-pointer"
                @click="openUserDetails(props.row)"
              >
                <q-td key="fullName" :props="props">
                  {{ props.row.first_name }} {{ props.row.last_name }}
                </q-td>
                <q-td key="email" :props="props">
                  {{ props.row.email }}
                </q-td>
                <q-td key="organization" :props="props" v-if="!isCustomerUser">
                  <div class="row items-center" v-if="props.row.organization_id">
                    <q-avatar size="32px" class="q-mr-sm">
                      <template v-if="getOrgLogo(props.row.organization_id)">
                        <img :src="getOrgLogo(props.row.organization_id)" :alt="getOrgName(props.row.organization_id)">
                      </template>
                      <template v-else>
                        <div class="default-logo">
                          <Building2 class="w-5 h-5 text-grey-6" />
                        </div>
                      </template>
                    </q-avatar>
                    {{ getOrgName(props.row.organization_id) }}
                  </div>
                  <span v-else>—</span>
                </q-td>
                <q-td key="role" :props="props">
                  <q-chip
                    :color="getRoleColor(`${props.row.level}_${props.row.role}`)"
                    text-color="white"
                    size="sm"
                  >
                    {{ $t(`profile.roles.${props.row.level}_${props.row.role}`) }}
                  </q-chip>
                </q-td>
                <q-td key="joined" :props="props">
                  {{ formatTime(props.row.created_at) }}
                </q-td>
              </q-tr>
            </template>

            <template v-slot:loading>
              <q-inner-loading showing color="primary">
                <q-spinner-dots size="50px" color="primary" />
              </q-inner-loading>
            </template>

            <template v-slot:no-data>
              <div class="full-width row flex-center q-pa-md text-grey-8">
                {{ $t('users.noUsersFound') }}
              </div>
            </template>
          </q-table>
        </q-tab-panel>

        <!-- Evacon Staff Panel -->
        <q-tab-panel name="evacon">
          <q-table
            :rows="usersStore.evaconUsers"
            :columns="evaconColumns"
            row-key="id"
            :loading="usersStore.loading"
            :pagination="{ rowsPerPage: 10 }"
            :rows-per-page-label="$t('common.table.rowsPerPage')"
            :records-per-page-label="$t('common.table.recordsPerPage')"
            :no-data-label="$t('common.table.noData')"
            :no-results-label="$t('common.table.noResults')"
            :loading-label="$t('common.table.loading')"
            :selected-records-label="$t('common.table.selectedRecords')"
          >
            <template v-slot:body="props">
              <q-tr
                :props="props"
                class="cursor-pointer"
                @click="openUserDetails(props.row)"
              >
                <q-td key="fullName" :props="props">
                  {{ props.row.first_name }} {{ props.row.last_name }}
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
                    {{ $t(`profile.roles.${props.row.level}_${props.row.role}`) }}
                  </q-chip>
                </q-td>
                <q-td key="joined" :props="props">
                  {{ formatTime(props.row.created_at) }}
                </q-td>
              </q-tr>
            </template>

            <template v-slot:loading>
              <q-inner-loading showing color="primary">
                <q-spinner-dots size="50px" color="primary" />
              </q-inner-loading>
            </template>

            <template v-slot:no-data>
              <div class="full-width row flex-center q-pa-md text-grey-8">
                {{ $t('users.noUsersFound') }}
              </div>
            </template>
          </q-table>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>

    <UserFormDialog 
      v-model="showUserForm"
      @user-added="loadUsers"
    />

    <!-- Only render UserDetailsDialog when selectedUser exists -->
    <UserDetailsDialog
      v-if="selectedUser"
      v-model="showUserDetails"
      :user="selectedUser"
      @user-updated="loadUsers"
    />

    <!-- Error Dialog -->
    <q-dialog v-model="showError">
      <q-card>
        <q-card-section>
          <div class="text-h6">{{ $t('users.failedToLoadUsers') }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          {{ usersStore.error }}
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat :label="$t('common.close')" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { Users, Shield, Building2 } from 'lucide-vue-next'
import { useTimeFormatter } from '../utils/formatTime'
import { useUserStore } from '../stores/userStore'
import { useUsersStore } from '../stores/usersStore'
import { useOrganizationsStore } from '../stores/organizationsStore'
import UserFormDialog from '../components/user/UserFormDialog.vue'
import UserDetailsDialog from '../components/user/UserDetailsDialog.vue'

const { t } = useI18n()
const { formatTime } = useTimeFormatter()
const userStore = useUserStore()
const usersStore = useUsersStore()
const organizationsStore = useOrganizationsStore()
const activeTab = ref('customers')
const showUserForm = ref(false)
const showUserDetails = ref(false)
const showError = ref(false)
const selectedUser = ref(null)
const isCustomerUser = computed(() => userStore.currentUser?.level === 'customer')

const getCustomerColumns = computed(() => {
  const columns = [
    {
      name: 'fullName',
      required: true,
      label: t('users.fullName'),
      align: 'left',
      field: row => `${row.first_name} ${row.last_name}`,
      sortable: true
    },
    {
      name: 'email',
      required: true,
      label: t('common.email'),
      align: 'left',
      field: 'email',
      sortable: true
    }
  ]
  
  // Only add organization column for Evacon users
  if (!isCustomerUser.value) {
    columns.push({
      name: 'organization',
      required: true,
      label: t('organizations.organization'),
      align: 'left',
      field: 'organization_id',
      format: (val) => {
        const org = organizationsStore.organizations.find(org => org.id === val)
        return org?.name || '—'
      }
    })
  }
  
  // Add remaining columns
  columns.push(
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
    }
  )
  
  return columns
})

const evaconColumns = computed(() => getCustomerColumns.value.filter(col => col.name !== 'organization'))

const getRoleColor = (role: string) => {
  switch (role) {
    case 'evacon_admin':
      return 'purple'
    case 'evacon_user':
      return 'deep-purple'
    case 'customer_admin':
      return 'indigo'
    case 'customer_user':
      return 'blue'
    default:
      return 'grey'
  }
}

const openUserDetails = (user: any) => {
  selectedUser.value = user
  showUserDetails.value = true
}

const loadUsers = async () => {
  try {
    await usersStore.fetchUsers()
  } catch (e) {
    showError.value = true
  }
}

onMounted(() => {
  loadUsers()
  // Fetch organizations for any loaded users
  const uniqueOrgIds = new Set(usersStore.users.map(u => u.organization_id).filter(Boolean))
  Promise.all(Array.from(uniqueOrgIds).map(id => 
    organizationsStore.fetchOrganizationById(id)
  ))
})

const getOrgLogo = (orgId: string) => {
  const org = organizationsStore.organizations.find(org => org.id === orgId)
  return org?.logo_url
}

const getOrgName = (orgId: string) => {
  const org = organizationsStore.organizations.find(org => org.id === orgId)
  return org?.name || '—'
}
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

.q-tabs {
  position: relative;
}

.q-tabs::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to right, rgba(255, 255, 255, 0.1), transparent);
  pointer-events: none;
}

.q-tab {
  min-height: 56px;
  font-weight: 500;
  font-size: 1rem;
  opacity: 0.8;
  transition: all 0.3s ease;
}

.q-tab:hover {
  opacity: 1;
  background: rgba(255, 255, 255, 0.1);
}

.q-tab--active {
  opacity: 1;
  background: rgba(255, 255, 255, 0.15);
}

.q-table tbody tr:hover {
  background: rgba(0, 0, 0, 0.05);
}

body.body--dark .q-table tbody tr:hover {
  background: rgba(255, 255, 255, 0.07);
}
</style>