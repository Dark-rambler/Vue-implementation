<template>
  <div >
    <div class="table-responsive">
      <table class="table table-hover table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col" class="text-center" v-for="(item, index) in definition" :key="index">{{ item.label }}</th>
            <th v-if="showActions" class="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in paginatedData" :key="index" class="">
            <td>{{ index + 1 + ((currentPage - 1) * itemsPerPage) }}</td>
            <td v-for="(column, index) in definition" :key="index">{{ item[column.key] }}</td>
            <td v-if="showActions" class="d-flex justify-content-center">
              <slot name="actions" :row="item"></slot>
            </td>
          </tr>
          <tr>
            <td colspan="100%" v-if="!paginatedData.length" class="text-center">No hay datos</td>
          </tr>
          <tr>
            <td colspan="100%" class="text-center">
              Mostrando
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
          <a class="page-link " href="#" @click="goToPage(page)">{{ page }}</a>
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

watch(() => props.data, () => {
  currentPage.value = 1;
});

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

const showActions = computed(() => !!slots.actions);
</script>
