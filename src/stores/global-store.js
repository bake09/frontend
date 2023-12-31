import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('global', {
  state: () => ({
    thumbStyle: {
      right: '4px',
      borderRadius: '5px',
      backgroundColor: '#027be3',
      width: '5px',
      opacity: 0.75
    },
    barStyle: {
      right: '2px',
      borderRadius: '9px',
      backgroundColor: '#027be3',
      width: '9px',
      opacity: 0.2
    }
  }),
  getters: {
  },
  actions: {
  }
})
