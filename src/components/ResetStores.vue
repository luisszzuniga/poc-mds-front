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
    class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
  >
    Réinitialiser les stores
  </button>
</template> 