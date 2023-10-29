<template>
  <q-dialog v-model="createDialogIsShowing" @hide="userStore.clearCreateForm" ref="createDialogRef">
    <q-card style="width: 500px;">
      <q-card-section class="row items-center bg-blue-grey-1">
        <div class="text-h6">Create new User</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-separator  />

      <q-card-section>
        <q-form class="q-gutter-y-sm">
          <q-input
            v-model="userStore.createForm.name"
            label="Name"
            dense
            outlined
            hide-bottom-space
            clearable
            clear-icon="close"
            no-error-icon
            :error-message="userStore.error?.validation.name"
            :error="userStore.error?.validation.name != null"
          >
          <template v-slot:label>
            <div class="row items-center all-pointer-events">
              <span>Name</span> <span class="text-red">*</span>
            </div>
          </template>
          </q-input>
          <q-input
            v-model="userStore.createForm.email"
            label="Email"
            dense
            outlined
            hide-bottom-space
            clearable
            clear-icon="close"
            no-error-icon
            :error-message="userStore.error?.validation.email"
            :error="userStore.error?.validation.email != null"
          >
          <template v-slot:label>
            <div class="row items-center all-pointer-events">
              <span>Name</span> <span class="text-red">*</span>
            </div>
          </template>
          </q-input>
          <q-input
            v-model="userStore.createForm.password"
            label="Password"
            dense
            outlined
            hide-bottom-space
            clearable
            clear-icon="close"
            no-error-icon
            :error-message="userStore.error?.validation.password"
            :error="userStore.error?.validation.password != null"
          >
          <template v-slot:label>
            <div class="row items-center all-pointer-events">
              <span>Password</span> <span class="text-red">*</span>
            </div>
          </template>
          </q-input>
          <q-input
            v-model="userStore.createForm.password_confirmation"
            label="Password Confirmation"
            dense
            outlined
            hide-bottom-space
            clearable
            clear-icon="close"
            no-error-icon
            :error-message="userStore.error?.validation.password_confirmation"
            :error="userStore.error?.validation.password_confirmation != null"
          >
          <template v-slot:label>
            <div class="row items-center all-pointer-events">
              <span>Password Confirmation</span> <span class="text-red">*</span>
            </div>
          </template>
          </q-input>
        </q-form>
      </q-card-section>
      <q-separator  />
      <q-card-actions align="right" class="bg-blue-grey-1">
        <q-btn icon="save" dense label="create" color="primary" :disable="disableButtonIfAnyPropertyIsEmtpy" @click="handleCreateUser"/>
      </q-card-actions>
      <q-inner-loading :showing="userStore.isProcessing">
        <q-spinner-gears size="50px" color="primary" />
      </q-inner-loading>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "stores/user-store";
import { storeToRefs } from "pinia";
const userStore = useUserStore()
const { createDialogIsShowing, disableButtonIfAnyPropertyIsEmtpy } = storeToRefs(useUserStore())

const props = defineProps(['createDialogIsShowing'])
const createDialogRef = ref(null)

const handleCreateUser = async () => {
  try {
    await userStore.createUser();
    createDialogRef.value.hide();
  } catch (error) {
    console.log('error :>> ', error);
  }
}
</script>
