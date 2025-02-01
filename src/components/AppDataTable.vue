<template>
  <div class="mt-5">
    <table class="table table-hover table-striped table-bordered">
      <thead>
        <tr>
          <th scope="col" v-for="(item, index) in tableData" :key="index">{{ item.label }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in paginatedData" :key="index" class="cursor-pointer">
          <td v-for="(column, index) in tableData" :key="index">{{ user[column.key] }}</td>
        </tr>
      </tbody>
    </table>
    <nav class="d-flex justify-content-center">
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <a class="page-link" href="#" @click="prevPage">Previous</a>
        </li>
        <li
          class="page-item"
          v-for="page in totalPages"
          :key="page"
          :class="{ active: currentPage === page }"
        >
          <a class="page-link" href="#" @click="goToPage(page)">{{ page }}</a>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <a class="page-link" href="#" @click="nextPage">Next</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps } from 'vue';
import type { User } from '@/interfaces/dataTable.interface';
import type { DataTableDefinitionInterface } from '@/interfaces/dataTableDefinition.interface';
import { getUserTableDefinition } from '@/utils/tableDefinitions';

interface AppDataTableProps {
  data: User[];
}

const props = defineProps<AppDataTableProps>();

const tableData = ref<DataTableDefinitionInterface<User>[]>(getUserTableDefinition());

// Lógica de paginación
const currentPage = ref(1);
const itemsPerPage = ref(10);

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return props.data.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(props.data.length / itemsPerPage.value);
});

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
