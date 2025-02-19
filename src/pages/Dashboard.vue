<template>
  <q-page padding>
    <div class="text-h4 q-mb-lg">{{ $t('dashboard.title') }}</div>

    <div class="row q-col-gutter-md q-mb-lg">
      <div class="col-12 col-md-4" v-for="stat in stats" :key="stat.label">
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
        <q-item v-for="activity in activities" :key="activity.id">
          <q-item-section avatar>
            <q-avatar :color="activity.color" text-color="white">
              <Activity class="w-5 h-5" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ activity.title }}</q-item-label>
            <q-item-label caption>{{ $t('dashboard.activity.timeAgo', { time: activity.time }) }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { Activity, Users, FolderGit2 } from 'lucide-vue-next'

const stats = [
  { label: 'dashboard.stats.activeProjects', value: '12', icon: FolderGit2, color: 'primary' },
  { label: 'dashboard.stats.teamMembers', value: '24', icon: Users, color: 'green' },
  { label: 'dashboard.stats.recentActivity', value: '67', icon: Activity, color: 'purple' }
]

const activities = [
  { id: 1, title: 'Project Alpha updated', time: '2 hours', color: 'primary' },
  { id: 2, title: 'New team member added', time: '4 hours', color: 'green' },
  { id: 3, title: 'Project Beta milestone reached', time: '1 day', color: 'orange' }
]
</script>