<template>
  <router-view />
</template>

<script setup>
import { onMounted, watch } from 'vue'

import { useQuasar } from 'quasar'
const $q = useQuasar()

import { useAuthStore } from "stores/auth-store";
const authStore = useAuthStore()

onMounted(() => {
  authStore.reAuthenticate()
})

watch(() => $q.appVisible, val => {
  authStore.reAuthenticate()
})
</script>
