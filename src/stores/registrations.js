import { defineStore } from 'pinia'
import { useUserStore } from './users'

const STORAGE_KEY = 'mds-registrations-store'

export const useRegistrationStore = defineStore('registrations', {
  state: () => {
    const savedState = localStorage.getItem(STORAGE_KEY)
    return savedState ? JSON.parse(savedState) : {
      registrations: [],
      loading: false,
      error: null
    }
  },

  getters: {
    isRegistered: (state) => (activityId) => {
      return state.registrations.some(reg => reg.activityId === activityId)
    },
    getRegistration: (state) => (activityId) => {
      return state.registrations.find(reg => reg.activityId === activityId)
    },
    getChildrenCount: (state) => (activityId) => {
      const registration = state.registrations.find(reg => reg.activityId === activityId)
      return registration ? registration.childrenCount : 0
    }
  },

  actions: {
    async register(activityId, childrenCount) {
      const userStore = useUserStore()
      
      if (!userStore.isAuthenticated) {
        throw new Error('Vous devez être connecté pour vous inscrire')
      }

      if (!userStore.currentUser || !userStore.currentUser.id) {
        throw new Error('Informations utilisateur non disponibles')
      }

      this.loading = true
      this.error = null

      try {
        // Simuler un appel API
        await new Promise(resolve => setTimeout(resolve, 1000))

        // Vérifier si l'utilisateur est déjà inscrit
        if (this.isRegistered(activityId)) {
          throw new Error('Vous êtes déjà inscrit à cette activité')
        }

        const registration = {
          id: Date.now(), // Simuler un ID unique
          userId: userStore.currentUser.id,
          activityId,
          childrenCount,
          registeredAt: new Date().toISOString()
        }

        this.registrations.push(registration)
        this.saveState()
        return registration
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    async unregister(activityId) {
      const userStore = useUserStore()
      
      if (!userStore.isAuthenticated) {
        throw new Error('Vous devez être connecté pour vous désinscrire')
      }

      if (!userStore.currentUser || !userStore.currentUser.id) {
        throw new Error('Informations utilisateur non disponibles')
      }

      this.loading = true
      this.error = null

      try {
        // Simuler un appel API
        await new Promise(resolve => setTimeout(resolve, 1000))

        const registrationIndex = this.registrations.findIndex(
          reg => reg.activityId === activityId && reg.userId === userStore.currentUser.id
        )

        if (registrationIndex === -1) {
          throw new Error('Vous n\'êtes pas inscrit à cette activité')
        }

        this.registrations.splice(registrationIndex, 1)
        this.saveState()
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    saveState() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        registrations: this.registrations,
        loading: this.loading,
        error: this.error
      }))
    }
  }
}) 