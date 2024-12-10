<script setup>
import { ref, onBeforeMount } from 'vue';
import UserService from '@/services/userService';
import Swal from 'sweetalert2';
import TaskAction from '@/components/TaskAction.vue';

const modalCreateTask = ref(false);
const userService = new UserService();
const tasks = ref([]);


const fetchTasks = async () => {
  const response = await userService.getTasks();
  tasks.value = response.data;
}

const concludedTask = async (id) => {
  const response = await userService.updateTask(id, { status: 'done' });
  fetchTasks();
}

const destroyTask = async (id) => {
  try {
    await userService.destroyTask(id);
    fetchTasks();
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error.response.data.errors[0],
    });
  }
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
                <button @click="concludedTask(task.id)" class="bg-green-500 text-white px-2 py-1 rounded ml-2">Concluir</button>
                <button @click="destroyTask(task.id)" class="bg-red-500 text-white px-2 py-1 rounded ml-2">Excluir</button>
                </div>
              </td>
            </tr>
        </tbody>
      </table>
    </div>
    <TaskAction @saved="fetchTasks" :modalOpen="modalCreateTask" @close="modalCreateTask = false"  />
  </div>
</template>
<style>
</style>
