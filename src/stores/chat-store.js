import { defineStore } from 'pinia'
import { api } from "boot/axios";
import { LocalStorage } from 'quasar'

const grabUserFromLocalStorage = () => LocalStorage.getItem('user')

export const useChatStore = defineStore('chat', {
  state: () => ({
    createForm: {
      content: '',
      name: grabUserFromLocalStorage().firstname,
      user_id: grabUserFromLocalStorage().id,
      image: null,
    },
    messages: '',
    isLoading: false,
    authenticatedUser: grabUserFromLocalStorage()
  }),
  getters: {
  },
  actions: {
    async createMessage(){
      await api.post('/chatmessages', this.createForm).then(res => {
        let itemToPush = res.data.data
        itemToPush.sender = true
        this.messages.push(itemToPush)
        this.createForm.content = ''
      }).catch(err => {
        console.log('err :>> ', err);
      })
    },
    async getMessages(){
      this.messages = []
      this.isLoading = true
      await api.get('/chatmessages').then(res => {
        console.log('res :>> ', res);
        res.data.data.forEach(item => {
          let itemToPush = item
          if(grabUserFromLocalStorage().id == item.user_id){
            itemToPush.sender = true
          }else{
            itemToPush.sender = false
          }
          this.messages.push(itemToPush)
        })
        this.isLoading = false
      }).catch(err => {
        console.log('err :>> ', err);
        this.isLoading = false
      })
    },
    async clearCreateForm(){
      this.createForm = {
        content: '',
        sender: true,
        name: '',
        user_id: null,
        image: null,
      }
    }
  }
})
