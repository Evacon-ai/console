<template>
  <div class="row q-col-gutter-md">
    <div class="col-12">            
      <div class="text-subtitle1 text-weight-medium q-mb-sm">{{ $t('organizations.details.title') }}</div>
      <q-list bordered separator>
        <q-item>
          <q-item-section avatar>
            <MapPin class="w-5 h-5" />
          </q-item-section>
          <q-item-section class="text-body1 cursor-pointer" @click="$emit('edit-address')" :title="$t('organizations.details.address.edit')">
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
                  style="height: 0.8em; width: auto; vertical-align: middle; border-radius: 1px; margin-bottom: 3px;"
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
          <q-item-section class="text-body1 cursor-pointer" @click="$emit('edit-contact')" :title="$t('organizations.details.contact.edit')">
            {{ organization?.contact.name }}
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section avatar>
            <Mail class="w-5 h-5" />
          </q-item-section>
          <q-item-section class="text-body1 cursor-pointer" @click="$emit('edit-email')" :title="$t('organizations.details.contact.editEmail')">
            {{ organization?.contact.email }}
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section avatar>
            <Phone class="w-5 h-5" />
          </q-item-section>
          <q-item-section class="text-body1 cursor-pointer" @click="$emit('edit-phone')" :title="$t('organizations.details.contact.updatePhone')">
            {{ organization?.contact.phone ? formatPhoneNumber(organization.contact.phone, countryCode) : 'Add phone number' }}
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section avatar>
            <Clock class="w-5 h-5" />
          </q-item-section>
          <q-item-section class="text-body1 cursor-pointer" @click="$emit('edit-timezone')" :title="$t('organizations.details.timezone.edit')">                        
            {{ getTimezoneLabel(organization?.time_zone) }}
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section avatar>
            <Globe class="w-5 h-5" />
          </q-item-section>
          <q-item-section class="text-body1 cursor-pointer" @click="$emit('edit-website')" :title="$t('organizations.details.website.edit')">
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
      </q-list>
    </div>
  </div>

  <div class="text-subtitle1 text-weight-medium q-mt-lg q-mb-sm">{{ $t('organizations.notes.title') }}</div>
  <q-card flat bordered class="cursor-pointer" @click="$emit('edit-notes')" :title="$t('organizations.details.notes.edit')">
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
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { MapPin, User, Mail, Phone, Clock, Globe, ExternalLink } from 'lucide-vue-next'
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import { useTimeFormatter } from '../../../utils/formatTime'
import { countries } from '../../../utils/countries'
import { timezones } from '../../../utils/timezones'
import type { Organization } from '../../../types'

const props = defineProps<{
  organization: Organization | null
  createdByUser: { first_name: string; last_name: string } | null
  updatedByUser: { first_name: string; last_name: string } | null
}>()

const { formatTime } = useTimeFormatter()

const getFullName = (user: { first_name: string; last_name: string } | null) => {
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

const countryCode = computed(() => {
  const country = countries.find(c => c.value === props.organization?.address?.country)
  return country?.code || 'US'
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

const getTimezoneLabel = (timezone?: string) => {
  if (!timezone) return '—'
  const tz = timezones.find(t => t.value === timezone)
  return tz ? tz.label : timezone
}
</script>
<style scoped>
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
</style>