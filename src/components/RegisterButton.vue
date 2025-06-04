<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useRegistrationStore } from '../stores/registrations'
import { usePlacesStore } from '../stores/places'
import { useUserStore } from '../stores/users'
import RegistrationModal from './RegistrationModal.vue'
import Toast from './Toast.vue'

const props = defineProps({
  activityId: {
    type: Number,
    required: true
  },
  maxPlaces: {
    type: Number,
    required: true
  }
})

const router = useRouter()
const registrationStore = useRegistrationStore()
const placesStore = usePlacesStore()
const userStore = useUserStore()

const isModalOpen = ref(false)
const isLoading = ref(false)
const showToast = ref(false)
const toastMessage = ref('')
const toastType = ref('success')

const isRegistered = computed(() => registrationStore.isRegistered(props.activityId))
const childrenCount = computed(() => registrationStore.getChildrenCount(props.activityId))
const availablePlaces = computed(() => placesStore.getAvailablePlaces(props.activityId))

onMounted(() => {
  placesStore.initializePlaces()
})

const handleClick = async () => {
  if (!userStore.isAuthenticated) {
    // Sauvegarder la route actuelle
    router.push({
      name: 'login',
      query: { redirect: router.currentRoute.value.fullPath }
    })
    return
  }

  if (isRegistered.value) {
    await handleUnregister()
  } else {
    isModalOpen.value = true
  }
}

const showSuccessToast = (message) => {
  toastMessage.value = message
  toastType.value = 'success'
  showToast.value = true
}

const showErrorToast = (message) => {
  toastMessage.value = message
  toastType.value = 'error'
  showToast.value = true
}

const handleRegister = async (count) => {
  isLoading.value = true
  try {
    if (count > availablePlaces.value) {
      throw new Error('Il n\'y a pas assez de places disponibles')
    }
    await registrationStore.register(props.activityId, count)
    placesStore.updateAvailablePlaces(props.activityId, count)
    isModalOpen.value = false
    showSuccessToast(`Inscription réussie pour ${count} enfant${count > 1 ? 's' : ''}`)
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error)
    showErrorToast(error.message || 'Erreur lors de l\'inscription')
  } finally {
    isLoading.value = false
  }
}

const handleUnregister = async () => {
  isLoading.value = true
  try {
    const count = childrenCount.value
    await registrationStore.unregister(props.activityId)
    placesStore.restoreAvailablePlaces(props.activityId, count)
    showSuccessToast('Désinscription réussie')
  } catch (error) {
    console.error('Erreur lors de la désinscription:', error)
    showErrorToast(error.message || 'Erreur lors de la désinscription')
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div>
    <button
      @click="handleClick"
      :disabled="isLoading"
      :class="[
        'inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition duration-300',
        isRegistered ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500' : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
      ]"
    >
      <svg
        v-if="isLoading"
        class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      <span v-if="isLoading">Chargement...</span>
      <span v-else-if="isRegistered">
        Se désinscrire
        <span v-if="childrenCount" class="ml-1 text-xs">({{ childrenCount }} enfant{{ childrenCount > 1 ? 's' : '' }})</span>
      </span>
      <span v-else>S'inscrire</span>
    </button>

    <RegistrationModal
      :is-open="isModalOpen"
      :max-places="maxPlaces"
      @close="isModalOpen = false"
      @confirm="handleRegister"
    />

    <Toast
      v-if="showToast"
      :message="toastMessage"
      :type="toastType"
      @close="showToast = false"
    />
  </div>
</template> 