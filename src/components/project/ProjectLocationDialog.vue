<template>
  <q-dialog v-model="dialogOpen" persistent>
    <q-card style="min-width: 500px">
      <q-card-section class="row items-center">
        <div class="text-h6">{{ $t('projects.location.edit') }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-form @submit="onSubmit" class="q-gutter-md">
        <q-card-section>
          <div class="row q-col-gutter-md q-mt-md">
            <div class="col-12 col-sm-6">
              <q-input
                v-model="form.city"
                :label="$t('projects.location.city')"
                outlined
                :rules="[val => !!val || $t('projects.location.cityRequired')]"
              />
            </div>
            <div v-if="showStateField" class="col-12 col-sm-6">
              <q-select
                v-model="form.state"
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
                v-model="form.country"
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
import { countries } from '../../utils/countries'
import { getStatesByCountry } from '../../utils/states'
import { useI18n } from 'vue-i18n'
import type { Project } from '../../types'

const props = defineProps<{
  modelValue: boolean
  project: Project | null
}>()

const { locale } = useI18n()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'submit', location: any): void
}>()

const loading = ref(false)
const form = ref({
  city: '',
  state: '',
  country: ''
})

const dialogOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const availableStates = computed(() => {
  const country = countries.find(c => c.value === form.value.country)
  const states = country ? getStatesByCountry(country.code) : []
  return states.map(state => ({
    label: state.translations[locale.value] || state.label,
    value: state.value
  }))
})

const showStateField = computed(() => {
  const country = countries.find(c => c.value === form.value.country)
  if (!country) return false
  const states = getStatesByCountry(country.code)
  return states.length > 0
})

const stateLabel = computed(() => {
  const country = countries.find(c => c.value === form.value.country)?.code
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

watch(() => props.modelValue, (newVal) => {
  if (newVal && props.project) {
    const { city, state, country } = props.project.location
    form.value = {
      city: city || '',
      state: state || '',
      country: country || ''
    }
  }
})

const onCountryChange = (newCountry: string) => {
  const country = countries.find(c => c.value === newCountry)
  if (!country) return
  
  if (!getStatesByCountry(country.code).some(state => state.value === form.value.state)) {
    form.value.state = ''
  }
}

const onSubmit = async () => {
  loading.value = true
  try {
    emit('submit', form.value)
    dialogOpen.value = false
  } finally {
    loading.value = false
  }
}
</script>