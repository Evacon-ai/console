<template>
  <div 
    class="row items-center justify-center no-wrap ltr logo-container" 
    :class="{ 'org-logo': isCustomerUser && organizationLogo, 'cursor-pointer': isCustomerAdmin }" 
    @click="onClick"
  >
    <div class="logo-wrapper">
      <!-- Organization Logo -->
      <template v-if="!imageError && isCustomerUser && organizationLogo">
        <img 
          :src="organizationLogo" 
          :alt="organizationName" 
          class="logo-image" 
          @error="handleImageError"
        />
        <div class="org-name" v-if="showText">{{ organizationName }}</div>
      </template>
      <!-- Evacon Logo -->
      <template v-else-if="!imageError && !isCustomerUser">
        <img 
          src="/evacon.ai.png" 
          alt="Evacon.ai" 
          class="logo-image" 
          :style="{ height: `${size}px` }" 
          @error="handleImageError"
        />
      </template>
      <!-- Fallback Icon -->
      <template v-else>
        <div class="fallback-logo" :style="{ height: `${size}px` }">
          <Cpu class="logo-icon" :style="{ width: `${size}px`, height: `${size}px` }" />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Cpu } from 'lucide-vue-next'
import { useUserStore } from '../../stores/userStore'
import { useOrganizationsStore } from '../../stores/organizationsStore'

const userStore = useUserStore()
const organizationsStore = useOrganizationsStore()

const isCustomerUser = computed(() => userStore.currentUser?.level === 'customer')
const isCustomerAdmin = computed(() => isCustomerUser.value && userStore.currentUser?.role === 'admin')

const organizationLogo = computed(() => {
  if (!isCustomerUser.value || !userStore.currentUser?.organization_id) return null
  const org = organizationsStore.organizations.find(
    org => org.id === userStore.currentUser?.organization_id
  )
  return org?.logo_url || null
})

const organizationName = computed(() => {
  if (!isCustomerUser.value || !userStore.currentUser?.organization_id) return 'Organization Logo'
  const org = organizationsStore.organizations.find(
    org => org.id === userStore.currentUser?.organization_id
  )
  return org?.name || 'Organization Logo'
})

defineProps({
  showText: {
    type: Boolean,
    default: true
  },
  textClass: {
    type: String,
    default: ''
  },
  clickable: {
    type: Boolean,
    default: false
  },
  size: {
    type: Number,
    default: 32
  }
})

const emit = defineEmits(['click'])
const imageError = ref(false)

const onClick = () => {
  if (isCustomerAdmin.value && userStore.currentUser?.organization_id) {
    const org = organizationsStore.organizations.find(
      org => org.id === userStore.currentUser?.organization_id
    )
    if (org) {
      emit('click', org)
    }
  }
}

const handleImageError = () => {
  imageError.value = true
}
</script>

<style scoped>
.logo-container {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 15px 0 8px;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.logo-container.cursor-pointer:hover {
  background: rgba(0, 0, 0, 0.05);
}

.body--dark .logo-container.cursor-pointer:hover {
  background: rgba(255, 255, 255, 0.05);
}

.logo-wrapper {
  display: inline-flex;
  color: var(--q-primary);
  align-items: center;
  gap: 12px;
}

.org-logo {
  .logo-image {
    height: 80px;
    width: auto;
    border-radius: 4px;
  }

  .org-name {
    font-size: 1.25rem;
    font-weight: 500;
    line-height: 1.1;
    color: var(--q-primary);
  }

  .body--dark & {
    .org-name {
      color: white;
    }
  }
}

.fallback-logo {
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-icon {
  color: var(--q-secondary);
}

.ltr {
  direction: ltr !important;
}

/* Make logo responsive */
@media (max-width: 400px) {
  .logo-image, .fallback-logo {
    height: 32px !important;
  }
  
  .logo-icon {
    width: 24px !important;
    height: 24px !important;
  }

  .org-name {
    font-size: 1rem !important;
  }
}
</style>