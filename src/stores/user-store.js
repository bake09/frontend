import { defineStore } from 'pinia'
import { api } from "boot/axios";

import { useArrayFindIndex } from '@vueuse/core'

export const useUserStore = defineStore('user', {
  state: () => ({
    loading: false,
    users: [],
    initialPagination: {
      sortBy: 'desc',
      descending: false,
      page: 1,
      rowsPerPage: 10,
    },
    createForm: {
      name: 'Testy',
      email: 'testy@test.com',
      password: 'password',
      password_confirmation: 'password',
    },
    createDialogIsShowing: false,
    editForm: {},
    editDialogIsShowing: false,
    editFormDisabledFields: ['id'],
    error: null,
    isProcessing: false,
    // columns: [
    //   { name: 'id', label: 'id', field: 'id', align: 'left' },
    //   { name: 'name', label: 'name', field: 'name', align: 'left' },
    //   { name: 'email', label: 'email', field: 'email', align: 'left' },
    //   { name: 'actions', label: 'Actions', field: '', align:'center' },
    // ]
  }),
  getters: {
    disableButtonIfAnyPropertyIsEmtpy(state){
      for (const key in state.createForm) {
        if (!state.createForm[key]) {
          return true; // Return true if any property is empty
        }
      }
      return false; // Return false if all properties are non-empty
    },
    getColumnsWithActions(state){
      // Prüfe, ob es Datensätze in "users" gibt
      if (state.users.length > 0) {
        // Extrahiere die Eigenschaften des ersten Datensatzes
        const firstUser = state.users[0];
        const userProperties = Object.keys(firstUser);
        // Erstelle die Spalten aus den Eigenschaften des ersten Datensatzes
        const columnsFromUsers = userProperties.map(property => {
          return {
            name: property,
            label: property,
            field: property,
            align: 'left'
          };
        });
        // Füge das manuell hinzugefügte Objekt für "actions" hinzu
        columnsFromUsers.push({ name: 'actions', label: 'Actions', field: '', align: 'right' });
        return columnsFromUsers;
      }
      // Wenn "users" leer ist, gib einfach die vorhandenen Spalten zurück
      return state.columns;
    },
  },
  actions: {
    async getAndSetFormFields(props){
      return this.editForm = props;
    },
    async createUser(){
      this.error = null
      this.isProcessing = true
      await api.post('/users', this.createForm).then(res => {
        this.isProcessing = false
        this.addToFrontend(this.users, res.data.data)
      }).catch(err => {
        this.error = err
        this.isProcessing = false
        throw err
      })
    },
    async getUsers(){
      this.loading = true
      this.users = []
      await api.get('/users').then(res => {
        // console.log('res :>> ', res);
        this.users = res.data.data
        this.loading = false
      }).catch(err => {
        this.error = err
        this.loading = false
      })
    },
    async updateUser(){
      this.error = null
      this.isProcessing = true
      await api.patch('/users/' + this.editForm.id, this.editForm).then(res => {
        this.isProcessing = false
        this.updateInFrontend(this.users, res.data.data)
      }).catch(err => {
        this.error = err
        this.isProcessing = false
        throw err
      })
    },
    async deleteUser(props){
      this.isProcessing = true
      let id = !props ? this.editForm.id : props.row.id
      await api.delete('/users/' + id).then(res => {
        this.clearEditForm()
        this.editDialogIsShowing = false
        this.isProcessing = false
        this.deleteFromFrontend(this.users, id)
      }).catch(err => {
        this.isProcessing = false
        throw err
      })
    },
    async getUser(){
      await api.get('/users/').then(res => {
        // console.log('res :>> ', res);
        this.users = res.data.data
        this.loading = false
      }).catch(err => {
        this.error = err
        this.loading = false
      })
    },
    clearEditForm(){
      this.editForm = {}
    },
    clearCreateForm(){
      this.createForm = {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      }
    },
    deleteFromFrontend(list, id){
      const result = useArrayFindIndex(list, item => {
        return item.id == id;
      })
      list.splice(result.value, 1)
    },
    addToFrontend(list, item){
      list.push(item)
    },
    updateInFrontend(list, updatedItem){
      const result = useArrayFindIndex(list, item => {
        return item.id == updatedItem.id;
      })
      this.users[result.value] = updatedItem
    }
  }
})
