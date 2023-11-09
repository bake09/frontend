import { defineStore } from 'pinia'
import { api } from "boot/axios";
import { LocalStorage } from 'quasar'

const grabUserFromLocalStorage = () => LocalStorage.getItem('user') || LocalStorage.set('user', {});
const setLoggenInStateDueLocalStorage = () => {
  let userObject = LocalStorage.getItem('user')
  if(JSON.stringify(userObject) != '{}'){
    return true
  }
  return false
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: setLoggenInStateDueLocalStorage(),
    user: grabUserFromLocalStorage(),
    authLoading: false,
    userLoginForm: {
      email: 'test@test.com',
      password: 'password'
    },
    error: null,
    selectedImage: [],
    isProcessing: false,
  }),
  getters: {
    returnAuthLoadingText(state){
      return state.isLoggedIn ? 'Abmeldung...' : 'Anmeldung...'
    },
  },
  actions: {
    async setCsrfCookies(){
      await api.get('/csrf-cookie').then(res => {
        console.log("csrf-cookie set succesfully");
      }).catch(err => {
        console.log('err Csrf-Coookie :>> ', err);
      })
    },
    async login(){
      this.authLoading = true
      await this.setCsrfCookies()
      await api.post('/login', this.userLoginForm).then(async res => {
        console.log('res :>> ', res);
        await this.getUser()
        this.authLoading = false
        this.isLoggedIn = true
        this.router.push('/')
      }).catch(err => {
        this.error = err
        this.authLoading = false
        this.isLoggedIn = false
      })
    },
    async getUser(){
      await api.get('/user', this.userLoginForm).then(res => {
        // console.log('res.data.data :>> ', res.data.data);
        LocalStorage.set('user', res.data.data)
        this.user = res.data.data
      }).catch(err => {
        console.log('err :>> ', err);
      })

      // await api.get('/users/1').then(res => {
      //   console.log('res :>> ', res);
      // }).catch(err => {
      //   console.log('err :>> ', err);
      // })
    },
    reAuthenticate(){
      // if(!this.isLoggedIn || !this.user){
        this.getUser()
      // }
    },
    logout(){
      this.authLoading = true
      api.post('/logout').then(res => {
        console.log('res :>> ', res);
        LocalStorage.set('user', {})
        this.isLoggedIn = false
        this.user = {}
        this.authLoading = false
        this.router.push({path: '/login', replace: true})
      }).catch(err => {
        console.log('err :>> ', err);
      })
    },
    async addavatar(){
      this.isProcessing = true
      const formData = new FormData();
      formData.append("image", this.selectedImage);

      await api.post('/addavatar', formData).then(res => {
        console.log('res :>> ', res);
        this.user = res.data.user
        LocalStorage.set('user', res.data.user)
        this.isProcessing = false
      }).catch(err => {
        console.log('err :>> ', err);
        this.isProcessing = false
      })
    },
    async updateProfile(){

    }
  }
})
