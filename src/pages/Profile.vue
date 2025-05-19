<template>
  <q-page padding>
    <div class="text-h4 q-mb-lg">{{ $t('profile.title') }}</div>

    <q-card flat bordered>
      <q-card-section class="q-pa-lg">
        <div class="row items-center">
          <q-avatar size="96px">
            <img :src="avatarUrl">
          </q-avatar>
          <div :class="isRTL ? 'q-mr-md' : 'q-ml-md'" class="col">
            <div class="text-h5 cursor-pointer" @click="showNameEdit = true">
              {{ userStore.currentUser?.first_name }} {{ userStore.currentUser?.last_name }}
              <q-icon name="edit" size="xs" class="q-ml-xs" />
            </div>
            <div class="text-subtitle1 text-grey-7">{{ userStore.currentUser?.email }}</div>
          </div>
          <q-space />
          <q-btn 
            color="negative" 
            :icon-right="isRTL ? 'logout' : undefined"
            :icon="!isRTL ? 'logout' : undefined"
            :label="$t('common.signOut')" 
            @click="handleSignOut"
          />
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section class="q-pa-lg">
        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-6">
            <div class="text-subtitle1 q-mb-md">{{ $t('profile.contactInfo') }}</div>
            <q-list>
              <q-item>
                <q-item-section avatar :class="{ 'items-end': isRTL }">
                  <Mail class="w-5 h-5 text-grey-7" />
                </q-item-section>
                <q-item-section>
                  <div 
                    class="cursor-pointer" 
                    @click="$q.notify({
                      message: $t('profile.contactSupportForEmail'),
                      color: 'info',
                      position: 'top',
                      timeout: 5000
                    })"
                  >
                    {{ userStore.currentUser?.email }}
                    <q-icon name="edit" size="xs" class="q-ml-xs" />
                  </div>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
          <div class="col-12 col-md-6">
            <div class="text-subtitle1 q-mb-md">{{ $t('profile.accountInfo') }}</div>
            <q-list>
              <q-item>
                <q-item-section avatar :class="{ 'items-end': isRTL }">
                  <Calendar class="w-5 h-5 text-grey-7" />
                </q-item-section>
                <q-item-section>
                  {{ $t('profile.joined', { date: formatDate(userStore.currentUser?.created_at) }) }}
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar :class="{ 'items-end': isRTL }">
                  <Shield class="w-5 h-5 text-grey-7" />
                </q-item-section>
                <q-item-section>{{ getRoleDisplay }}</q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
  
  <ProfileNameChangeDialog
    v-model="showNameEdit"
    @name-updated="onNameUpdated"
  />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { Mail, Calendar, Shield } from 'lucide-vue-next'
import { useUserStore } from '../stores/userStore'
import { useOrganizationsStore } from '../stores/organizationsStore'
import ProfileNameChangeDialog from '../components/profile/ProfileNameChangeDialog.vue'

const router = useRouter()
const { t, locale } = useI18n()
const userStore = useUserStore()
const organizationsStore = useOrganizationsStore()
const showNameEdit = ref(false)

const isRTL = computed(() => ['ar', 'he'].includes(locale.value))

const avatarUrl = computed(() => {
  const name = `${userStore.currentUser?.first_name || ''} ${userStore.currentUser?.last_name || ''}`.trim()
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=96&background=0D8ABC&color=fff`
})
const isCustomerUser = computed(() => userStore.currentUser?.level === 'customer')
const isCustomerAdmin = computed(() => isCustomerUser.value && userStore.currentUser?.role === 'admin')
  
const organizationName = computed(() => {
  if (!isCustomerUser.value || !userStore.currentUser?.organization_id) return null
  const org = organizationsStore.organizations.find(
    org => org.id === userStore.currentUser?.organization_id
  )
  return org?.name || null
})
  
const getRoleDisplay = computed(() => {
  if (userStore.currentUser?.level) {
    if (userStore.currentUser?.level==="evacon") {
      return t(`profile.roles.evacon_${userStore.currentUser?.role}`) || "unknown"
    } else if (userStore.currentUser?.level==="customer") {
      return `${organizationName.value} ${t(`profile.roles.${userStore.currentUser?.role}`)}` || "unknown"
    } else {
      return ''
    }
  } else {
    return ''
  }
})

const formatDate = (date?: { _seconds: number; _nanoseconds: number }) => {
  if (!date) return ''
  return new Date(date._seconds * 1000).toLocaleString(locale.value, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const onNameUpdated = () => {
  // Refresh avatar URL since it's based on the user's name
  avatarUrl.value = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    `${userStore.currentUser?.first_name || ''} ${userStore.currentUser?.last_name || ''}`.trim()
  )}&size=96&background=0D8ABC&color=fff`
}

const handleSignOut = async () => {
  await userStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
  transition: all 0.2s ease;
}

.cursor-pointer:hover {
  opacity: 0.8;
}
</style>