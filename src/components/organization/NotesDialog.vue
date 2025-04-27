<template>
  <q-dialog v-model="dialogOpen" persistent>
    <q-card style="min-width: 500px">
      <q-card-section class="row items-center">
        <div class="text-h6">Edit Notes</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-form @submit="onSubmit" class="q-gutter-md">
        <q-card-section>
          <q-input
            v-model="form.notes"
            type="textarea"
            label="Notes"
            outlined
            autogrow
            :rows="6"
            class="full-width"
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
  (e: 'submit', data: { notes: string }): void
}>()

const loading = ref(false)
const form = ref({
  notes: ''
})

const dialogOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

watch(() => props.modelValue, (newVal) => {
  if (newVal && props.organization) {
    form.value = {
      notes: props.organization.notes || ''
    }
  }
})

const onSubmit = async () => {
  loading.value = true
  try {
    emit('submit', { notes: form.value.notes })
    dialogOpen.value = false
  } finally {
    loading.value = false
  }
}
</script>