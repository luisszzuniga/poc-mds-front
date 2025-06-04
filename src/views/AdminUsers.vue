<script setup>
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '../stores/users'
import ConfirmationModal from '../components/ConfirmationModal.vue'
import AdminLayout from '../layouts/AdminLayout.vue'

const userStore = useUserStore()
const isModalOpen = ref(false)
const isDeleteModalOpen = ref(false)
const selectedUser = ref(null)
const isEditing = ref(false)

const users = computed(() => userStore.users)

const newUser = ref({
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  role: 'parent'
})

onMounted(() => {
  userStore.fetchUsers()
})

const openModal = (user = null) => {
  if (user) {
    selectedUser.value = { ...user }
    isEditing.value = true
  } else {
    selectedUser.value = { ...newUser.value }
    isEditing.value = false
  }
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  selectedUser.value = null
  isEditing.value = false
}

const handleSubmit = () => {
  if (isEditing.value) {
    userStore.updateUser(selectedUser.value.id, selectedUser.value)
  } else {
    userStore.addUser(selectedUser.value)
  }
  closeModal()
}

const openDeleteModal = (user) => {
  selectedUser.value = user
  isDeleteModalOpen.value = true
}

const handleDelete = () => {
  if (selectedUser.value) {
    userStore.deleteUser(selectedUser.value.id)
    isDeleteModalOpen.value = false
    selectedUser.value = null
  }
}
</script>

<template>
  <AdminLayout>
    <div class="container mx-auto">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Gestion des Utilisateurs</h1>
        <button
          @click="openModal()"
          class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Ajouter un utilisateur
        </button>
      </div>

      <!-- Liste des utilisateurs -->
      <div class="bg-white shadow-md rounded-lg overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rôle</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="user in users" :key="user.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ user.firstName }} {{ user.lastName }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ user.email }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="[
                    'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                    user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
                  ]"
                >
                  {{ user.role }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  @click="openModal(user)"
                  class="text-blue-600 hover:text-blue-900 mr-4"
                >
                  Modifier
                </button>
                <button
                  @click="openDeleteModal(user)"
                  class="text-red-600 hover:text-red-900"
                  :disabled="user.role === 'admin'"
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
        <div class="bg-white rounded-lg p-8 max-w-md w-full">
          <h2 class="text-2xl font-bold mb-6">{{ isEditing ? 'Modifier' : 'Ajouter' }} un utilisateur</h2>
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Prénom</label>
                <input
                  v-model="selectedUser.firstName"
                  type="text"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Nom</label>
                <input
                  v-model="selectedUser.lastName"
                  type="text"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Email</label>
              <input
                v-model="selectedUser.email"
                type="email"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div v-if="!isEditing">
              <label class="block text-sm font-medium text-gray-700">Mot de passe</label>
              <input
                v-model="selectedUser.password"
                type="password"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Rôle</label>
              <select
                v-model="selectedUser.role"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="parent">Parent</option>
                <option value="admin">Administrateur</option>
              </select>
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
        :message="`Êtes-vous sûr de vouloir supprimer l'utilisateur '${selectedUser?.firstName} ${selectedUser?.lastName}' ?`"
        confirm-text="Supprimer"
        @close="isDeleteModalOpen = false"
        @confirm="handleDelete"
      />
    </div>
  </AdminLayout>
</template> 