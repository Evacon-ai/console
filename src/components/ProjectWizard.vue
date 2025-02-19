<template>
  <q-dialog v-model="dialogOpen" persistent maximized>
    <q-card class="column">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">{{ $t('projects.createNew') }}</div>
        <q-space />
        <q-btn icon="close" flat round dense @click="closeDialog" />
      </q-card-section>

      <q-card-section class="col q-pa-lg">
        <q-stepper v-model="step" vertical color="primary" animated>
          <q-step :name="1" :title="$t('projects.wizard.projectName')" icon="edit" :done="step > 1">
            <q-input 
              v-model="projectName" 
              :label="$t('projects.wizard.nameYourProject')" 
              :placeholder="$t('projects.wizard.projectNamePlaceholder')" 
              outlined 
            />
            <div class="row q-mt-md">
              <q-btn :label="$t('common.continue')" color="primary" @click="step++" />
            </div>
          </q-step>

          <q-step :name="2" :title="$t('projects.projectDescription')" icon="description" :done="step > 2">
            <q-input 
              v-model="projectDescription" 
              type="textarea"
              :label="$t('projects.description')" 
              outlined 
              autogrow
            />
            <div class="row q-mt-md items-center">
              <q-btn :label="$t('common.back')" color="primary" flat @click="step--" />
              <q-btn :label="$t('common.continue')" color="primary" class="q-ml-sm" @click="step++" />
            </div>
          </q-step>

          <q-step :name="3" :title="$t('projects.wizard.fdsTitle')" icon="upload_file" :done="step > 3">
            <q-uploader
              :label="$t('projects.wizard.fdsUpload')"
              accept=".csv,.xls,.xlsx"
              :factory="uploadFile"
              flat
              bordered
            />
            <div class="row q-mt-md items-center">
              <q-btn :label="$t('common.back')" color="primary" flat @click="step--" />
              <q-btn :label="$t('common.continue')" color="primary" class="q-ml-sm" @click="step++" />
            </div>
          </q-step>

          <q-step :name="4" :title="$t('projects.wizard.setPointTitle')" icon="list" :done="step > 4">
            <q-uploader
              :label="$t('projects.wizard.setPointUpload')"
              accept=".csv,.xls,.xlsx"
              :factory="uploadFile"
              flat
              bordered
            />
            <div class="row q-mt-md items-center">
              <q-btn :label="$t('common.back')" color="primary" flat @click="step--" />
              <q-btn :label="$t('common.continue')" color="primary" class="q-ml-sm" @click="step++" />
            </div>
          </q-step>

          <q-step :name="5" :title="$t('projects.wizard.designTitle')" icon="architecture" :done="step > 5">
            <q-uploader
              :label="$t('projects.wizard.designUpload')"
              accept=".pdf,.png,.jpg"
              :factory="uploadFile"
              flat
              bordered
            />
            <div class="row q-mt-md items-center">
              <q-btn :label="$t('common.back')" color="primary" flat @click="step--" />
              <q-btn :label="$t('common.continue')" color="primary" class="q-ml-sm" @click="step++" />
            </div>
          </q-step>

          <q-step :name="6" :title="$t('projects.wizard.ioTitle')" icon="data_object">
            <q-uploader
              :label="$t('projects.wizard.ioUpload')"
              accept=".csv,.xls,.xlsx"
              :factory="uploadFile"
              flat
              bordered
            />
            <div class="row q-mt-md items-center">
              <q-btn :label="$t('common.back')" color="primary" flat @click="step--" />
              <q-btn :label="$t('common.finish')" color="primary" class="q-ml-sm" @click="onFinish" />
            </div>
          </q-step>
        </q-stepper>
      </q-card-section>
    </q-card>
  </q-dialog>

  <!-- Processing Dialog -->
  <q-dialog v-model="processing" persistent>
    <q-card style="min-width: 300px">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">{{ $t('projects.wizard.processingTitle') }}</div>
      </q-card-section>

      <q-card-section class="column items-center q-py-lg">
        <q-circular-progress
          indeterminate
          size="50px"
          color="primary"
          class="q-mb-md"
        />
        <div>{{ $t('common.pleaseWait') }}</div>
      </q-card-section>
    </q-card>
  </q-dialog>

  <!-- Success Dialog -->
  <q-dialog v-model="success">
    <q-card style="min-width: 300px">
      <q-card-section class="row items-center">
        <div class="text-h6">{{ $t('common.success') }}</div>
      </q-card-section>

      <q-card-actions align="center">
        <q-btn color="primary" :label="$t('projects.wizard.uploadToTIA')" @click="uploadToTIA" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits(['update:modelValue'])

const { locale } = useI18n()
const isRTL = computed(() => ['ar', 'he'].includes(locale.value))

const dialogOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const step = ref(1)
const projectName = ref('')
const projectDescription = ref('')
const processing = ref(false)
const success = ref(false)

const uploadFile = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000)
  })
}

const closeDialog = () => {
  dialogOpen.value = false
  step.value = 1
  projectName.value = ''
  projectDescription.value = ''
}

const onFinish = () => {
  processing.value = true
  setTimeout(() => {
    processing.value = false
    success.value = true
  }, 2000)
}

const uploadToTIA = () => {
  success.value = false
  closeDialog()
}

watch(() => props.modelValue, (newValue) => {
  if (!newValue) {
    step.value = 1
    projectName.value = ''
    projectDescription.value = ''
  }
})
</script>