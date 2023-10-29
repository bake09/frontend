<template>
  <q-page class="q-gutter-md">
    <div class="row justify-between">
      <q-parallax
        src="/images/Berliner_Str.jpg"
        class="my-bg"
      >
        <q-card class="wrapper text-center" style="width: 300px;">
          <q-card-section>
            <div class="text-h4">Login</div>
          </q-card-section>
          <q-card-section>
            <q-form @submit.prevent="authStore.login()">
              <q-input
                v-model="authStore.userLoginForm.email"
                label="Benutzer"
                type="text"
                dense
                outlined
                :error-message="authStore.error?.validation.email"
                :error="authStore.error?.validation.email != null"
              />
              <q-input
                v-model="authStore.userLoginForm.password"
                label="Passwort"
                type="password"
                dense
                outlined
                :error-message="authStore.error?.validation.password"
                :error="authStore.error?.validation.password != null"
              />
              <q-btn dense color="black" class="full-width" label="Login" type="submit"/>
            </q-form>
            <q-checkbox v-model="stayloggedIn" label="Angemeldet bleiben" />
          </q-card-section>
        </q-card>
      </q-parallax>
    </div>
    <div class="row col column text-center flex flex-center items-center text-h6 text-grey-8">
      <div><span class="text-bold text-black">Frontend:</span> Javascript, VueJS SPA - QuasarFramework</div>
      <div><span class="text-bold text-black">Backend:</span> PHP - LaravelFramework</div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "stores/auth-store";
const authStore = useAuthStore()

const stayloggedIn = ref(false)

const isValid = ref(true)

const changeEmailAddress = () => {
  authStore.userLoginForm.email = '123123123'
  console.log('authStore.userLoginForm.email :>> ', authStore.userLoginForm.email);
}

</script>

<style scoped>
.my-bg{
  /* filter: grayscale(1); */
}
</style>
