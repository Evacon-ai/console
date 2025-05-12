<template>
  <q-dialog v-model="dialogOpen" persistent>
    <q-card style="min-width: 600px">
      <q-card-section class="row items-center">
        <div class="text-h6">{{ $t('projects.createNew') }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-form @submit="onSubmit" class="q-gutter-md">
        <q-card-section>
          <!-- Organization Selection -->
          <q-select
            v-model="form.organization_id"
            :options="organizationOptions"
            :label="$t('organizations.organization')"
            outlined
            emit-value
            map-options
            :rules="[val => !!val || $t('organizations.nameRequired')]"
          />

          <!-- Project Name -->
          <q-input
            v-model="form.name"
            :label="$t('projects.name.name')"
            class="q-mt-md"
            outlined
            :rules="[val => !!val || $t('projects.name.nameRequired')]"
          />

          <!-- Project Description -->
          <q-input
            v-model="form.description"
            type="textarea"
            :label="$t('projects.description.description')"
            class="q-mt-md"
            outlined
            autogrow
            :rules="[val => !!val || $t('projects.description.required')]"
          />

          <!-- Location -->
          <div class="row q-col-gutter-md q-mt-md">
            <div class="col-12 col-sm-6">
              <q-input
                v-model="form.location.city"
                :label="$t('projects.location.city')"
                outlined
                :rules="[val => !!val || $t('projects.location.cityRequired')]"
              />
            </div>
            <div v-if="showStateField" class="col-12 col-sm-6">
              <q-select
                v-model="form.location.state"
                :options="availableStates"
                :label="$t('projects.location.' + stateLabel)"
                outlined
                emit-value
                map-options
                :rules="[val => !!val || $t('projects.location.stateRequired')]"
              />
            </div>
          </div>

          <div class="row q-col-gutter-md q-mt-md">
            <div class="col-12 col-sm-6">
              <q-select
                v-model="form.location.country"
                :options="countryOptions"
                :label="$t('projects.location.country')"
                outlined
                emit-value
                map-options
                :rules="[val => !!val || $t('projects.location.countryRequired')]"
                @update:model-value="onCountryChange"
              />
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat :label="$t('common.cancel')" v-close-popup />
          <q-btn type="submit" color="primary" :label="$t('common.save')" :loading="loading" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { Building2 } from 'lucide-vue-next'
import { useRoute } from 'vue-router'
import { useOrganizationsStore } from '../../stores/organizationsStore'
import { useProjectsStore } from '../../stores/projectsStore'
import { useUserStore } from '../../stores/userStore'
import { countries } from '../../utils/countries'
import { getStatesByCountry } from '../../utils/states'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'project-created', id: string): void
}>()

const { locale } = useI18n()
const route = useRoute()
const organizationsStore = useOrganizationsStore()
const projectsStore = useProjectsStore()
const userStore = useUserStore()

const loading = ref(false)
const form = ref({
  organization_id: '',
  name: '',
  description: '',
  location: {
    city: '',
    state: '',
    country: ''
  }
})

// Get organization from route query if present
const selectedOrganization = computed(() => {
  const orgId = route.query.organization as string
  return orgId ? organizationsStore.organizations.find(org => org.id === orgId) : null
})

// Set initial organization if one is selected
watch(() => selectedOrganization.value, (org) => {
  if (org) {
    form.value.organization_id = org.id
  }
}, { immediate: true })

const dialogOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const organizationOptions = computed(() => {
  return organizationsStore.organizations.map(org => ({
    label: org.name,
    value: org.id
  }))
})

const getSelectedOrg = computed(() => {
  return organizationsStore.organizations.find(org => org.id === form.value.organization_id)
})

const availableStates = computed(() => {
  const country = countries.find(c => c.value === form.value.location.country)
  const states = country ? getStatesByCountry(country.code) : []
  return states.map(state => ({
    label: state.translations[locale.value] || state.label,
    value: state.value
  }))
})

const showStateField = computed(() => {
  const country = countries.find(c => c.value === form.value.location.country)
  if (!country) return false
  const states = getStatesByCountry(country.code)
  return states.length > 0
})

const stateLabel = computed(() => {
  const country = countries.find(c => c.value === form.value.location.country)?.code
  if (country === 'US') return 'state'
  if (country === 'CA') return 'province'
  if (country === 'AU') return 'stateTerritory'
  return 'stateProvince'
})

const countryOptions = computed(() => {
  return countries.map(country => ({
    label: country.translations[locale.value] || country.label,
    value: country.value
  }))
})

const onCountryChange = (newCountry: string) => {
  const country = countries.find(c => c.value === newCountry)
  if (!country) return
  
  if (!getStatesByCountry(country.code).some(state => state.value === form.value.location.state)) {
    form.value.location.state = ''
  }
}

const onSubmit = async () => {
  loading.value = true
  try {
    const newProject = await projectsStore.createProject({
      organization_id: form.value.organization_id,
      name: form.value.name,
      description: form.value.description,
      location: form.value.location,
      status: 'active'
    })
    
    dialogOpen.value = false
    emit('project-created', newProject.id)
  } catch (error) {
    console.error('Failed to create project:', error)
  } finally {
    loading.value = false
  }
}
</script>
