<template>
  <q-dialog
    v-model="dialogOpen"
    position="right"
    :maximized="$q.screen.lt.lg"
    full-height
    :style="$q.screen.gt.md ? 'width: 1200px' : ''"
    transition-show="slide-left"
    transition-hide="slide-right"
    @hide="onDialogHide"
  >
    <q-card v-if="organization" class="full-height" style="width: 100%; min-width: 1100px;">
      <!-- Header -->
      <div class="org-header q-px-lg q-py-md">
        <div class="row items-center full-width">
          <q-avatar size="96px" class="q-mr-md cursor-pointer" @click="showLogoEdit = true">
            <template v-if="organization.logo_url">
              <img :src="organization.logo_url" alt="Organization logo">
            </template>
            <template v-else>
              <div class="default-logo">
                <Building2 class="w-16 h-16 text-grey-6" />
              </div>
            </template>
          </q-avatar>
          <div class="column">
            <div class="text-h5 cursor-pointer" @click="showNameEdit = true">{{ organization.name }}</div>
            <div class="text-subtitle1 text-grey-7">
              <q-btn
                :color="organization.account_status === 'active' ? 'positive' : 'grey'"
                :label="$t(`organizations.status.${organization.account_status}`)"
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
        <div class="row no-wrap" style="width: 100%; height: calc(100vh - 140px);">
          <!-- Left Menu -->
          <div class="col-auto" style="width: 250px; height: 100%;">
            <q-scroll-area class="fit">
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
                  <q-item-section>{{ $t(`organizations.${tab.value}.title`) }}</q-item-section>
                </q-item>
              </q-list>
            </q-scroll-area>
          </div>
  
          <!-- Content Area -->
          <div class="col row full-width" style="height: 100%;">
            <q-scroll-area class="col full-width">
              <div class="q-pa-lg">
                <!-- Details Tab -->
                <DetailsPanel
                  v-if="activeTab === 'details'"
                  :organization="organization"
                  :created-by-user="createdByUser"
                  :updated-by-user="updatedByUser"
                  @edit-address="showAddressEdit = true"
                  @edit-contact="showContactEdit = true"
                  @edit-email="showEmailEdit = true"
                  @edit-phone="showPhoneEdit = true"
                  @edit-timezone="showTimezoneEdit = true"
                  @edit-website="showWebsiteEdit = true"
                  @edit-notes="showNotesEdit = true"
                />
  
                <!-- Users Tab -->
                <UsersPanel v-else-if="activeTab === 'users'" :organizationId="organization.id"/>

                <!-- Billing Tab -->
                <BillingPanel v-else-if="activeTab === 'billing'" :organizationId="organization.id" />

                <!-- Integrations Tab -->
                <IntegrationsPanel
                  v-else-if="activeTab === 'integrations'"
                  :organizationId="organization.id"
                  @configure-tia="showTiaKeyDialog = true"
                  @configure-eplan="showEplanKeyDialog = true"
                />
              </div>
            </q-scroll-area>
          </div>
        </div>
      </div>
    </q-card>
  </q-dialog>

  <PhoneNumberDialog
    v-if="organization"
    v-model="showPhoneEdit"
    :organization="organization"
    @submit="onPhoneSubmit"
  />

  <AddressDialog
    v-if="organization"
    v-model="showAddressEdit"
    :organization="organization"
    @submit="onAddressSubmit"
  />

  <ContactDialog
    v-if="organization"
    v-model="showContactEdit"
    :organization="organization"
    @submit="onContactSubmit"
  />

  <EmailDialog
    v-if="organization"
    v-model="showEmailEdit"
    :organization="organization"
    @submit="onEmailSubmit"
  />

  <WebsiteDialog
    v-if="organization"
    v-model="showWebsiteEdit"
    :organization="organization"
    @submit="onWebsiteSubmit"
  />

  <TimezoneDialog
    v-if="organization"
    v-model="showTimezoneEdit"
    :organization="organization"
    @submit="onTimezoneSubmit"
  />

  <NotesDialog
    v-if="organization"
    v-model="showNotesEdit"
    :organization="organization"
    @submit="onNotesSubmit"
  />

  <NameDialog
    v-if="organization"
    v-model="showNameEdit"
    :organization="organization"
    @submit="onNameSubmit"
  />

  <LogoDialog
    v-if="organization"
    v-model="showLogoEdit"
    :organization="organization"
    @submit="onLogoSubmit"
  />

  <ApiKeyDialog
    v-model="showTiaKeyDialog"
    title="TIA Portal Integration"
    label="TIA Portal API Key"
    description="Enter your TIA Portal API key to enable automated PLC programming and configuration."
    @submit="onTiaKeySubmit"
  />

  <ApiKeyDialog
    v-model="showEplanKeyDialog"
    title="EPLAN Integration"
    label="EPLAN API Key"
    description="Enter your EPLAN API key to enable electrical engineering integration."
    @submit="onEplanKeySubmit"
  />
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useOrganizationsStore } from '../stores/organizationsStore'
import { useUserStore } from '../stores/userStore'
import { Building2, Users, FileText, CreditCard, Plug } from 'lucide-vue-next'
import { useTimeFormatter } from '../utils/formatTime'
import { useQuasar } from 'quasar'
import type { Organization } from '../types'
import PhoneNumberDialog from './organization/PhoneNumberDialog.vue'
import AddressDialog from './organization/AddressDialog.vue'
import ContactDialog from './organization/ContactDialog.vue'
import EmailDialog from './organization/EmailDialog.vue'
import WebsiteDialog from './organization/WebsiteDialog.vue'
import TimezoneDialog from './organization/TimezoneDialog.vue'
import NotesDialog from './organization/NotesDialog.vue'
import NameDialog from './organization/NameDialog.vue'
import LogoDialog from './organization/LogoDialog.vue'
import ApiKeyDialog from './organization/ApiKeyDialog.vue'
import DetailsPanel from './organization/panels/DetailsPanel.vue'
import UsersPanel from './organization/panels/UsersPanel.vue'
import BillingPanel from './organization/panels/BillingPanel.vue'
import IntegrationsPanel from './organization/panels/IntegrationsPanel.vue'

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

const $q = useQuasar()
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
const showTiaKeyDialog = ref(false)
const showEplanKeyDialog = ref(false)
const updating = ref(false)
const activeTab = ref('details')
const createdByUser = ref<UserMetadata | null>(null)
const updatedByUser = ref<UserMetadata | null>(null)

const tabs = [
  { value: 'details', icon: FileText },
  { value: 'users', icon: Users },
  { value: 'billing', icon: CreditCard },
  { value: 'integrations', icon: Plug }
]

// Watch for organization changes to fetch creator info
watch(() => props.organization, async (newOrg) => {
  if (newOrg?.created_by) {
    createdByUser.value = null
    updatedByUser.value = null
    
    try {
      createdByUser.value = await userStore.fetchUserMetadata(newOrg.created_by)
      
      if (newOrg.updated_by) {
        updatedByUser.value = await userStore.fetchUserMetadata(newOrg.updated_by)
      }
    } catch (error) {
      console.error('Failed to fetch user metadata:', error)
    }
  }
}, { immediate: true })

const onDialogHide = () => {
  // Reset all dialog states
  showAddressEdit.value = false
  showContactEdit.value = false
  showEmailEdit.value = false
  showPhoneEdit.value = false
  showWebsiteEdit.value = false
  showTimezoneEdit.value = false
  showNotesEdit.value = false
  showNameEdit.value = false
  showLogoEdit.value = false
  showTiaKeyDialog.value = false
  showEplanKeyDialog.value = false
  activeTab.value = 'details'
}

const getFullName = (user: UserMetadata | null) => {
  if (!user) return '—'
  return `${user.first_name} ${user.last_name}`.trim() || '—'
}

const formatPhoneNumber = (number: string, defaultCountry = 'US') => {
  const phoneNumber = parsePhoneNumberFromString(number, defaultCountry)
  if (phoneNumber && phoneNumber.isValid()) {
    return phoneNumber.formatInternational()
  }
  return number
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

const onTiaKeySubmit = async (data: { apiKey: string }) => {
  // TODO: Implement TIA Portal API key storage
  console.log('TIA Portal API Key:', data.apiKey)
}

const onEplanKeySubmit = async (data: { apiKey: string }) => {
  // TODO: Implement EPLAN API key storage
  console.log('EPLAN API Key:', data.apiKey)
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