<template>
  <main>
    <div class="container mt-5 mb-3">
      <div class="row align-items-center">
        <div class="col-12 col-sm-auto">
          <h2>Lista de usuarios</h2>
        </div>
        <div class="col-12 col-md-3 ms-md-auto">
          <div class="input-group">
            <span class="input-group-text bi bi-search"></span>
            <input type="text" class="form-control" placeholder="Buscar Usuario" v-model="searchQuery" />
          </div>
        </div>
      </div>
    </div>

    <AppDataTable :data="filteredUsers" :definition="tableDataDefinition">
      <template #actions="{ row }">
        <button @click="userSelected = row" class="btn btn-danger" type="button" data-bs-toggle="modal"
          data-bs-target="#modalDelete">
          <i class="bi bi-trash3"></i>
        </button>
        <button class="btn btn-primary ms-2" type="button" data-bs-toggle="modal" data-bs-target="#modalCamera"
          @click="startCamera">
          <i class="bi bi-camera"></i>
        </button>
      </template>
    </AppDataTable>
    <ModalDelete @delete="deleteUser($event)" :data="userSelected" element-name="usuario" />
    <ModalCamera ref="modalCameraRef" />
  </main>
</template>

<script setup lang="ts">
import AppDataTable from '@/components/AppDataTable.vue';
import ModalCamera from '@/components/ModalCamera.vue';
import ModalDelete from '@/components/ModalDelete.vue';
import type { responseUser, User } from '@/interfaces/dataTable.interface';
import { getRequest } from '@/utils/http';
import { getUserTableDefinition } from '@/utils/tableDefinitions';
import { ref, computed, onMounted } from 'vue';

const tableData = ref<User[]>([]);
const tableDataDefinition = ref();
const searchQuery = ref<string>('');
const userSelected = ref<User | null>(null);
const modalCameraRef = ref<InstanceType<typeof ModalCamera> | null>(null);

onMounted(() => {
  tableDataDefinition.value = getUserTableDefinition();
  getData();
});

const getData = async () => {
  const data = await getRequest<responseUser>(
    import.meta.env.VITE_BASE_API_URL + 'prueba-tecnica/usuarios/index?results=50'
  );
  tableData.value = data.usuarios;
};

const filteredUsers = computed(() => {
  if (!searchQuery.value) {
    return tableData.value;
  }
  return tableData.value.filter((user) => {
    return (
      user.usuarioNombre.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.usuarioApellidoPaterno.toLowerCase().includes(searchQuery.value.toLowerCase()));
  });
});

const deleteUser = (user: User) => {
  const index = tableData.value.findIndex((u) => u.usuarioNombre === user.usuarioNombre);
  tableData.value.splice(index, 1);
  userSelected.value = null;
};

const startCamera = () => modalCameraRef.value && modalCameraRef.value.activeCamera();

</script>
