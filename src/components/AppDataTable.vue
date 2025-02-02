<template>
  <div>
    <div class="table-responsive">
      <table class="table table-hover table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th v-for="item in columnsToShow" :key="item.key" scope="col"
              :class="{ 'fade-out': !columnsToShow.includes(item) }">
              <div class="d-flex justify-content-between text-truncate">
                <div>{{ item.label }}</div>
                <i class="bi bi-x-circle cursor-pointer ms-2" @click="hideColumn(item.key.toString())"></i>
              </div>
            </th>
            <th v-if="showActions" class="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in paginatedData" :key="index">
            <td>{{ index + 1 + ((currentPage - 1) * itemsPerPage) }}</td>
            <td v-for="column in columnsToShow" :key="column.key"
              :class="{ 'fade-out': !columnsToShow.includes(column) }">
              {{ item[column.key as keyof T] }}
            </td>
            <td v-if="showActions" class="d-flex justify-content-center">
              <slot name="actions" :row="item"></slot>
            </td>
          </tr>
          <tr>
            <td colspan="100%" v-if="!paginatedData.length" class="text-center">No hay datos</td>
          </tr>
          <tr v-if="paginatedData.length">
            <td colspan="100%" class="text-center">
              Mostrando {{ (currentPage - 1) * itemsPerPage + 1 }} a
              {{ (currentPage - 1) * itemsPerPage + paginatedData.length }} de {{ props.data.length }} registros
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <nav class="d-flex justify-content-end">
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <a class="page-link bi bi-arrow-left" href="#" @click="prevPage"></a>
        </li>
        <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: currentPage === page }">
          <a class="page-link" href="#" @click="goToPage(page)">{{ page }}</a>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <a class="page-link bi bi-arrow-right" href="#" @click="nextPage"></a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts" generic="T">
import { ref, computed, defineProps, useSlots, watch } from 'vue';
import type { DataTableDefinitionInterface } from '@/interfaces/dataTableDefinition.interface';

interface AppDataTableProps<T> {
  data: T[];
  definition: DataTableDefinitionInterface<T>[];
}

const props = defineProps<AppDataTableProps<T>>();
const slots = useSlots();
const currentPage = ref(1);
const itemsPerPage = ref(10);
const columnsToShow = ref(props.definition);

watch(() => props.data, () => {
  currentPage.value = 1;
});

watch(() => props.definition, (newDefinition) => {
  columnsToShow.value = newDefinition;
}, { immediate: true });

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

const hideColumn = (key: string) => {
  if (columnsToShow.value.length > 1) {
    columnsToShow.value = columnsToShow.value.filter((column) => column.key !== key);
  }
};

const showActions = computed(() => !!slots.actions);
</script>

<style scoped>
.fade-out {
  opacity: 0;
  transition: opacity 0.5s, transform 0.5s;
  transform: translateX(-20px);
}

th,
td {
  opacity: 1;
  transition: opacity 0.5s, transform 0.5s;
}
</style>
