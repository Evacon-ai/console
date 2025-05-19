<template>
  <q-page padding>
    <div class="text-h4 q-mb-lg">{{ $t('dashboard.title') }}</div>

    <div class="row q-col-gutter-md q-mb-lg">
      <div class="col-12 col-md-4" v-for="stat in dashboardStats" :key="stat.label">
        <q-card flat bordered>
          <q-card-section>
            <div class="row items-center justify-between">
              <div>
                <div class="text-subtitle2 text-grey-7">{{ $t(stat.label) }}</div>
                <div class="text-h4 q-mt-sm">{{ stat.value }}</div>
              </div>
              <q-avatar :color="stat.color" text-color="white" size="56px">
                <component :is="stat.icon" class="w-6 h-6" />
              </q-avatar>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <q-card flat bordered>
      <q-card-section>
        <div class="text-h6">{{ $t('dashboard.activity.title') }}</div>
      </q-card-section>

      <q-list separator>
        <q-item v-for="activity in activities" :key="activity.id" class="activity-item">
          <q-item-section avatar>
            <q-avatar :color="activity.color" text-color="white">
              <Activity class="w-5 h-5" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>
              {{ activity.title }}
              <q-tooltip anchor="top middle" self="bottom middle" class="bg-dark text-white">
                <div class="text-body2 q-pa-xs">
                  <div v-if="activity.details">
                    <div v-if="activity.details.changes">
                      <div v-for="(change, field) in activity.details.changes" :key="field" class="q-mb-xs">
                        <strong>{{ field }}:</strong> 
                        <span class="text-negative">{{ change.from }}</span> → 
                        <span class="text-positive">{{ change.to }}</span>
                      </div>
                    </div>
                    <div v-else>
                      {{ formatActivityDetails(activity.details) }}
                    </div>
                  </div>
                  <div class="text-caption q-mt-sm text-grey-5">
                    {{ activity.fullTime }}
                  </div>
                </div>
              </q-tooltip>
            </q-item-label>
            <q-item-label caption>{{ $t('dashboard.activity.timeAgo', { time: activity.time }) }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Activity, Users, FolderGit2, Building2 } from 'lucide-vue-next'
import { useOrganizationsStore } from '../stores/organizationsStore'
import { useProjectsStore } from '../stores/projectsStore'
import { useUsersStore } from '../stores/usersStore' 
import { useLogsStore } from '../stores/logsStore'
import { useTimeFormatter } from '../utils/formatTime' 
import { DateTime } from 'luxon'

const organizationsStore = useOrganizationsStore()
const projectsStore = useProjectsStore()
const usersStore = useUsersStore()
const logsStore = useLogsStore()
const { formatTime } = useTimeFormatter()

// Load data when component mounts
onMounted(async () => {
  await Promise.all([
    organizationsStore.fetchOrganizations(),
    projectsStore.fetchProjects(),
    usersStore.fetchUsers(),
    logsStore.fetchLogs(5)
  ])
})

const dashboardStats = computed(() => [
  { 
    label: 'dashboard.stats.activeOrganizations', 
    value: organizationsStore.organizations.filter(org => org.account_status === 'active').length.toString(), 
    icon: Building2, 
    color: 'primary' 
  },
  { 
    label: 'dashboard.stats.openProjects', 
    value: projectsStore.projects.filter(project => project.status === 'active').length.toString(), 
    icon: FolderGit2, 
    color: 'green' 
  },
  { 
    label: 'dashboard.stats.registeredUsers', 
    value: usersStore.users.length.toString(), 
    icon: Users, 
    color: 'purple' 
  }
])

const activities = computed(() => {
  return logsStore.sortedLogs.slice(0, 10).map(log => {
    // Determine color based on action type
    let color = 'primary'
    switch (log.action) {
      case 'create':
        color = 'green'
        break
      case 'update':
        color = 'blue'
        break
      case 'delete':
        color = 'red'
        break
      case 'login':
        color = 'purple'
        break
      case 'logout':
        color = 'grey'
        break
    }
    
    // Format the title based on action and entity type
    const userName = logsStore.getLogUserName(log)
    const action = logsStore.formatLogAction(log)
    const entityName = log.details?.name || log.entity_id

    // Format the full timestamp for the tooltip
    let fullTime = ''
    if (typeof log.created_at === 'object' && log.created_at?._seconds) {
      fullTime = DateTime.fromSeconds(log.created_at._seconds).toLocaleString(DateTime.DATETIME_FULL)
    } else if (typeof log.created_at === 'string') {
      fullTime = DateTime.fromISO(log.created_at).toLocaleString(DateTime.DATETIME_FULL)
    }
    
    return {
      id: log.id,
      title: `${userName} ${action} ${entityName}`,
      time: formatTime(log.created_at),
      color,
      details: log.details,
      fullTime
    }
  })
})

// Helper function to format activity details for the tooltip
function formatActivityDetails(details: any): string {
  if (!details) return ''
  
  if (typeof details === 'object') {
    // Filter out the 'name' property as it's already shown in the title
    const filteredDetails = { ...details }
    delete filteredDetails.name
    
    // Convert the object to a readable string
    return Object.entries(filteredDetails)
      .filter(([key, value]) => key !== 'changes' && value !== undefined)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n')
  }
  
  return String(details)
}
</script>

<style scoped>
  .activity-item {
    cursor: pointer;
  }
</style>