<template>
  <q-scroll-area style="height: calc(100vh - 50px); width: 100%;" ref="scrollAreaRef">
    <q-page padding>
      <h4>Quiz Page</h4>
    </q-page>
  </q-scroll-area>
</template>

<script setup>
import { ref } from "vue";

import { useUserStore } from "stores/user-store";
const userStore = useUserStore()

</script>

<style scoped>
</style>
