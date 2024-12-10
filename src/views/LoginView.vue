<script setup>
import { ref } from 'vue';
import UserService from '@/services/userService';
import Swal from 'sweetalert2';
import localStorage from '@/services/localStorage';

const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const name = ref('');
const signUp = ref(false);
const userService = new UserService();

const handleSubmitLogin = async () => {
  try {
    const response = await userService.login(email.value, password.value);
    new localStorage('customer').set({'token': response.data.token});
    window.location.href = '/tasks';
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error.response.data.errors[0],
    });
  }
};

const handleSubmitSignUp = async () => {
  if(!name.value || !password.value || !confirmPassword.value || !email.value) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Todos os campos são obrigatórios',
    });
    return;
  }
  try {
    await userService.create({
      email: email.value, 
      password: password.value, 
      password_confirmation: confirmPassword.value,
      name: name.value,
    });
    Swal.fire({
      icon: 'success',
      title: 'Sucesso',
      text: 'Usuário cadastrado com sucesso',
    });
    signUp.value = false;
    password.value = '';
    confirmPassword.value = '';
  } catch (error) {
    console.log(error)
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error.response.data.errors[0],
    });
  }
};
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex justify-center items-center">
    <div class="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
      <h1 v-if="!signUp" class="text-2xl font-semibold text-center mb-4">Login</h1>
      <form v-if="!signUp" @submit.prevent="handleSubmitLogin">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div class="mb-6">
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
        >
          Login
        </button>
        <div class="mt-4 text-center">
          <p class="text-sm">
            Não tem uma conta?
            <a href="#" @click="signUp = true" class="text-blue-500 hover:underline">Cadastre-se</a>
          </p>
        </div>
      </form>
      <div v-if="signUp" class="mt-8">
        <h1 class="text-2xl font-semibold text-center mb-4">Cadastro</h1>
        <form @submit.prevent="handleSubmitSignUp">
          <div class="mb-4">
            <label for="signUpEmail" class="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="signUpEmail"
              v-model="email"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div class="mb-4">
            <label for="name" class="block text-sm font-medium text-gray-700">Nome</label>
            <input
              type="text"
              id="name"
              v-model="name"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div class="mb-4">
            <label for="signUpPassword" class="block text-sm font-medium text-gray-700">Senha</label>
            <input
              type="password"
              id="signUpPassword"
              v-model="password"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div class="mb-4">
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirme a Senha</label>
            <input
              type="password"
              id="confirmPassword"
              v-model="confirmPassword"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            class="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 w-full"
          >
            Cadastrar
          </button>
          <div class="mt-4 text-center">
            <p class="text-sm">
              Já tem uma conta?
              <a href="#" @click="signUp = false" class="text-blue-500 hover:underline">Login</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
