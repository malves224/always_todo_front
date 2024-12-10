<script setup>
import { ref } from 'vue';
import UserService from '@/services/userService';

const email = ref('');
const password = ref('');
const userService = new UserService();

const handleSubmit = () => {
  userService.login(email.value, password.value);
};
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex justify-center items-center">
    <div class="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
      <h1 class="text-2xl font-semibold text-center mb-4">Login</h1>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <div class="mb-6">
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <button
          type="submit"
          class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>
