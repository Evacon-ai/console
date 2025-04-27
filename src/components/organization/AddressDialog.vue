<template>
  <q-dialog v-model="dialogOpen" persistent>
    <q-card style="min-width: 500px">
      <q-card-section class="row items-center">
        <div class="text-h6">Edit Address</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-form @submit="onSubmit" class="q-gutter-md">
        <q-card-section>
          <q-input
            v-model="form.street"
            label="Street Address"
            outlined
            :rules="[val => !!val || 'Street address is required']"
          />

          <div class="row q-col-gutter-md q-mt-md">
            <div class="col-12 col-sm-6">
              <q-input
                v-model="form.city"
                label="City"
                outlined
                :rules="[val => !!val || 'City is required']"
              />
            </div>
            <div v-if="showStateField" class="col-12 col-sm-6">
              <q-select
                v-model="form.state"
                :options="availableStates"
                :label="stateLabel"
                outlined
                emit-value
                map-options
                :rules="[val => !!val || `${stateLabel} is required`]"
              />
            </div>
          </div>

          <div class="row q-col-gutter-md q-mt-md">
            <div class="col-12 col-sm-6">
              <q-input
                v-model="form.postal_code"
                label="Postal Code"
                outlined
                :rules="[val => !!val || 'Postal code is required']"
              />
            </div>
            <div class="col-12 col-sm-6">
              <q-select
                v-model="form.country"
                :options="countryOptions"
                label="Country"
                outlined
                emit-value
                map-options
                :rules="[val => !!val || 'Country is required']"
                @update:model-value="onCountryChange"
              />
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn type="submit" color="primary" label="Save" :loading="loading" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { countries } from '../../utils/countries'
import { getStatesByCountry } from '../../utils/states'
import type { Organization } from '../../types'

const props = defineProps<{
  modelValue: boolean
  organization: Organization | null
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'submit', address: any): void
}>()

const loading = ref(false)
const form = ref({
  street: '',
  city: '',
  state: '',
  postal_code: '',
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
    label: state.label,
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
  if (country === 'US') return 'State'
  if (country === 'CA') return 'Province'
  if (country === 'AU') return 'State/Territory'
  return 'State/Province'
})

const countryOptions = countries

watch(() => props.modelValue, (newVal) => {
  if (newVal && props.organization) {
    const { street, city, state, postal_code, country } = props.organization.address
    form.value = {
      street: street || '',
      city: city || '',
      state: state || '',
      postal_code: postal_code || '',
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