<template>
  <q-page padding>
    <h6>Home</h6>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { echo } from "boot/echo";

onMounted(() => {
  console.log('echo :>> ', echo);
})
</script>
