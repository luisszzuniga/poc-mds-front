import { defineStore } from 'pinia'

const STORAGE_KEY = 'mds-activities-store'

export const useActivityStore = defineStore('activities', {
  state: () => {
    const savedState = localStorage.getItem(STORAGE_KEY)
    return savedState ? JSON.parse(savedState) : {
      activities: [
        {
          id: 1,
          name: 'Atelier Créatif',
          description: 'Venez découvrir l\'art du bricolage et de la création avec vos enfants ! Au programme : peinture, collage et création de petits objets.',
          maxPlaces: 15,
          location: 'Centre Culturel de Mauron',
          organizer: {
            name: 'Marie Dupont',
            photo: 'https://i.pravatar.cc/150?img=1'
          },
          date: '2024-04-15',
          time: '14:00',
          duration: '2h',
          ageRange: '6-12 ans'
        },
        {
          id: 2,
          name: 'Initiation au Théâtre',
          description: 'Une première approche du théâtre pour les enfants. Jeux d\'expression, improvisation et mise en scène de petites saynètes.',
          maxPlaces: 12,
          location: 'Salle des Fêtes',
          organizer: {
            name: 'Jean Martin',
            photo: 'https://i.pravatar.cc/150?img=2'
          },
          date: '2024-04-20',
          time: '15:30',
          duration: '1h30',
          ageRange: '8-14 ans'
        },
        {
          id: 3,
          name: 'Découverte de la Nature',
          description: 'Balade éducative dans le parc municipal pour découvrir la faune et la flore locale. Observation des oiseaux et des insectes.',
          maxPlaces: 20,
          location: 'Parc Municipal',
          organizer: {
            name: 'Sophie Bernard',
            photo: 'https://i.pravatar.cc/150?img=3'
          },
          date: '2024-04-25',
          time: '10:00',
          duration: '2h30',
          ageRange: '7-12 ans'
        },
        {
          id: 4,
          name: 'Atelier Créatif',
          description: 'Venez découvrir l\'art du bricolage et de la création avec vos enfants ! Au programme : peinture, collage et création de petits objets.',
          maxPlaces: 15,
          location: 'Centre Culturel de Mauron',
          organizer: {
            name: 'Marie Dupont',
            photo: 'https://i.pravatar.cc/150?img=1'
          },
          date: '2024-04-15',
          time: '14:00',
          duration: '2h',
          ageRange: '6-12 ans'
        },
        {
          id: 5,
          name: 'Initiation au Théâtre',
          description: 'Une première approche du théâtre pour les enfants. Jeux d\'expression, improvisation et mise en scène de petites saynètes.',
          maxPlaces: 12,
          location: 'Salle des Fêtes',
          organizer: {
            name: 'Jean Martin',
            photo: 'https://i.pravatar.cc/150?img=2'
          },
          date: '2024-04-20',
          time: '15:30',
          duration: '1h30',
          ageRange: '8-14 ans'
        },
        {
          id: 6,
          name: 'Découverte de la Nature',
          description: 'Balade éducative dans le parc municipal pour découvrir la faune et la flore locale. Observation des oiseaux et des insectes.',
          maxPlaces: 20,
          location: 'Parc Municipal',
          organizer: {
            name: 'Sophie Bernard',
            photo: 'https://i.pravatar.cc/150?img=3'
          },
          date: '2024-04-25',
          time: '10:00',
          duration: '2h30',
          ageRange: '7-12 ans'
        },
        {
          id: 7,
          name: 'Atelier Créatif',
          description: 'Venez découvrir l\'art du bricolage et de la création avec vos enfants ! Au programme : peinture, collage et création de petits objets.',
          maxPlaces: 15,
          location: 'Centre Culturel de Mauron',
          organizer: {
            name: 'Marie Dupont',
            photo: 'https://i.pravatar.cc/150?img=1'
          },
          date: '2024-04-15',
          time: '14:00',
          duration: '2h',
          ageRange: '6-12 ans'
        },
        {
          id: 8,
          name: 'Initiation au Théâtre',
          description: 'Une première approche du théâtre pour les enfants. Jeux d\'expression, improvisation et mise en scène de petites saynètes.',
          maxPlaces: 12,
          location: 'Salle des Fêtes',
          organizer: {
            name: 'Jean Martin',
            photo: 'https://i.pravatar.cc/150?img=2'
          },
          date: '2024-04-20',
          time: '15:30',
          duration: '1h30',
          ageRange: '8-14 ans'
        },
        {
          id: 9,
          name: 'Découverte de la Nature',
          description: 'Balade éducative dans le parc municipal pour découvrir la faune et la flore locale. Observation des oiseaux et des insectes.',
          maxPlaces: 20,
          location: 'Parc Municipal',
          organizer: {
            name: 'Sophie Bernard',
            photo: 'https://i.pravatar.cc/150?img=3'
          },
          date: '2024-04-25',
          time: '10:00',
          duration: '2h30',
          ageRange: '7-12 ans'
        },
        {
          id: 10,
          name: 'Atelier Créatif',
          description: 'Venez découvrir l\'art du bricolage et de la création avec vos enfants ! Au programme : peinture, collage et création de petits objets.',
          maxPlaces: 15,
          location: 'Centre Culturel de Mauron',
          organizer: {
            name: 'Marie Dupont',
            photo: 'https://i.pravatar.cc/150?img=1'
          },
          date: '2024-04-15',
          time: '14:00',
          duration: '2h',
          ageRange: '6-12 ans'
        },
        {
          id: 11,
          name: 'Initiation au Théâtre',
          description: 'Une première approche du théâtre pour les enfants. Jeux d\'expression, improvisation et mise en scène de petites saynètes.',
          maxPlaces: 12,
          location: 'Salle des Fêtes',
          organizer: {
            name: 'Jean Martin',
            photo: 'https://i.pravatar.cc/150?img=2'
          },
          date: '2024-04-20',
          time: '15:30',
          duration: '1h30',
          ageRange: '8-14 ans'
        },
        {
          id: 12,
          name: 'Découverte de la Nature',
          description: 'Balade éducative dans le parc municipal pour découvrir la faune et la flore locale. Observation des oiseaux et des insectes.',
          maxPlaces: 20,
          location: 'Parc Municipal',
          organizer: {
            name: 'Sophie Bernard',
            photo: 'https://i.pravatar.cc/150?img=3'
          },
          date: '2024-04-25',
          time: '10:00',
          duration: '2h30',
          ageRange: '7-12 ans'
        },
      ]
    }
  },
  
  getters: {
    getActivityById: (state) => (id) => {
      return state.activities.find(activity => activity.id === id)
    },
    upcomingActivities: (state) => {
      return state.activities.sort((a, b) => new Date(a.date) - new Date(b.date))
    }
  },

  actions: {
    addActivity(activity) {
      const newActivity = {
        id: this.activities.length + 1,
        ...activity
      }
      this.activities.push(newActivity)
      this.saveState()
      return newActivity
    },

    updateActivity(id, updatedActivity) {
      const index = this.activities.findIndex(a => a.id === id)
      if (index !== -1) {
        this.activities[index] = { ...this.activities[index], ...updatedActivity }
        this.saveState()
      }
    },

    deleteActivity(id) {
      this.activities = this.activities.filter(a => a.id !== id)
      this.saveState()
    },

    saveState() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        activities: this.activities
      }))
    }
  }
}) 