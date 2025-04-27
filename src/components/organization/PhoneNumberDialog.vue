<template>
  <q-dialog v-model="dialogOpen" persistent>
    <q-card style="min-width: 400px">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Update phone number</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-form @submit="onSubmit" class="q-gutter-md">
        <q-card-section class="q-pt-md">
          <q-input
            v-model="form.phone"
            type="tel"
            label="Phone number"
            :rules="[val => !!val || 'Phone number is required']"
            outlined
            dense
            class="full-width"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn color="primary" label="Save" type="submit" :loading="loading" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { formatPhoneNumber } from '../../utils/formatPhone'

const props = defineProps<{
  modelValue: boolean
  organization?: {
    contact?: {
      phone?: string
    }
    address?: {
      country?: string
    }
  }
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'submit', value: string): void
}>()

const loading = ref(false)
const form = ref({
  phone: ''
})

const dialogOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

watch(() => props.modelValue, (newVal) => {
  if (newVal && props.organization) {
    const phone = props.organization?.contact?.phone || ''
    if (phone) {
      form.value.phone = phone
      // The component will automatically detect and set the country
    }
  }
})

const onSubmit = async () => {
  loading.value = true
  try {
    // Format phone number before submitting
    const formattedPhone = formatPhoneNumber(form.value.phone)
    emit('submit', { phone: formattedPhone })
    dialogOpen.value = false
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
</style>