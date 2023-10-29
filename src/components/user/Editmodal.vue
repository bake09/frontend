<template>
  <q-dialog v-model="editDialogIsShowing" @hide="userStore.clearEditForm" ref="editDialogRef">
    <q-card style="width: 500px;">
      <q-card-section class="row items-center bg-blue-grey-1">
        <div class="text-h6">Edit: <span class="text-grey">id</span>{{ editForm.id }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-form class="q-gutter-y-sm row">
          <q-input
            v-model="editForm[key]"
            v-for="(field, key, index) in editForm"
            :key="index"
            :label="key"
            :disable="editFormDisabledFields.includes(key)"
            outlined
            :class="[key == 'id' ? 'col-2' : 'col-12']"
            dense
            hide-bottom-space
            clearable
            clear-icon="close"
            no-error-icon
            :error-message="`${userStore.error?.validation[key]}`"
            :error="userStore.error?.validation[key] != null"
          />
        </q-form>
      </q-card-section>

      <q-separator />
      <q-card-actions class="bg-blue-grey-1">
        <q-btn dense flat round icon="delete" color="red" @click="$emit('deleteRow')">
          <q-tooltip anchor="center right" self="center left">
            Benutzer löschen
          </q-tooltip>
        </q-btn>
        <q-space />
        <q-btn icon="save" dense label="update" color="primary" @click="handleUpdateUser"  />
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
const { editForm, editFormDisabledFields, editDialogIsShowing } = storeToRefs(useUserStore())

const props = defineProps(['editDialogIsShowing'])
const editDialogRef = ref(null)

const handleUpdateUser = async () => {
  try {
    await userStore.updateUser();
    editDialogRef.value.hide();
  } catch (error) {
    console.log('error :>> ', error);
  }
}
</script>
