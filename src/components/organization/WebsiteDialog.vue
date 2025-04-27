<template>
  <q-dialog v-model="dialogOpen" persistent>
    <q-card style="min-width: 400px">
      <q-card-section class="row items-center">
        <div class="text-h6">Edit Website URL</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-form @submit="onSubmit" class="q-gutter-md">
        <q-card-section>
          <q-input
            v-model="form.website"
            type="url"
            label="Website URL"
            outlined
            :rules="[
              val => !val || /^https?:\/\/[^\s/$.?#].[^\s]*$/.test(val) || 'Please enter a valid URL starting with http:// or https://'
            ]"
            hint="Leave empty if no website"
          />
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
import type { Organization } from '../../types'

const props = defineProps<{
  modelValue: boolean
  organization: Organization | null
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'submit', website: { website: string }): void
}>()

const loading = ref(false)
const form = ref({
  website: ''
})

const dialogOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

watch(() => props.modelValue, (newVal) => {
  if (newVal && props.organization) {
    form.value = {
      website: props.organization.website || ''
    }
  }
})

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