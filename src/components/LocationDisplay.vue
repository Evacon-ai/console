<template>
  <div class="row items-center">
    <img 
      v-if="country"
      :src="`https://flagcdn.com/w20/${getCountryCode(country).toLowerCase()}.png`"
      :alt="country"
      style="height: 12px; width: auto; margin-right: 8px; border-radius: 1px;"
    />
    {{ formattedLocation }}
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { countries } from '../utils/countries'

const props = defineProps<{
  city?: string
  state?: string
  country?: string
  fallback?: string
}>()

const getCountryCode = (countryName: string) => {
  if (!countryName) return 'US'
  const country = countries.find(c => c.value === countryName)
  return country?.code || 'US'
}

const formattedLocation = computed(() => {
  const parts = [
    props.city,
    props.state,
    props.country ? countries.find(c => c.value === props.country)?.label : undefined
  ].filter(Boolean)
  
  return parts.length > 0 ? parts.join(', ') : (props.fallback || '—')
})
</script>