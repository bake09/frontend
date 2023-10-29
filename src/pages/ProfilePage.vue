<template>
  <q-scroll-area style="height: calc(100vh - 50px); width: 100%;" ref="scrollAreaRef">
    <q-page padding>
      <q-card>
        <q-item>
          <q-item-section avatar>
            <q-avatar>
              <img :src="authStore.user.imageurl">
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ authStore.user.firstname }} {{ authStore.user.lastname  }}</q-item-label>
            <q-item-label caption>{{ authStore.user.name }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator />

        <q-card-section :horizontal="$q.screen.gt.md">
          <q-card-section class="col-md-4">
          <div class="text-h6">Profilbild</div>
            <div class="row flex q-col-gutter-md">
              <div class="col-4">
                <q-img :src="authStore.user.imageurl" />
              </div>

              <div class="col-8">
                <div class="row flex col column justify-between">
                  <!-- Picker -->
                  <q-file
                    v-model="image"
                    dense
                    outlined
                    label="Bild wählen"
                    accept="image/*"
                    @update:modelValue="handleImagePreview"
                  >
                    <template v-slot:prepend>
                      <q-icon name="attach_file" />
                    </template>
                    <template v-slot:append>
                      <q-icon name="image" />
                    </template>
                  </q-file>
                  <!-- Preview -->
                  <q-img spinner-color="blue" :src="imageUrl" style="height: auto; max-width: 80px;"/>

                  <!-- Send Button -->
                  <q-btn label="speichern" color="primary" @click="handleImageUpload" :disable="!imageUrl"/>
                </div>

              </div>
            </div>
            <q-inner-loading :showing="authStore.isProcessing">
              <q-spinner-gears size="50px" color="primary" />
            </q-inner-loading>
          </q-card-section>

          <q-separator vertical />

          <q-card-section class="col-md-8">
            <div class="text-h6">Benutzerdaten</div>
            <q-form class="row q-col-gutter-md">
              <q-input v-model="authStore.user.name" class="col-md-6 col-12" dense filled label="User Name"/>
              <q-input v-model="authStore.user.email" class="col-md-6 col-12" dense filled label="Email Address"/>
              <q-input v-model="authStore.user.firstname" class="col-md-6 col-12" dense filled label="First Name"/>
              <q-input v-model="authStore.user.lastname" class="col-md-6 col-12" dense filled label="Last Name"/>
              <q-input v-model="authStore.user.birthday" class="col-md-6 col-12" dense filled label="Birthday"/>
              <div class="row col">
                <q-space />
                <q-btn type="submit" label="speichern" @click="handleProfileUpdate"/>
              </div>
            </q-form>
          </q-card-section>
        </q-card-section>

        <q-separator />

        <q-card-section :horizontal="$q.screen.gt.md">
          <q-card-section class="col-md-4" >
            <div class="text-h6">Passwort ändern</div>
            <q-form class="q-col-gutter-md">
              <q-input dense filled label="Aktuelles Passwort"/>
              <q-input dense filled label="Neues Passwort"/>
              <q-input dense filled label="Neues Passwort Bestätigung"/>
              <div class="row col">
                <q-space />
                <q-btn type="submit" label="Passwort ändern" />
              </div>
            </q-form>
          </q-card-section>
          <q-separator vertical/>
        </q-card-section>
      </q-card>
    </q-page>
  </q-scroll-area>
</template>

<script setup>
import { ref } from "vue";

import { useQuasar } from 'quasar'
const $q = useQuasar()

import { useAuthStore } from "stores/auth-store";
const authStore = useAuthStore()

import { useUserStore } from "stores/user-store";
const userStore = useUserStore()

const imageUrl = ref('');
const image = ref([])

const handleImagePreview = (file) => {
  imageUrl.value = URL.createObjectURL(file);
  authStore.selectedImage = file
};

const handleImageUpload = async () => {
  await authStore.addavatar()
  imageUrl.value = ''
  image.value = []
  authStore.selectedImage = null
}

const handleProfileUpdate = async () => {
  await authStore.updateProfile()
}
</script>
