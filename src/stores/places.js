import { defineStore } from 'pinia'
import { useActivityStore } from './activities'

export const usePlacesStore = defineStore('places', {
  state: () => ({
    availablePlaces: {}
  }),

  actions: {
    initializePlaces() {
      const activityStore = useActivityStore()
      activityStore.activities.forEach(activity => {
        this.availablePlaces[activity.id] = activity.maxPlaces
      })
    },

    updateAvailablePlaces(activityId, count) {
      if (this.availablePlaces[activityId] !== undefined) {
        this.availablePlaces[activityId] = Math.max(0, this.availablePlaces[activityId] - count)
      }
    },

    restoreAvailablePlaces(activityId, count) {
      if (this.availablePlaces[activityId] !== undefined) {
        this.availablePlaces[activityId] += count
      }
    },

    getAvailablePlaces(activityId) {
      return this.availablePlaces[activityId] || 0
    }
  }
}) 