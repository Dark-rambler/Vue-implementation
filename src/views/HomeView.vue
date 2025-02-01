<template>
  <main>
    <div class="mt-5 d-flex justify-content-between align-items-center">
      <h2>Lista de usuarios</h2>
      <div class="input-group mb-3 w-25">
        <span class="input-group-text bi bi-search"></span>
        <input
          type="text"
          class="form-control"
          placeholder="Buscar Usuario"
          aria-label="Username"
          aria-describedby="basic-addon1"
          v-model="searchQuery"
        />
      </div>
    </div>
    <AppDataTable :data="filteredUsers">
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
    <ModalDelete @delete="deleteUser($event)" :data="userSelected" />
    <ModalCamera ref="childRef" />
  </main>
</template>

<script setup lang="ts">
import AppDataTable from '@/components/AppDataTable.vue';
import ModalCamera from '@/components/ModalCamera.vue';
import ModalDelete from '@/components/ModalDelete.vue';
import type { responseUser, User } from '@/interfaces/dataTable.interface';
import { getRequest } from '@/utils/http';
import { ref, computed, onMounted } from 'vue';
const tableData = ref<User[]>([]);

onMounted(async () => {
  try {
    // Realiza la petición GET usando la función reutilizable
    const data = await getRequest<responseUser>('https://www.4sides.com.mx/api/prueba-tecnica/usuarios/index?results=50');
      tableData.value = data.usuarios;
  } catch (error) {
    console.error('Error al cargar los usuarios:', error);
  }
});
const searchQuery = ref<string>('');

const filteredUsers = computed(() => {
  if (!searchQuery.value) {
    return tableData.value; // Si no hay búsqueda, devuelve todos los usuarios
  }
  return tableData.value.filter((user) => {
    // Filtra por nombre, apellido, email, etc.
    return (
      user.usuarioNombre.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.usuarioApellidoPaterno.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.usuarioEmail.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });
});

const userSelected = ref<User | null>(null);
const childRef = ref<InstanceType<typeof ModalCamera> | null>(null);

function startCamera() {
  if (childRef.value) {
    childRef.value.activeCamera();
  }
}

const deleteUser = (user: User) => {
  console.log('Eliminar fuera del modal', user.usuarioNombre);
  const index = tableData.value.findIndex((u) => u.usuarioNombre === user.usuarioNombre);
  tableData.value.splice(index, 1);
  userSelected.value = null;
};
</script>
