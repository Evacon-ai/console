<template>
  <q-page padding>
    <div class="row items-center justify-between q-mb-lg">
      <div class="text-h4">{{ $t('organizations.title') }}</div>
      <div class="row items-center q-gutter-sm">
        <q-btn
          flat
          round
          color="primary"
          icon="refresh"
          :loading="organizationsStore.loading"
          @click="organizationsStore.fetchOrganizations"
        >
          <q-tooltip>{{ $t('common.refresh') }}</q-tooltip>
        </q-btn>
        <q-btn
          color="primary"
          icon="add"
          :label="$t('organizations.addNew')"
          @click="showCreateDialog = true"
        />
      </div>
    </div>

    <div class="row q-col-gutter-md">
      <div v-if="organizationsStore.loading" class="col-12 flex flex-center">
        <q-spinner-dots size="40px" color="primary" />
      </div>
      
      <template v-else-if="organizations.length">
        <div class="col-12" v-for="org in organizations" :key="org.id" @click="showOrganization(org)">
          <q-card flat bordered class="rounded-borders">
            <q-card-section>
              <div class="row items-center justify-between">
                <div class="row items-center">
                  <q-avatar size="64px" class="q-mr-md">
                    <template v-if="org.logo_url">
                      <img :src="org.logo_url" alt="Organization logo">
                    </template>
                    <template v-else>
                      <div class="default-logo">
                        <Building2 class="w-10 h-10 text-grey-6" />
                      </div>
                    </template>
                  </q-avatar>
                  <div>
                    <div class="text-h6">{{ org.name }}</div>
                    <div class="text-grey-7">
                      <LocationDisplay
                        :city="org.address?.city"
                        :state="org.address?.state"
                        :country="org.address?.country"
                      />
                    </div>
                  </div>
                </div>
                <div class="row items-center q-gutter-sm">

                  <q-btn
                    color="primary"
                    class="project-count-btn"
                    size="sm"
                    :label="$t('organizations.projectCount', { count: projectsStore.projectsByOrganizationId(org.id).value.length })"
                    @click.stop="router.push({ name: 'projects', query: { organization: org.id }})"
                  >
                    <q-tooltip>
                      {{ $t('organizations.viewProjects') }}
                    </q-tooltip>
                  </q-btn>
                  <q-btn
                    :color="org.account_status === 'active' ? 'positive' : 'grey'"
                    :label="$t(`organizations.status.${org.account_status}`)"
                    class="status-btn"
                    size="sm"
                    @click.stop="toggleOrgStatus(org)"
                    :loading="isUpdating(org.id)"
                    :disable="!canEdit"
                  >
                    <q-tooltip v-if="!canEdit">
                      {{ $t('organizations.users.onlyAdminsCanChangeStatus') }}
                    </q-tooltip>
                  </q-btn>
                </div>
              </div>
            </q-card-section>

            <q-card-section>
              <div class="row items-center text-grey-7">
                {{ $t('organizations.addedOn', { date: formatTime(org.created_at) }) }}
              </div>
            </q-card-section>
          </q-card>
        </div>
      </template>
      <div v-else class="col-12 text-center text-grey q-pa-xl">
        {{ $t('organizations.noOrganizations') }}
      </div>
    </div>

    <OrganizationDetails
      v-if="showDetails && selectedOrg"
      v-model="showDetails"
      :organization="selectedOrg"
      @organization-updated="onOrganizationUpdated"
      @update:modelValue="handleDetailsClose"
    />

    <CreateDialog
      v-model="showCreateDialog"
      @organization-created="onOrganizationCreated"
    />
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { Building2 } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import { useTimeFormatter } from '../utils/formatTime'
import { useOrganizationsStore } from '../stores/organizationsStore'
import { useProjectsStore } from '../stores/projectsStore'
import { useUserStore } from '../stores/userStore'
import CreateDialog from '../components/organization/CreateDialog.vue'
import OrganizationDetails from '../components/OrganizationDetails.vue'
import LocationDisplay from '../components/LocationDisplay.vue'
import type { Organization } from '../types'

const { locale } = useI18n()
const { formatTime } = useTimeFormatter()
const organizationsStore = useOrganizationsStore()
const projectsStore = useProjectsStore()
const userStore = useUserStore()
const router = useRouter()
const isRTL = computed(() => ['ar', 'he'].includes(locale.value))
const showDetails = ref(false)
const selectedOrg = ref<Organization | null>(null)
const showCreateDialog = ref(false)
const updatingIds = ref<string[]>([])

const canEdit = computed(() => {
  return userStore.isEvaconAdmin
})

const isUpdating = (id: string) => updatingIds.value.includes(id)

const handleDetailsClose = (value: boolean) => {
  if (!value) {
    // Wait for transition to complete before clearing selected org
    setTimeout(() => {
      selectedOrg.value = null
    }, 300)
  }
}

const toggleOrgStatus = async (org: Organization) => {
  if (!canEdit.value) return
  
  updatingIds.value.push(org.id)
  try {
    const newStatus = org.account_status === 'active' ? 'inactive' : 'active'
    await organizationsStore.updateOrganization(org.id, {
      ...org,
      account_status: newStatus
    })
    await organizationsStore.fetchOrganizations()
  } catch (error) {
    console.error('Failed to update status:', error)
  } finally {
    updatingIds.value = updatingIds.value.filter(id => id !== org.id)
  }
}

// Load organizations when component mounts
onMounted(async () => {
  try {
    await projectsStore.fetchProjects()
    await organizationsStore.fetchOrganizations()
  } catch (error) {
    console.error('Failed to fetch organizations:', error)
  }
})

const showOrganization = (org: Organization) => {
  if (!org) return
  selectedOrg.value = { ...org } // Create a copy to prevent mutation
  showDetails.value = true
}

const onOrganizationUpdated = async () => {
  await organizationsStore.fetchOrganizations()
  // Find and update the selected organization with fresh data
  const updatedOrg = organizationsStore.organizations.find(org => org.id === selectedOrg.value?.id)
  if (updatedOrg) {
    selectedOrg.value = { ...updatedOrg }
  }
}

const onOrganizationCreated = async (id: string) => {
  await organizationsStore.fetchOrganizations()
  const newOrg = organizationsStore.organizations.find(org => org.id === id)
  if (newOrg) {
    selectedOrg.value = { ...newOrg }
    showDetails.value = true
  }
}

// Ensure organizations is always an array
const organizations = computed(() => {
  return Array.isArray(organizationsStore.organizations) ? organizationsStore.organizations : []
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

.q-card {
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.q-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.body--dark .q-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.status-btn {
  text-transform: uppercase !important;
  font-size: 14px;
  min-width: 100px;
  font-weight: 500;
  letter-spacing: 0.5px;
  border-radius: 12px;
  padding: 4px 12px;
}

.project-count-btn {
  text-transform: none !important;
  font-size: 14px;
  min-width: 100px;
  font-weight: 500;
  letter-spacing: 0.5px;
  border-radius: 12px;
  padding: 4px 12px;
}
</style>