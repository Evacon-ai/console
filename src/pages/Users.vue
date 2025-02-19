<template>
  <q-page padding>
    <div class="row items-center justify-between q-mb-lg">
      <div class="text-h4">{{ $t('users.title') }}</div>
      <q-btn color="primary" icon="add" :label="$t('users.addUser')" @click="showUserForm = true" />
    </div>

    <q-card flat bordered>
      <q-tabs
        v-model="activeTab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="left"
        narrow-indicator
      >
        <q-tab name="customers" no-caps :label="$t('users.customerUsers')" />
        <q-tab 
          v-if="userStore.isEvaconAdmin" 
          name="evacon" 
          no-caps
          :label="$t('users.evaconStaff')" 
        />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="activeTab" animated>
        <!-- Customer Users Panel -->
        <q-tab-panel name="customers">
          <q-table
            :rows="usersStore.customerUsers"
            :columns="columns"
            row-key="id"
            :loading="usersStore.loading"
            :pagination="{ rowsPerPage: 10 }"
          >
            <template v-slot:body="props">
              <q-tr
                :props="props"
                class="cursor-pointer"
                @click="openUserDetails(props.row)"
              >
                <q-td key="fullName" :props="props">
                  {{ props.row.full_name }}
                </q-td>
                <q-td key="email" :props="props">
                  {{ props.row.email }}
                </q-td>
                <q-td key="role" :props="props">
                  <q-chip
                    :color="getRoleColor(props.row.role)"
                    text-color="white"
                    size="sm"
                  >
                    {{ $t(`profile.roles.${props.row.role}`) }}
                  </q-chip>
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
                No users found
              </div>
            </template>
          </q-table>
        </q-tab-panel>

        <!-- Evacon Staff Panel -->
        <q-tab-panel name="evacon">
          <q-table
            :rows="usersStore.evaconUsers"
            :columns="columns"
            row-key="id"
            :loading="usersStore.loading"
            :pagination="{ rowsPerPage: 10 }"
          >
            <template v-slot:body="props">
              <q-tr
                :props="props"
                class="cursor-pointer"
                @click="openUserDetails(props.row)"
              >
                <q-td key="fullName" :props="props">
                  {{ props.row.full_name }}
                </q-td>
                <q-td key="email" :props="props">
                  {{ props.row.email }}
                </q-td>
                <q-td key="role" :props="props">
                  <q-chip
                    :color="getRoleColor(props.row.role)"
                    text-color="white"
                    size="sm"
                  >
                    {{ $t(`profile.roles.${props.row.role}`) }}
                  </q-chip>
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
                No users found
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

    <UserDetailsDialog
      v-model="showUserDetails"
      :user="selectedUser"
      @user-updated="loadUsers"
    />

    <!-- Error Dialog -->
    <q-dialog v-model="showError">
      <q-card>
        <q-card-section>
          <div class="text-h6">Error</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          {{ usersStore.error }}
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Close" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '../stores/userStore'
import { useUsersStore } from '../stores/usersStore'
import UserFormDialog from '../components/UserFormDialog.vue'
import UserDetailsDialog from '../components/UserDetailsDialog.vue'

const userStore = useUserStore()
const usersStore = useUsersStore()
const activeTab = ref('customers')
const showUserForm = ref(false)
const showUserDetails = ref(false)
const showError = ref(false)
const selectedUser = ref(null)

const columns = [
  {
    name: 'fullName',
    required: true,
    label: 'Full Name',
    align: 'left',
    field: row => row.full_name,
    sortable: true
  },
  {
    name: 'email',
    required: true,
    label: 'Email',
    align: 'left',
    field: 'email',
    sortable: true
  },
  {
    name: 'role',
    required: true,
    label: 'Role',
    align: 'left',
    field: 'role',
    sortable: true
  }
]

const getRoleColor = (role: string) => {
  switch (role) {
    case 'evacon_admin':
      return 'purple'
    case 'evacon_staff':
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
})
</script>

<style scoped>
.q-table tbody tr:hover {
  background: rgba(0, 0, 0, 0.05);
}

body.body--dark .q-table tbody tr:hover {
  background: rgba(255, 255, 255, 0.07);
}
</style>