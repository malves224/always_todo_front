<script setup>
  import { defineProps, ref, watch, defineEmits, onMounted } from 'vue';
  import Swal from 'sweetalert2';
  import UserService from '@/services/userService';


  const props = defineProps({
    modalOpen: {
      type: Boolean,
      required: true
    },
    taskEdit: {
      type: Object,
    }
  });

  const modalCreateTask = ref(props.modalOpen);

  watch(() => props.modalOpen, (newVal) => {
    modalCreateTask.value = newVal;
  });

  const title = ref('');
  const description = ref('');
  const status = ref('pending');
  const emit = defineEmits(['close', 'saved']);
  const userService = new UserService();

  const clearState = () => {
    title.value = '';
    description.value = '';
    status.value = 'pending';
  }

  const triggerClose = () => {
    emit('close');
  }

  const handleSave = async () => {
    const payload = {
      title: title.value,
      description: description.value,
      status: status.value,
    }
    try {
      props.taskEdit 
        ? await userService.updateTask(props.taskEdit.id, payload) 
        : await userService.createTask(payload);
      triggerClose();
      emit('saved');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.response.data.errors[0],
      });
    }
    clearState();
  }

  onMounted(() => {
    if(props.taskEdit) {
      title.value = props.taskEdit.title;
      description.value = props.taskEdit.description;
      status.value = props.taskEdit.status;
    }
  })
</script>
<template>
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
              <select v-model="status" default="pending" class="w-full px-3 py-2 border border-gray-300 rounded-md mt-2">
                <option value="pending">Pendente</option>
                <option value="done">Concluído</option>
              </select>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button @click="handleSave" type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
            Salvar
          </button>
            <button @click="triggerClose" type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm">
            Cancelar
            </button>
        </div>
      </div>
    </div>
  </div>
</template>