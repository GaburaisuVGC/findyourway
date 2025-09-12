<template>
  <div class="min-h-screen flex flex-col items-center justify-center">
    <h1 class="text-4xl font-bold text-blue-600">
      Edumapper: bien s’orienter dans ses études supérieures
    </h1>

    <p class="text-gray-600 mt-4">
      Test API locale :
    </p>

    <p v-if="data" class="mt-2 text-green-600 font-semibold">
      {{ data.message }}
    </p>
  </div>
</template>

<script setup lang="ts">
const { data } = await useFetch('/api/hello')
</script>