<template>
  <q-dialog v-model="dialogOpen" persistent>
    <q-card style="min-width: 400px">
      <q-card-section class="row items-center">
        <div class="text-h6">{{ $t('organizations.details.timezone.edit') }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-form @submit="onSubmit" class="q-gutter-md">
        <q-card-section>
          <q-select
            v-model="form.timezone"
            :options="timezoneOptions"
            :label="$t('organizations.details.timezone.label')"
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            outlined
            emit-value
            map-options
            :rules="[val => !!val || $t('organizations.details.timezone.required')]"
            @filter="filterTimezones"
          >
            <template v-slot:option="{ opt, selected, toggleOption }">
              <q-item clickable @click="toggleOption(opt)">
                <q-item-section>
                  <div class="text-body1">
                    {{ opt.label }}
                    <span class="text-caption text-grey-7">({{ opt.abbr }})</span>
                  </div>
                </q-item-section>
              </q-item>
            </template>
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  No results found
                </q-item-section>
              </q-item>
            </template>
          </q-select>
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
import type { Organization } from '../../types'
import { timezones } from '../../utils/timezones'

const props = defineProps<{
  modelValue: boolean
  organization: Organization | null
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'submit', data: { time_zone: string }): void
}>()

const loading = ref(false)
const form = ref({
  timezone: ''
})

const timezoneOptions = ref(timezones.map(tz => ({
  label: tz.label,
  value: tz.value,
  abbr: tz.abbr
})))

const dialogOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const filterTimezones = (val: string, update: (fn: () => void) => void) => {
  if (val === '') {
    update(() => {
      timezoneOptions.value = timezones.map(tz => ({
        label: tz.label,
        value: tz.value,
        abbr: tz.abbr
      }))
    })
    return
  }

  update(() => {
    const needle = val.toLowerCase()
    timezoneOptions.value = timezones
      .filter(tz => 
        tz.label.toLowerCase().includes(needle) ||
        tz.value.toLowerCase().includes(needle) ||
        tz.abbr.toLowerCase().includes(needle)
      )
      .map(tz => ({
        label: tz.label,
        value: tz.value,
        abbr: tz.abbr
      }))
  })
}

watch(() => props.modelValue, (newVal) => {
  if (newVal && props.organization) {
    form.value = {
      timezone: props.organization.time_zone || 'Europe/London'
    }
  }
})

const onSubmit = async () => {
  loading.value = true
  try {
    emit('submit', { time_zone: form.value.timezone })
    dialogOpen.value = false
  } finally {
    loading.value = false
  }
}
</script>