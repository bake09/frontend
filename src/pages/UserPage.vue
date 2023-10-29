<template>
  <q-page padding>

    <q-table
      :loading="userStore.loading"
      title="Users"
      :rows="userStore.users"
      :columns="userStore.getColumnsWithActions"
      separator="cell"
      dense
      row-key="name"
      :pagination="userStore.initialPagination"
      >
      <!-- :dense="!$q.screen.gt.md" -->
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
            class="text-bold text-purple bg-blue-grey-1"
          >
          {{ col.label }}
          </q-th>
        </q-tr>
      </template>

      <template v-slot:body-cell-id="props">
        <q-td :props="props" style="width: 5%;" class="bg-blue-grey-1 text-primary">
          {{ props.row.id }}
        </q-td>
      </template>

      <template v-slot:body-cell-name="props">
        <q-td :props="props" style="width: 15%;">
          {{ props.row.name }}
        </q-td>
      </template>

      <template v-slot:body-cell-email="props">
        <q-td :props="props" style="width: 15%;">
          {{ props.row.email }}
        </q-td>
      </template>

      <template v-slot:body-cell-imageurl="props">
        <q-td :props="props">
          <q-avatar size="sm">
            <q-img :src="props.row.imageurl" />
          </q-avatar>
        </q-td>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props" style="width: 5%;" class="bg-blue-grey-1 text-primary">
          <q-btn size="sm" dense round flat color="grey" @click="editRow(props)" icon="edit" />
          <q-btn size="sm" dense round flat color="red" @click="deleteRow(props)" icon="delete" />
        </q-td>
      </template>
    </q-table>

    <!-- Edit -->
    <Editmodal
      v-model="editDialogIsShowing"
      :editDialogIsShowing="editDialogIsShowing"
      @deleteRow="deleteRow"
      @hide="userStore.clearEditForm"
    />
    <!-- <q-dialog v-model="editDialogIsShowing" @hide="userStore.clearEditForm">
      <q-card style="width: 500px;">
        <q-card-section class="row items-center">
          <div class="text-h6">Edit: <span class="text-grey">id</span>{{ editForm.id }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form class="q-gutter-y-sm row" >
            <q-input
              v-model="editForm[key]"
              v-for="(field, key, index) in editForm"
              :key="index"
              :label="key"
              :disable="editFormDisabledFields.includes(key)"
              outlined
              :class="[key == 'id' ? 'col-2' : 'col-12']"
              dense
            />
          </q-form>
        </q-card-section>

        <q-card-actions>
          <q-btn dense flat round icon="delete" color="red" @click="deleteRow">
            <q-tooltip anchor="center right" self="center left">
              Benutzer löschen
            </q-tooltip>
          </q-btn>
          <q-space />
          <q-btn icon="save" dense label="update" color="primary" v-close-popup @click="userStore.updateUser"  />
        </q-card-actions>
      </q-card>
    </q-dialog> -->

    <!-- Create -->
    <Createmodal
      v-model="createDialogIsShowing"
      :createDialogIsShowing="createDialogIsShowing"
      @hide="userStore.clearCreateForm"
    />
    <!-- <q-dialog v-model="createDialogIsShowing" @hide="userStore.clearCreateForm" ref="createDialogRef">
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
            />
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
            />
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
            />
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
            />
          </q-form>
        </q-card-section>
        <q-separator  />
        <q-card-actions align="right" class="bg-blue-grey-1">
          <q-btn icon="save" dense label="create" color="primary" @click="handleCreateUser"/>
        </q-card-actions>
        <q-inner-loading :showing="userStore.isProcessing">
          <q-spinner-gears size="50px" color="primary" />
        </q-inner-loading>
      </q-card>
    </q-dialog> -->

    <q-page-sticky position="bottom-right" :offset="[18, 18]" @click="createDialogIsShowing = !createDialogIsShowing">
      <q-btn fab icon="add" color="purple" />
    </q-page-sticky>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useQuasar } from "quasar";
const $q = useQuasar()

import { useUserStore } from "stores/user-store";
import { storeToRefs } from "pinia";
const userStore = useUserStore()
const { editDialogIsShowing, createDialogIsShowing } = storeToRefs(useUserStore())

import Createmodal from "components/user/Createmodal.vue";
import Editmodal from "components/user/Editmodal.vue";

onMounted(async () => {
  await userStore.getUsers()
})

const editRow = async (props) => {
  await userStore.getAndSetFormFields(props.row)
  editDialogIsShowing.value = !editDialogIsShowing.value
}

const deleteRow = async (props = null) => {
  $q.dialog({
    title: 'Confirm',
    message: 'Would you like to delete User ?',
    cancel: true,
    persistent: true
  }).onOk(() => {
    userStore.deleteUser(props)
  }).onOk(() => {
    // console.log('>>>> second OK catcher')
  }).onCancel(() => {
    // console.log('>>>> Cancel')
  }).onDismiss(() => {
    // console.log('I am triggered on both OK and Cancel')
  })
}

</script>
