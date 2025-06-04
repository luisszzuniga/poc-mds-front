<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/users'

const router = useRouter()
const userStore = useUserStore()

const logout = () => {
  userStore.logout()
  router.push('/login')
}
</script>

<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <div class="w-64 bg-gray-800 text-white flex flex-col">
      <div class="flex items-center justify-center h-16 bg-gray-900">
        <h1 class="text-xl font-bold">Admin Panel</h1>
      </div>
      <nav class="flex-1 mt-5">
        <router-link
          to="/admin"
          class="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-white"
          active-class="bg-gray-700 text-white"
        >
          <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Activités
        </router-link>
        <router-link
          to="/admin/users"
          class="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-white"
          active-class="bg-gray-700 text-white"
        >
          <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          Utilisateurs
        </router-link>
      </nav>
      <div class="p-4">
        <button
          @click="logout"
          class="flex items-center w-full px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
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
      <nav class="bg-white shadow-sm">
        <div class="px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex">
              <div class="flex-shrink-0 flex items-center">
                <!-- <img class="h-8 w-auto" src="/logo.png" alt="Logo" /> -->
              </div>
            </div>
            <div class="flex items-center">
              <router-link
                to="/"
                class="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Retour au site
              </router-link>
            </div>
          </div>
        </div>
      </nav>

      <!-- Page content -->
      <main class="flex-1 p-8 overflow-auto">
        <slot></slot>
      </main>

      <!-- Footer -->
      <footer class="bg-white shadow-sm py-4">
        <div class="px-4 sm:px-6 lg:px-8">
          <p class="text-center text-gray-500 text-sm">
            © 2024 MDS. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  </div>
</template> 