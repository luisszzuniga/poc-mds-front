<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/users'
import ResetStores from '../components/ResetStores.vue'

const router = useRouter()
const userStore = useUserStore()

const logout = () => {
  userStore.logout()
  router.push('/login')
}
</script>

<template>
  <div class="flex h-screen bg-gray-50">
    <!-- Sidebar -->
    <div class="w-72 bg-white border-r border-gray-200 flex flex-col">
      <!-- Logo -->
      <div class="flex items-center justify-center h-16 border-b border-gray-200">
        <h1 class="text-xl font-bold text-gray-800">Admin Panel</h1>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 px-4 py-6 space-y-1">
        <router-link
          to="/admin"
          class="flex items-center px-4 py-3 text-gray-600 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
          active-class="bg-blue-50 text-blue-600"
        >
          <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Activités
        </router-link>
        <router-link
          to="/admin/users"
          class="flex items-center px-4 py-3 text-gray-600 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
          active-class="bg-blue-50 text-blue-600"
        >
          <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          Utilisateurs
        </router-link>
      </nav>

      <!-- Bottom Actions -->
      <div class="p-4 space-y-3 border-t border-gray-200">
        <ResetStores />
        <button
          @click="logout"
          class="flex items-center w-full px-4 py-3 text-gray-600 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Déconnexion
        </button>
      </div>
    </div>

    <!-- Main content area -->
    <div class="flex-1 flex flex-col">
      <!-- Navbar -->
      <nav class="bg-white border-b border-gray-200">
        <div class="px-6 py-4">
          <div class="flex justify-between items-center">
            <div class="flex items-center space-x-4">
              <h2 class="text-lg font-semibold text-gray-800">
                {{ $route.name === 'admin' ? 'Gestion des Activités' : 'Gestion des Utilisateurs' }}
              </h2>
            </div>
            <div class="flex items-center space-x-4">
              <router-link
                to="/"
                class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Retour au site
              </router-link>
            </div>
          </div>
        </div>
      </nav>

      <!-- Page content -->
      <main class="flex-1 p-6 overflow-auto bg-gray-50">
        <div class="max-w-7xl mx-auto">
          <slot></slot>
        </div>
      </main>

      <!-- Footer -->
      <footer class="bg-white border-t border-gray-200 py-4">
        <div class="max-w-7xl mx-auto px-6">
          <p class="text-center text-sm text-gray-500">
            © 2024 MDS. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  </div>
</template> 