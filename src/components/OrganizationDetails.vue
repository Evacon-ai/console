<template>
  <q-dialog
    v-model="dialogOpen"
    position="right"
    :maximized="$q.screen.lt.lg"
    full-height
    :style="$q.screen.gt.md ? 'width: 1000px' : ''"
    transition-show="slide-left"
    transition-hide="slide-right"
  >
    <q-card class="full-height" style="min-width: 1000px">
      <!-- Header -->
      <div class="org-header q-px-lg q-py-md">
        <div class="row items-center full-width">
          <q-avatar size="96px" class="q-mr-md cursor-pointer" @click="showLogoEdit = true">
            <template v-if="organization?.logo_url">
              <img :src="organization.logo_url" alt="Organization logo">
            </template>
            <template v-else>
              <div class="default-logo">
                <Building2 class="w-16 h-16 text-grey-6" />
              </div>
            </template>
          </q-avatar>
          <div class="column">
            <div class="text-h5 cursor-pointer" @click="showNameEdit = true">{{ organization?.name }}</div>
            <div class="text-subtitle1 text-grey-7">
              <q-btn
                :color="organization?.account_status === 'active' ? 'positive' : 'grey'"
                :label="organization?.account_status"
                class="q-mt-sm status-btn"
                size="sm"
                @click="toggleStatus"
                :loading="updating"
                :disable="!canEdit"
              >
                <q-tooltip v-if="!canEdit">
                  Only administrators can change organization status
                </q-tooltip>
              </q-btn>
            </div>
          </div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup class="q-ml-md" />
        </div>
      </div>

      <q-separator />

      <div class="column" style="min-height: 0;">
        <div class="row" >
          <!-- Left Menu -->
          <div class="col-auto row">
            <q-list class="q-pa-md">
              <q-item
                v-for="tab in tabs"
                :key="tab.value"
                clickable
                :active="activeTab === tab.value"
                @click="activeTab = tab.value"
                active-class="org-menu-item-active"
              >
                <q-item-section avatar>
                  <component :is="tab.icon" class="w-5 h-5 menu-icon" />
                </q-item-section>
                <q-item-section>{{ tab.label }}</q-item-section>
              </q-item>
            </q-list>
          </div>
  
  
          <!-- Content Area -->
          <div class="col q-pa-lg scroll">
            <!-- Details Tab -->
            <div v-if="activeTab === 'details'">
              <div class="row q-col-gutter-md">
                <div class="col-12">            
                  <div class="text-subtitle1 text-weight-medium q-mb-sm">Contact Information</div>
                  <q-list bordered separator>
                    <q-item>
                      <q-item-section avatar>
                        <MapPin class="w-5 h-5" />
                      </q-item-section>
                      <q-item-section class="text-body1 cursor-pointer" @click="showAddressEdit = true">
                        <div class="row justify-start">
                          <div class="col-auto">
                            {{ [
                              organization?.address?.street,
                              organization?.address?.city,
                              organization?.address?.state,
                              organization?.address?.postal_code
                            ].filter(Boolean).join(', ') }}
                          </div>
                          <div class="col q-ml-sm">
                            <img 
                              :src="`https://flagcdn.com/w20/${countryCode.toLowerCase()}.png`" 
                              :alt="organization?.address?.country"
                              style="height: 1em; width: auto; vertical-align: middle; border-radius: 2px;"
                            />
                          </div>
                          <div class="col-auto q-ml-sm">
                            <a 
                              :href="mapsUrl" 
                              target="_blank" 
                              class="maps-link"
                              style="text-decoration: none"
                            >
                              <ExternalLink class="w-4 h-4" />
                            </a>
                          </div>
                        </div>
                      </q-item-section>
                    </q-item>
  
                    <q-item>
                      <q-item-section avatar>
                        <User class="w-5 h-5" />
                      </q-item-section>
                      <q-item-section class="text-body1 cursor-pointer" @click="showContactEdit = true">
                        {{ organization?.contact.name }}
                      </q-item-section>
                    </q-item>
  
                    <q-item>
                      <q-item-section avatar>
                        <Mail class="w-5 h-5" />
                      </q-item-section>
                      <q-item-section class="text-body1 cursor-pointer" @click="showEmailEdit = true">
                        {{ organization?.contact.email }}
                      </q-item-section>
                    </q-item>
  
                    <q-item>
                      <q-item-section avatar>
                        <Phone class="w-5 h-5" />
                      </q-item-section>
                      <q-item-section class="text-body1 cursor-pointer" @click="showPhoneEdit = true">
                        {{ organization?.contact.phone || '' }}
                      </q-item-section>
                    </q-item>
  
                    <q-item>
                      <q-item-section avatar>
                        <Globe class="w-5 h-5" />
                      </q-item-section>
                      <q-item-section class="text-body1 cursor-pointer" @click="showWebsiteEdit = true">
                        <div class="row justify-start">
                          <div class="col">{{ organization?.website }}</div>
                          <div v-if="organization?.website" class="col-auto q-ml-sm">
                            <a 
                              :href="organization.website" 
                              target="_blank" 
                              class="maps-link"
                              style="text-decoration: none"
                            >
                              <ExternalLink class="w-4 h-4" />
                            </a>
                          </div>
                        </div>
                      </q-item-section>
                    </q-item>
  
                    <q-item>
                      <q-item-section avatar>
                        <Clock class="w-5 h-5" />
                      </q-item-section>
                      <q-item-section class="text-body1 cursor-pointer" @click="showTimezoneEdit = true">                        
                        {{ getTimezoneLabel(organization?.time_zone) }}
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>
              </div>
  
              <div class="text-subtitle1 text-weight-medium q-mt-lg q-mb-sm">Notes</div>
              <q-card flat bordered class="cursor-pointer" @click="showNotesEdit = true">
                <q-card-section>
                  {{ organization?.notes || '' }}
                </q-card-section>
              </q-card>
  
              <div class="text-caption text-grey-7 q-mt-lg">
                <div class="row items-center q-gutter-x-sm">
                  <span>{{ $t('users.addedBy', { name: getFullName(createdByUser), date: formatTime(organization?.created_at) }) }}</span>
                </div>
                <div v-if="organization?.updated_by" class="row items-center q-gutter-x-sm q-mt-sm">
                  <span>{{ $t('users.updatedBy', { name: getFullName(updatedByUser), date: formatTime(organization?.updated_at) }) }}</span>
                </div>
              </div>
            </div>
  
            <!-- Users Tab -->
            <div v-else-if="activeTab === 'users'" class="q-pa-none">
              <div class="text-subtitle1 text-weight-medium q-mb-sm">Organization Users</div>
              <q-card flat bordered>
                <q-card-section>
                  <div class="text-grey-7">User management coming soon...</div>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div>
      </div>
    </q-card>
  </q-dialog>

  <PhoneNumberDialog
    v-model="showPhoneEdit"
    :organization="organization"
    @submit="onPhoneSubmit"
  />

  <AddressDialog
    v-model="showAddressEdit"
    :organization="organization"
    @submit="onAddressSubmit"
  />

  <ContactDialog
    v-model="showContactEdit"
    :organization="organization"
    @submit="onContactSubmit"
  />

  <EmailDialog
    v-model="showEmailEdit"
    :organization="organization"
    @submit="onEmailSubmit"
  />

  <WebsiteDialog
    v-model="showWebsiteEdit"
    :organization="organization"
    @submit="onWebsiteSubmit"
  />

  <TimezoneDialog
    v-model="showTimezoneEdit"
    :organization="organization"
    @submit="onTimezoneSubmit"
  />

  <NotesDialog
    v-model="showNotesEdit"
    :organization="organization"
    @submit="onNotesSubmit"
  />

  <NameDialog
    v-model="showNameEdit"
    :organization="organization"
    @submit="onNameSubmit"
  />

  <LogoDialog
    v-model="showLogoEdit"
    :organization="organization"
    @submit="onLogoSubmit"
  />
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useOrganizationsStore } from '../stores/organizationsStore'
import { useUserStore } from '../stores/userStore'
import { Building2, Mail, Phone, Globe, Clock, MapPin, ExternalLink, User, Users, FileText } from 'lucide-vue-next'
import { useTimeFormatter } from '../utils/formatTime'
import type { Organization } from '../types'
import { countries } from '../utils/countries'
import { timezones } from '../utils/timezones'
import api from '../lib/axios'
import PhoneNumberDialog from './organization/PhoneNumberDialog.vue'
import AddressDialog from './organization/AddressDialog.vue'
import ContactDialog from './organization/ContactDialog.vue'
import EmailDialog from './organization/EmailDialog.vue'
import WebsiteDialog from './organization/WebsiteDialog.vue'
import TimezoneDialog from './organization/TimezoneDialog.vue'
import NotesDialog from './organization/NotesDialog.vue'
import NameDialog from './organization/NameDialog.vue'
import LogoDialog from './organization/LogoDialog.vue'

interface UserMetadata {
  first_name: string
  last_name: string
}

const props = defineProps<{
  modelValue: boolean
  organization: Organization | null
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'organization-updated'): void
}>()

const { formatTime } = useTimeFormatter()
const organizationsStore = useOrganizationsStore()
const userStore = useUserStore()
const showAddressEdit = ref(false)
const showContactEdit = ref(false)
const showEmailEdit = ref(false)
const showPhoneEdit = ref(false)
const showWebsiteEdit = ref(false)
const showTimezoneEdit = ref(false)
const showNotesEdit = ref(false)
const showNameEdit = ref(false)
const showLogoEdit = ref(false)
const updating = ref(false)
const activeTab = ref('details')
const createdByUser = ref<UserMetadata | null>(null)
const updatedByUser = ref<UserMetadata | null>(null)

const tabs = [
  { label: 'Details', value: 'details', icon: FileText },
  { label: 'Users', value: 'users', icon: Users }
]

// Watch for organization changes to fetch creator info
watch(() => props.organization, async (newOrg) => {
  if (newOrg?.created_by) {
    createdByUser.value = null
    updatedByUser.value = null
    
    try {
      const response = await api.get(`/users/${newOrg.created_by}`)
      createdByUser.value = {
        first_name: response.first_name,
        last_name: response.last_name
      }
    } catch (error) {
      console.error('Failed to fetch creator info:', error)
      createdByUser.value = {
        first_name: '—',
        last_name: ''
      }
    }
    
    if (newOrg.updated_by) {
      try {
        const response = await api.get(`/users/${newOrg.updated_by}`)
        updatedByUser.value = {
          first_name: response.first_name,
          last_name: response.last_name
        }
      } catch (error) {
        console.error('Failed to fetch updater info:', error)
        updatedByUser.value = {
          first_name: '—',
          last_name: ''
        }
      }
    }
  }
}, { immediate: true })

const getFullName = (user: UserMetadata | null) => {
  if (!user) return '—'
  return `${user.first_name} ${user.last_name}`.trim() || '—'
}

const onPhoneSubmit = async (contact: { phone: string }) => {
  if (!props.organization) return
  
  updating.value = true
  try {
    const updatedOrg = {
      ...props.organization,
      contact: {
        ...props.organization.contact,
        phone: contact.phone
      }
    }
    await organizationsStore.updateOrganization(props.organization.id, updatedOrg)
    showPhoneEdit.value = false
    await organizationsStore.fetchOrganizations()
    emit('organization-updated')
  } catch (error) {
    console.error('Failed to update phone:', error)
  } finally {
    updating.value = false
  }
}

const onContactSubmit = async (contact: { name: string }) => {
  if (!props.organization) return
  
  updating.value = true
  try {
    const updatedOrg = {
      ...props.organization,
      contact: {
        ...props.organization.contact,
        name: contact.name
      }
    }
    await organizationsStore.updateOrganization(props.organization.id, updatedOrg)
    showContactEdit.value = false
    await organizationsStore.fetchOrganizations()
    emit('organization-updated')
  } catch (error) {
    console.error('Failed to update contact:', error)
  } finally {
    updating.value = false
  }
}

const onEmailSubmit = async (contact: { email: string }) => {
  if (!props.organization) return
  
  updating.value = true
  try {
    const updatedOrg = {
      ...props.organization,
      contact: {
        ...props.organization.contact,
        email: contact.email
      }
    }
    await organizationsStore.updateOrganization(props.organization.id, updatedOrg)
    showEmailEdit.value = false
    await organizationsStore.fetchOrganizations()
    emit('organization-updated')
  } catch (error) {
    console.error('Failed to update email:', error)
  } finally {
    updating.value = false
  }
}

const onAddressSubmit = async (address: Organization['address']) => {
  if (!props.organization) return
  
  updating.value = true
  try {
    const updatedOrg = {
      ...props.organization,
      address
    }
    await organizationsStore.updateOrganization(props.organization.id, updatedOrg)
    showAddressEdit.value = false
    await organizationsStore.fetchOrganizations()
    emit('organization-updated')
  } catch (error) {
    console.error('Failed to update address:', error)
  } finally {
    updating.value = false
  }
}

const onWebsiteSubmit = async (website: { website: string }) => {
  if (!props.organization) return
  
  updating.value = true
  try {
    const updatedOrg = {
      ...props.organization,
      website: website.website
    }
    await organizationsStore.updateOrganization(props.organization.id, updatedOrg)
    showWebsiteEdit.value = false
    await organizationsStore.fetchOrganizations()
    emit('organization-updated')
  } catch (error) {
    console.error('Failed to update website:', error)
  } finally {
    updating.value = false
  }
}

const onTimezoneSubmit = async (data: { time_zone: string }) => {
  if (!props.organization) return
  
  updating.value = true
  try {
    const updatedOrg = {
      ...props.organization,
      time_zone: data.time_zone
    }
    await organizationsStore.updateOrganization(props.organization.id, updatedOrg)
    showTimezoneEdit.value = false
    await organizationsStore.fetchOrganizations()
    emit('organization-updated')
  } catch (error) {
    console.error('Failed to update timezone:', error)
  } finally {
    updating.value = false
  }
}

const onNotesSubmit = async (data: { notes: string }) => {
  if (!props.organization) return
  
  updating.value = true
  try {
    const updatedOrg = {
      ...props.organization,
      notes: data.notes
    }
    await organizationsStore.updateOrganization(props.organization.id, updatedOrg)
    showNotesEdit.value = false
    await organizationsStore.fetchOrganizations()
    emit('organization-updated')
  } catch (error) {
    console.error('Failed to update notes:', error)
  } finally {
    updating.value = false
  }
}

const onNameSubmit = async (data: { name: string }) => {
  if (!props.organization) return
  
  updating.value = true
  try {
    const updatedOrg = {
      ...props.organization,
      name: data.name
    }
    await organizationsStore.updateOrganization(props.organization.id, updatedOrg)
    showNameEdit.value = false
    await organizationsStore.fetchOrganizations()
    emit('organization-updated')
  } catch (error) {
    console.error('Failed to update name:', error)
  } finally {
    updating.value = false
  }
}

const onLogoSubmit = async (data: { logo_url: string }) => {
  if (!props.organization) return
  
  updating.value = true
  try {
    const updatedOrg = {
      ...props.organization,
      logo_url: data.logo_url
    }
    await organizationsStore.updateOrganization(props.organization.id, updatedOrg)
    showLogoEdit.value = false
    await organizationsStore.fetchOrganizations()
    emit('organization-updated')
  } catch (error) {
    console.error('Failed to update logo:', error)
  } finally {
    updating.value = false
  }
}

const canEdit = computed(() => {
  return userStore.isEvaconAdmin
})

const toggleStatus = async () => {
  if (!props.organization || !canEdit.value) return
  
  updating.value = true
  try {
    const newStatus = props.organization.account_status === 'active' ? 'inactive' : 'active'
    const updatedOrg = {
      ...props.organization,
      account_status: newStatus
    }
    await organizationsStore.updateOrganization(props.organization.id, updatedOrg)
    await organizationsStore.fetchOrganizations()
    emit('organization-updated')
  } catch (error) {
    console.error('Failed to update status:', error)
  } finally {
    updating.value = false
  }
}

const dialogOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const mapsUrl = computed(() => {
  if (!props.organization?.address) return '#'
  const address = [
    props.organization.address.street,
    props.organization.address.city,
    props.organization.address.state_province,
    props.organization.address.postal_code,
    props.organization.address.country
  ].filter(Boolean).join(', ')
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
})

// Map country name to ISO 3166-1 alpha-2 code
const countryCode = computed(() => {
  const country = countries.find(c => c.value === props.organization?.address?.country)
  return country?.code || 'US'
})

const getTimezoneLabel = (timezone?: string) => {
  if (!timezone) return '—'
  const tz = timezones.find(t => t.value === timezone)
  return tz ? tz.label : timezone
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

.website-link,
.maps-link {
  color: var(--q-primary);
  opacity: 0.85;
  transition: opacity 0.2s ease;
}

.website-link:hover,
.maps-link:hover {
  opacity: 1;
}

.body--dark .website-link,
.body--dark .maps-link {
  color: var(--q-secondary);
  opacity: 1;
  text-shadow: 0 0 1px rgba(38, 166, 154, 0.2);
}

.body--dark .website-link:hover,
.body--dark .maps-link:hover {
  opacity: 1;
  text-shadow: 0 0 2px rgba(38, 166, 154, 0.3);
}

.cursor-pointer {
  cursor: pointer;
}

.cursor-pointer:hover {
  background: rgba(0, 0, 0, 0.05);
}

.body--dark .cursor-pointer:hover {
  background: rgba(255, 255, 255, 0.07);
}

.org-menu {
  width: 200px;
  padding: 0;
}

.org-menu-item-active {
  color: var(--q-secondary) !important;
  background: rgba(38, 166, 154, 0.1) !important;
  font-weight: 500;
}

.org-menu-item-active .menu-icon {
  color: var(--q-secondary);
}

.q-item {
  border-radius: 8px;
  margin: 4px 8px;
  padding: 12px 16px;
  min-height: 48px;
  transition: all 0.2s ease;
}

.q-item:hover {
  background: rgba(0, 0, 0, 0.05);
}

.body--dark .org-menu-item-active {
  background: rgba(38, 166, 154, 0.15) !important;
}

.body--dark .q-item:hover {
  background: rgba(255, 255, 255, 0.07);
}

.status-btn {
  text-transform: uppercase !important;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.5px;
  border-radius: 12px;
  padding: 4px 12px;
}

.org-header {
  background: linear-gradient(to right, rgba(0, 0, 0, 0.03), transparent);
  min-height: 72px;
  width: 100%;
}

.body--dark .org-header {
  background: linear-gradient(to right, rgba(255, 255, 255, 0.05), transparent);
}

.org-menu-container {
  width: 100%;
  background: rgba(0, 0, 0,0.02);
}

.body--dark .org-menu-container {
  background: rgba(255, 255, 255, 0.03);
}
</style>