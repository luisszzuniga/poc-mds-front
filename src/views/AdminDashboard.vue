<script setup>
import { ref, computed, onMounted } from 'vue'
import { useActivityStore } from '../stores/activities'
import ConfirmationModal from '../components/ConfirmationModal.vue'

const activityStore = useActivityStore()
const isModalOpen = ref(false)
const isDeleteModalOpen = ref(false)
const selectedActivity = ref(null)
const isEditing = ref(false)

const activities = computed(() => activityStore.activities)

const newActivity = ref({
  name: '',
  description: '',
  maxPlaces: 0,
  location: '',
  organizer: {
    name: '',
    photo: ''
  },
  date: '',
  time: '',
  duration: '',
  ageRange: ''
})

onMounted(() => {
  activities.value = activityStore.activities
})

const openModal = (activity = null) => {
  if (activity) {
    selectedActivity.value = { ...activity }
    isEditing.value = true
  } else {
    selectedActivity.value = { ...newActivity.value }
    isEditing.value = false
  }
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  selectedActivity.value = null
  isEditing.value = false
}

const handleSubmit = () => {
  if (isEditing.value) {
    activityStore.updateActivity(selectedActivity.value.id, selectedActivity.value)
  } else {
    activityStore.addActivity(selectedActivity.value)
  }
  closeModal()
}

const openDeleteModal = (activity) => {
  selectedActivity.value = activity
  isDeleteModalOpen.value = true
}

const handleDelete = () => {
  if (selectedActivity.value) {
    activityStore.deleteActivity(selectedActivity.value.id)
    isDeleteModalOpen.value = false
    selectedActivity.value = null
  }
}
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Gestion des Activités</h1>
      <button
        @click="openModal()"
        class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Ajouter une activité
      </button>
    </div>

    <!-- Liste des activités -->
    <div class="bg-white shadow-md rounded-lg overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lieu</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Places</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="activity in activities" :key="activity.id">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm font-medium text-gray-900">{{ activity.name }}</div>
              <div class="text-sm text-gray-500">{{ activity.description }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ activity.date }}</div>
              <div class="text-sm text-gray-500">{{ activity.time }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ activity.location }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ activity.maxPlaces }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button
                @click="openModal(activity)"
                class="text-blue-600 hover:text-blue-900 mr-4"
              >
                Modifier
              </button>
              <button
                @click="openDeleteModal(activity)"
                class="text-red-600 hover:text-red-900"
              >
                Supprimer
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal d'ajout/modification -->
    <div v-if="isModalOpen" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div class="bg-white rounded-lg p-8 max-w-2xl w-full">
        <h2 class="text-2xl font-bold mb-6">{{ isEditing ? 'Modifier' : 'Ajouter' }} une activité</h2>
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Nom</label>
            <input
              v-model="selectedActivity.name"
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              v-model="selectedActivity.description"
              rows="3"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            ></textarea>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Nombre de places</label>
              <input
                v-model.number="selectedActivity.maxPlaces"
                type="number"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Lieu</label>
              <input
                v-model="selectedActivity.location"
                type="text"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Date</label>
              <input
                v-model="selectedActivity.date"
                type="date"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Heure</label>
              <input
                v-model="selectedActivity.time"
                type="time"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Durée</label>
              <input
                v-model="selectedActivity.duration"
                type="text"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Tranche d'âge</label>
              <input
                v-model="selectedActivity.ageRange"
                type="text"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Nom de l'organisateur</label>
              <input
                v-model="selectedActivity.organizer.name"
                type="text"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Photo de l'organisateur (URL)</label>
              <input
                v-model="selectedActivity.organizer.photo"
                type="text"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          <div class="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              @click="closeModal"
              class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Annuler
            </button>
            <button
              type="submit"
              class="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {{ isEditing ? 'Modifier' : 'Ajouter' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal de confirmation de suppression -->
    <ConfirmationModal
      :is-open="isDeleteModalOpen"
      title="Confirmer la suppression"
      :message="`Êtes-vous sûr de vouloir supprimer l'activité '${selectedActivity?.name}' ?`"
      confirm-text="Supprimer"
      @close="isDeleteModalOpen = false"
      @confirm="handleDelete"
    />
  </div>
</template> 