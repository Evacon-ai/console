<template>
  <q-page padding>
    <div class="row items-center justify-between q-mb-lg">
      <div class="text-h4">{{ $t('projects.title') }}</div>
      <q-btn color="primary" icon="add" :label="$t('common.newProject')" @click="showWizard = true" />
    </div>

    <div class="row q-col-gutter-md">
      <div class="col-12" v-for="project in projects" :key="project.id">
        <q-card flat bordered>
          <q-card-section>
            <div class="row items-start justify-between">
              <div class="row items-center">
                <q-avatar size="48px" color="primary" text-color="white" :class="isRTL ? 'q-ml-md' : 'q-mr-md'">
                  <FolderGit2 class="w-6 h-6" />
                </q-avatar>
                <div>
                  <div class="text-h6">{{ project.name }}</div>
                  <div class="text-grey-7">{{ project.description }}</div>
                </div>
              </div>
              <q-chip
                :color="getStatusColor(project.status)"
                text-color="white"
                size="sm"
              >
                {{ project.status }}
              </q-chip>
            </div>
          </q-card-section>

          <q-card-section>
            <div class="row items-center justify-between">
              <div class="row items-center">
                <Calendar class="w-4 h-4" :class="isRTL ? 'q-ml-xs' : 'q-mr-xs'" />
                {{ $t('projects.generated', { time: formatTime(project.generatedAt) }) }}
              </div>
              <div class="row items-center">
                <span class="text-grey-7 q-mr-sm"> {{ $t('common.download')}}:</span>
                <q-btn flat round size="sm" color="primary" icon="description">
                  <q-tooltip class="large-tooltip">{{ $t('projects.wizard.fdsTitle') }}</q-tooltip>
                </q-btn>
                <q-btn flat round size="sm" color="primary" icon="list">
                  <q-tooltip class="large-tooltip">{{ $t('projects.wizard.setPointTitle') }}</q-tooltip>
                </q-btn>
                <q-btn flat round size="sm" color="primary" icon="architecture">
                  <q-tooltip class="large-tooltip">{{ $t('projects.wizard.designTitle') }}</q-tooltip>
                </q-btn>
                <q-btn flat round size="sm" color="primary" icon="data_object">
                  <q-tooltip class="large-tooltip">{{ $t('projects.wizard.ioTitle') }}</q-tooltip>
                </q-btn>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <ProjectWizard v-model="showWizard" />
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { FolderGit2, Calendar } from 'lucide-vue-next'
import ProjectWizard from '../components/ProjectWizard.vue'
import { useTimeFormatter } from '../utils/formatTime'

const { locale } = useI18n()
const { formatTime } = useTimeFormatter()
const showWizard = ref(false)
const isRTL = computed(() => ['ar', 'he'].includes(locale.value))

const projects = [
  {
    id: 1,
    name: 'Tizen Water Works',
    description: 'Desalination plant in Tizen Abe',
    generatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    status: 'Completed'
  },
  {
    id: 2,
    name: 'Project Zhopa Nasrala',
    description: 'Gas rig off the coast of Israel',
    generatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    status: 'Error'
  },
  {
    id: 3,
    name: 'Ivanpah Reconfiguration', 
    description: 'Solar plant conversion to coal',
    generatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    status: 'Completed'
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Completed': return 'teal'
    case 'Error': return 'negative'
    default: return 'grey'
  }
}
</script>
<style>
.large-tooltip {
  font-size: 14px !important;
}
</style>