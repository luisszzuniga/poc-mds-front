<script setup>
import { useActivityStore } from '../stores/activities'
import { useUserStore } from '../stores/users'

const activityStore = useActivityStore()
const userStore = useUserStore()

const handleReset = () => {
  activityStore.$reset()
  userStore.$reset()
  
  localStorage.clear()
  
  window.location.reload()
}
</script>

<template>
  <button 
    @click="handleReset" 
    class="flex items-center w-full px-4 py-3 text-gray-600 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
  >
    <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
    Réinitialiser les stores
  </button>
</template> 