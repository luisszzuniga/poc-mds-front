import { defineStore } from 'pinia'
import { useActivityStore } from './activities'

const STORAGE_KEY = 'mds-places-store'

export const usePlacesStore = defineStore('places', {
  state: () => {
    const savedState = localStorage.getItem(STORAGE_KEY)
    return savedState ? JSON.parse(savedState) : {
      availablePlaces: {}
    }
  },

  actions: {
    initializePlaces() {
      const activityStore = useActivityStore()
      activityStore.activities.forEach(activity => {
        if (this.availablePlaces[activity.id] === undefined) {
          this.availablePlaces[activity.id] = activity.maxPlaces
        }
      })
      this.saveState()
    },

    updateAvailablePlaces(activityId, count) {
      if (this.availablePlaces[activityId] !== undefined) {
        this.availablePlaces[activityId] = Math.max(0, this.availablePlaces[activityId] - count)
        this.saveState()
      }
    },

    restoreAvailablePlaces(activityId, count) {
      if (this.availablePlaces[activityId] !== undefined) {
        this.availablePlaces[activityId] += count
        this.saveState()
      }
    },

    getAvailablePlaces(activityId) {
      return this.availablePlaces[activityId] || 0
    },

    saveState() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        availablePlaces: this.availablePlaces
      }))
    }
  }
}) 