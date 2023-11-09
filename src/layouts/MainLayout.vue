<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title>
          IntraNET Fa.Weller
        </q-toolbar-title>

        <q-btn round dense flat>
          <q-avatar v-if="authStore.isLoggedIn">
            <img :src="authStore.user.imageurl">
          </q-avatar>
          <q-avatar v-else size="md" icon="person"></q-avatar>
          <q-menu
            transition-show="rotate"
            transition-hide="rotate"
            >
            <q-list style="min-width: 100px">
              <q-item clickable v-ripple exact to="/">
                <q-item-section avatar><q-icon name="home"/></q-item-section>
                <q-item-section>Home</q-item-section>
              </q-item>
              <q-item clickable exact to="/users">
                <q-item-section avatar><q-icon name="group"/></q-item-section>
                <q-item-section>Users</q-item-section>
              </q-item>
              <q-item clickable v-ripple exact to="/profile" v-if="authStore.isLoggedIn">
                <q-item-section avatar><q-icon name="lock"/></q-item-section>
                <q-item-section>Profile</q-item-section>
              </q-item>
              <q-item clickable v-ripple exact to="/calendar" v-if="authStore.isLoggedIn">
                <q-item-section avatar><q-icon name="calendar_month"/></q-item-section>
                <q-item-section>Calendar</q-item-section>
              </q-item>
              <q-item clickable v-ripple exact to="/quiz" v-if="authStore.isLoggedIn">
                <q-item-section avatar><q-icon name="quiz"/></q-item-section>
                <q-item-section>Quiz</q-item-section>
              </q-item>
              <q-item clickable v-ripple exact to="/chat" v-if="authStore.isLoggedIn">
                <q-item-section avatar><q-icon name="chat"/></q-item-section>
                <q-item-section>Chat</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable v-ripple exact to="/login" v-if="!authStore.isLoggedIn">
                <q-item-section avatar><q-icon name="login" /></q-item-section>
                <q-item-section>Login</q-item-section>
              </q-item>
              <q-item clickable v-ripple @click="authStore.logout()" v-if="authStore.isLoggedIn">
                <q-item-section avatar><q-icon name="logout" /></q-item-section>
                <q-item-section>Logout</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label header>Menü</q-item-label>
        <q-item clickable v-ripple exact to="/">
          <q-item-section avatar><q-icon name="home"/></q-item-section>
          <q-item-section>Home</q-item-section>
        </q-item>

        <q-item clickable v-ripple exact to="/users">
          <q-item-section avatar><q-icon name="group"/></q-item-section>
          <q-item-section>Users</q-item-section>
        </q-item>

        <q-item clickable v-ripple exact to="/profile" v-if="authStore.isLoggedIn">
          <q-item-section avatar><q-icon name="lock"/></q-item-section>
          <q-item-section>Profile</q-item-section>
        </q-item>

        <q-item clickable v-ripple exact to="/calendar" v-if="authStore.isLoggedIn">
          <q-item-section avatar><q-icon name="calendar_month"/></q-item-section>
          <q-item-section>Calendar</q-item-section>
        </q-item>

        <q-item clickable v-ripple exact to="/quiz" v-if="authStore.isLoggedIn">
          <q-item-section avatar><q-icon name="quiz"/></q-item-section>
          <q-item-section>Quiz</q-item-section>
        </q-item>

        <q-item clickable v-ripple exact to="/chat" v-if="authStore.isLoggedIn">
          <q-item-section avatar><q-icon name="chat"/></q-item-section>
          <q-item-section>Chat</q-item-section>
        </q-item>

        <q-item clickable v-ripple exact to="/login" v-if="!authStore.isLoggedIn">
          <q-item-section avatar>
            <q-icon name="person"/>
          </q-item-section>
          <q-item-section>Login</q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="authStore.logout()" v-if="authStore.isLoggedIn">
          <q-item-section avatar><q-icon name="logout" /></q-item-section>
          <q-item-section>Logout</q-item-section>
        </q-item>

      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-inner-loading
      color="teal"
      :showing="authStore.authLoading"
      :label="authStore.returnAuthLoadingText"
      label-class="text-primary"
      label-style="font-size: 1.8em"
    />
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
const leftDrawerOpen = ref(false)

import { useAuthStore } from "stores/auth-store";
const authStore = useAuthStore()

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
