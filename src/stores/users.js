import { defineStore } from 'pinia'

const STORAGE_KEY = 'mds-users-store'

export const useUserStore = defineStore('users', {
  state: () => {
    const savedState = localStorage.getItem(STORAGE_KEY)
    return savedState ? JSON.parse(savedState) : {
      users: [
        {
          id: 1,
          email: 'test@test.com',
          password: 'test123', // En production, il faudrait hasher les mots de passe
          firstName: 'Test',
          lastName: 'User',
          role: 'parent'
        }
      ],
      currentUser: null
    }
  },

  getters: {
    isAuthenticated: (state) => !!state.currentUser,
    getUserByEmail: (state) => (email) => {
      return state.users.find(user => user.email === email)
    }
  },

  actions: {
    login(email, password) {
      const user = this.getUserByEmail(email)
      if (user && user.password === password) {
        this.currentUser = user
        this.saveState()
        return true
      }
      return false
    },

    logout() {
      this.currentUser = null
      this.saveState()
    },

    register(userData) {
      // Vérifier si l'email existe déjà
      if (this.getUserByEmail(userData.email)) {
        return false
      }

      const newUser = {
        id: this.users.length + 1,
        ...userData
      }

      this.users.push(newUser)
      this.saveState()
      return true
    },

    saveState() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        users: this.users,
        currentUser: this.currentUser
      }))
    }
  }
}) 