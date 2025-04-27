<template>
  <q-dialog v-model="dialogOpen" persistent>
    <q-card style="min-width: 400px">
      <q-card-section class="row items-center">
        <div class="text-h6">Edit Contact Email</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-form @submit="onSubmit" class="q-gutter-md">
        <q-card-section>
          <q-input
            v-model="form.email"
            type="email"
            label="Contact Email"
            outlined
            :rules="[
              val => !!val || 'Email is required',
              val => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val) || 'Please enter a valid email address',
              val => val.length <= 254 || 'Email address is too long'
            ]"
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
  (e: 'submit', contact: { email: string }): void
}>()

const loading = ref(false)
const form = ref({
  email: ''
})

const dialogOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

watch(() => props.modelValue, (newVal) => {
  if (newVal && props.organization) {
    form.value = {
      email: props.organization.contact.email
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