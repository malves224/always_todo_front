<script setup>
import { ref, onBeforeMount } from 'vue';
import UserService from '@/services/userService';
import Swal from 'sweetalert2';

const modalCreateTask = ref(false);
const title = ref('');
const descritpion = ref('');
const status = ref('pending');
const userService = new UserService();
const tasks = ref([]);

const handleSave = async () => {
  try {
    await userService.createTask({
      title: title.value,
      description: descritpion.value,
      status: status.value,
    });
    modalCreateTask.value = false;
    fetchTasks();
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error.response.data.errors[0],
    });
  }
}

const fetchTasks = async () => {
  const response = await userService.getTasks();
  tasks.value = response.data;
}

onBeforeMount(() => {
  fetchTasks();
});

</script>
<template>
  <div class="p-2">
    <div class="flex justify-start mb-4">
      <h1 class="mr-2 m-2">Minhas tarefas</h1>
      <button @click="modalCreateTask = true" class="bg-blue-500 text-white px-4 py-2 rounded">Criar Task</button>
    </div>
    <div class="container w-100 px-4">
      <table class="min-w-full bg-white">
        <thead>
          <tr>
            <th class="py-2 px-4 border-b-2 border-gray-300">Title</th>
            <th class="py-2 px-4 border-b-2 border-gray-300">Status</th>
            <th class="py-2 px-4 border-b-2 border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
            <tr v-for="task in tasks" :key="task.id">
              <td class="py-2 px-4 border-b border-gray-300 text-center">{{ task.title }}</td>
              <td class="py-2 px-4 border-b border-gray-300 text-center">{{ task.status }}</td>
              <td class="py-2 px-4 border-b border-gray-300">
                <div class="flex justify-center">
                <button class="bg-blue-500 text-white px-2 py-1 rounded">Editar</button>
                <button class="bg-green-500 text-white px-2 py-1 rounded ml-2">Concluir</button>
                <button class="bg-red-500 text-white px-2 py-1 rounded ml-2">Excluir</button>
                </div>
              </td>
            </tr>
        </tbody>
      </table>
    </div>
    <div v-if="modalCreateTask" class="fixed z-10 inset-0 overflow-y-auto">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-lg leading-6 font-medium text-gray-900">Criar Task</h3>
                <div class="mt-2">
                  <input v-model="title" type="text" placeholder="Título da Task" class="w-full px-3 py-2 border border-gray-300 rounded-md" />
                </div>
                <textarea v-model="description" placeholder="Descrição da Task" class="w-full px-3 py-2 border border-gray-300 rounded-md mt-2"></textarea>
                <select default="pending" class="w-full px-3 py-2 border border-gray-300 rounded-md mt-2">
                  <option value="pending">Pendente</option>
                  <option value="completed">Concluído</option>
                </select>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button @click="handleSave" type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
              Salvar
            </button>
            <button @click="modalCreateTask = false" type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm">
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
</style>
