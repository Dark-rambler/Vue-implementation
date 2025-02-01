<template>
  <main>
    <div class="mt-5 d-flex justify-content-between align-items-center">
      <h2>Lista de usuarios</h2>
      <div class="input-group mb-3 w-25">
        <span class="input-group-text bi bi-search"></span>
        <input type="text" class="form-control" placeholder="Buscar Usuario" aria-label="Username"
          aria-describedby="basic-addon1">
      </div>
    </div>
    <AppDataTable :data="tableData">
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
import type { User } from '@/interfaces/dataTable.interface';
import { ref } from 'vue';
const tableData = ref<User[]>([
  {
    usuarioNombre: 'Leanne Graham',
    usuarioApellidoPaterno: 'Bret',
    usuarioApellidoMaterno: 'Bret',
    usuarioEmail: 'leanne@gmail.com',
    usuarioTelefono: '1-770-736-8031 x56442',
  },
  {
    usuarioNombre: 'Ervin Howell',
    usuarioApellidoPaterno: 'Antonette',
    usuarioApellidoMaterno: 'Antonette',
    usuarioEmail: 'ervin@gmail.com',
    usuarioTelefono: '010-692-6593 x09125',
  },
  {
    usuarioNombre: 'Clementine Bauch',
    usuarioApellidoPaterno: 'Samantha',
    usuarioApellidoMaterno: 'Samantha',
    usuarioEmail: 'clementine@gmail.com',
    usuarioTelefono: '1-463-123-4447',
  },
  {
    usuarioNombre: 'Patricia Lebsack',
    usuarioApellidoPaterno: 'Karianne',
    usuarioApellidoMaterno: 'Karianne',
    usuarioEmail: 'patricia@gmail.com',
    usuarioTelefono: '493-170-9623 x156',
  },
  {
    usuarioNombre: 'Arnaldo Lebsack',
    usuarioApellidoPaterno: 'asd',
    usuarioApellidoMaterno: 'Karianne',
    usuarioEmail: 'arnaldo@gmail.com',
    usuarioTelefono: '493-170-9623 x156',
  },
  {
    usuarioNombre: 'Ruben Lebsack',
    usuarioApellidoPaterno: 'Karianne',
    usuarioApellidoMaterno: 'Karianne',
    usuarioEmail: 'ruben@gmail.com',
    usuarioTelefono: '493-170-9623 x156',
  },
  {
    usuarioNombre: 'Miguel Lebsack',
    usuarioApellidoPaterno: 'Karianne',
    usuarioApellidoMaterno: 'Karianne',
    usuarioEmail: 'miguel@gmail.com',
    usuarioTelefono: '493-170-9623 x156',
  },
  {
    usuarioNombre: 'Patricia Lebsack',
    usuarioApellidoPaterno: 'Karianne',
    usuarioApellidoMaterno: 'Karianne',
    usuarioEmail: 'patricia2@gmail.com',
    usuarioTelefono: '493-170-9623 x156',
  },
  {
    usuarioNombre: 'Juan Perez',
    usuarioApellidoPaterno: 'Gomez',
    usuarioApellidoMaterno: 'Lopez',
    usuarioEmail: 'juan@gmail.com',
    usuarioTelefono: '123-456-7890',
  },
  {
    usuarioNombre: 'Maria Garcia',
    usuarioApellidoPaterno: 'Fernandez',
    usuarioApellidoMaterno: 'Martinez',
    usuarioEmail: 'maria@gmail.com',
    usuarioTelefono: '234-567-8901',
  },
  {
    usuarioNombre: 'Carlos Sanchez',
    usuarioApellidoPaterno: 'Rodriguez',
    usuarioApellidoMaterno: 'Hernandez',
    usuarioEmail: 'carlos@gmail.com',
    usuarioTelefono: '345-678-9012',
  },
  {
    usuarioNombre: 'Ana Lopez',
    usuarioApellidoPaterno: 'Diaz',
    usuarioApellidoMaterno: 'Gutierrez',
    usuarioEmail: 'ana@gmail.com',
    usuarioTelefono: '456-789-0123',
  },
  {
    usuarioNombre: 'Luis Torres',
    usuarioApellidoPaterno: 'Ramirez',
    usuarioApellidoMaterno: 'Vargas',
    usuarioEmail: 'luis@gmail.com',
    usuarioTelefono: '567-890-1234',
  },
  {
    usuarioNombre: 'Sofia Ramirez',
    usuarioApellidoPaterno: 'Morales',
    usuarioApellidoMaterno: 'Castro',
    usuarioEmail: 'sofia@gmail.com',
    usuarioTelefono: '678-901-2345',
  },
  {
    usuarioNombre: 'Jorge Castro',
    usuarioApellidoPaterno: 'Ortega',
    usuarioApellidoMaterno: 'Rojas',
    usuarioEmail: 'jorge@gmail.com',
    usuarioTelefono: '789-012-3456',
  },
  {
    usuarioNombre: 'Lucia Rojas',
    usuarioApellidoPaterno: 'Silva',
    usuarioApellidoMaterno: 'Mendoza',
    usuarioEmail: 'lucia@gmail.com',
    usuarioTelefono: '890-123-4567',
  },
  {
    usuarioNombre: 'Pedro Mendoza',
    usuarioApellidoPaterno: 'Carrillo',
    usuarioApellidoMaterno: 'Guerrero',
    usuarioEmail: 'pedro@gmail.com',
    usuarioTelefono: '901-234-5678',
  },
  {
    usuarioNombre: 'Carmen Guerrero',
    usuarioApellidoPaterno: 'Vega',
    usuarioApellidoMaterno: 'Fuentes',
    usuarioEmail: 'carmen@gmail.com',
    usuarioTelefono: '012-345-6789',
  },
  {
    usuarioNombre: 'Ricardo Fuentes',
    usuarioApellidoPaterno: 'Mendez',
    usuarioApellidoMaterno: 'Rios',
    usuarioEmail: 'ricardo@gmail.com',
    usuarioTelefono: '123-456-7890',
  },
  {
    usuarioNombre: 'Elena Rios',
    usuarioApellidoPaterno: 'Paredes',
    usuarioApellidoMaterno: 'Navarro',
    usuarioEmail: 'elena@gmail.com',
    usuarioTelefono: '234-567-8901',
  },
  {
    usuarioNombre: 'Fernando Navarro',
    usuarioApellidoPaterno: 'Cortes',
    usuarioApellidoMaterno: 'Miranda',
    usuarioEmail: 'fernando@gmail.com',
    usuarioTelefono: '345-678-9012',
  },
  {
    usuarioNombre: 'Isabel Miranda',
    usuarioApellidoPaterno: 'Soto',
    usuarioApellidoMaterno: 'Cardenas',
    usuarioEmail: 'isabel@gmail.com',
    usuarioTelefono: '456-789-0123',
  },
  {
    usuarioNombre: 'Oscar Cardenas',
    usuarioApellidoPaterno: 'Campos',
    usuarioApellidoMaterno: 'Aguilar',
    usuarioEmail: 'oscar@gmail.com',
    usuarioTelefono: '567-890-1234',
  },
  {
    usuarioNombre: 'Adriana Aguilar',
    usuarioApellidoPaterno: 'Valdez',
    usuarioApellidoMaterno: 'Reyes',
    usuarioEmail: 'adriana@gmail.com',
    usuarioTelefono: '678-901-2345',
  },
  {
    usuarioNombre: 'Raul Reyes',
    usuarioApellidoPaterno: 'Orozco',
    usuarioApellidoMaterno: 'Soria',
    usuarioEmail: 'raul@gmail.com',
    usuarioTelefono: '789-012-3456',
  },
  {
    usuarioNombre: 'Gabriela Soria',
    usuarioApellidoPaterno: 'Mejia',
    usuarioApellidoMaterno: 'Espinoza',
    usuarioEmail: 'gabriela@gmail.com',
    usuarioTelefono: '890-123-4567',
  },
  {
    usuarioNombre: 'Hector Espinoza',
    usuarioApellidoPaterno: 'Nunez',
    usuarioApellidoMaterno: 'Delgado',
    usuarioEmail: 'hector@gmail.com',
    usuarioTelefono: '901-234-5678',
  },
  {
    usuarioNombre: 'Monica Delgado',
    usuarioApellidoPaterno: 'Salazar',
    usuarioApellidoMaterno: 'Cruz',
    usuarioEmail: 'monica@gmail.com',
    usuarioTelefono: '012-345-6789',
  },
  {
    usuarioNombre: 'Roberto Cruz',
    usuarioApellidoPaterno: 'Ibarra',
    usuarioApellidoMaterno: 'Lara',
    usuarioEmail: 'roberto@gmail.com',
    usuarioTelefono: '123-456-7890',
  },
  {
    usuarioNombre: 'Laura Lara',
    usuarioApellidoPaterno: 'Mora',
    usuarioApellidoMaterno: 'Flores',
    usuarioEmail: 'laura@gmail.com',
    usuarioTelefono: '234-567-8901',
  },
  {
    usuarioNombre: 'Rosa Flores',
    usuarioApellidoPaterno: 'Cabrera',
    usuarioApellidoMaterno: 'Villanueva',
    usuarioEmail: 'asdasdasdsda-as das das',
    usuarioTelefono: '345-678-9012',
  },
]);

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
