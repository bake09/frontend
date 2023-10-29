<template>
  <q-table
    :loading="userStore.loading"
    title="Users"
    :rows="userStore.users"
    :columns="userStore.getColumnsWithActions"
    separator="cell"
    row-key="name"
    :dense="!$q.screen.gt.md"
    :pagination="userStore.initialPagination"
    >
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
      <q-td :props="props" style="width: 45%;">
        {{ props.row.name }}
      </q-td>
    </template>

    <template v-slot:body-cell-email="props">
      <q-td :props="props" style="width: 45%;">
        {{ props.row.email }}
      </q-td>
    </template>

    <template v-slot:body-cell-actions="props">
      <q-td :props="props" style="width: 5%;" class="bg-blue-grey-1 text-primary">
        <q-btn :props="props" size="sm" dense round flat color="grey" @click="editRow" icon="edit" />
        <q-btn :props="props" size="sm" dense round flat color="red" @click="deleteRow" icon="delete" />
      </q-td>
    </template>
  </q-table>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "stores/user-store";

const userStore = useUserStore()

const props = defineProps(['editDialogIsShowing'])
const editDialogRef = ref(null)

import { useQuasar } from "quasar";
const $q = useQuasar()

const handleUpdateUser = async () => {
  try {
    await userStore.updateUser();
    editDialogRef.value.hide();
  } catch (error) {
    console.log('error :>> ', error);
  }
}
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
