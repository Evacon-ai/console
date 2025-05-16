<template>
  <q-dialog v-model="dialogOpen" persistent>
    <q-card style="min-width: 400px; min-height: 380px;">
      <q-card-section class="row items-center">
        <div class="text-h6">{{ $t('organizations.details.contact.updatePhone') }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-form @submit="onSubmit" class="q-gutter-md full-height">
        <q-card-section class="q-pt-md" style="min-height: 240px;">
          <maz-phone-number-input
            v-model="form.phone"
            v-model:country="form.country"
            :success="form.isValid"
            :error="!!error"
            :error-message="error"
            color="primary"
            :class="darkClass"
            :preferred-countries="['US', 'CA', 'IL', 'GB', 'DE', 'FR', 'AU']"
            :translations="{
              countrySelector: {
                placeholder: $t('organizations.details.contact.countryCode'),
                error: $t('organizations.details.contact.chooseCountry'),
                searchPlaceholder: $t('organizations.details.contact.searchCountry'),
              },
              phoneInput: {
                placeholder: $t('organizations.details.contact.phoneNumber'),
                example: $t('organizations.details.contact.example'),
              },
            }"
            @update="onUpdate"
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat :label="$t('common.cancel')" v-close-popup />
          <q-btn color="primary" :label="$t('common.save')" type="submit" :loading="loading" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()
  
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

const darkClass = computed(() => $q.dark.isActive ? "dark" : "")
  
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'submit', value: { phone: string }): void
}>()

const loading = ref(false)
const form = ref({
  phone: '',
  country: 'US',
  isValid: false
})
const error = ref('')

const dialogOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

watch(() => props.modelValue, (newVal) => {
  if (newVal && props.organization) {
    const phone = props.organization?.contact?.phone || ''
    if (phone) {
      form.value.phone = phone
    }
  }
})

const onUpdate = (data: { isValid: boolean, number: string, countryCode: string }) => {
  form.value.isValid = data.isValid
  error.value = data.isValid ? '' : $t('organizations.details.contact.invalidPhone')
}

const onSubmit = async () => {
  if (!form.value.isValid) {
    error.value = $t('organizations.details.contact.invalidPhone')
    return
  }

  loading.value = true
  try {
    emit('submit', { phone: form.value.phone })
    dialogOpen.value = false
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
:deep(.maz-phone-number-input) {
  --maz-primary: var(--q-primary);
  --maz-border-radius: 4px;
  --maz-border-width: 1px;
  --maz-border-radius: 4px;
  --maz-border-width: 1px;
}

.body--dark :deep(.maz-phone-number-input) {
  --maz-bg-color: #1d1d1d;
  --maz-color: white;
  --maz-border-color: rgba(255, 255, 255, 0.12);
}

:deep(.maz-phone-number-input .maz-input) {
  height: 40px;
  margin-bottom: 0;
}

:deep(.maz-phone-number-input .maz-select) {
  max-height: none;
}
</style>