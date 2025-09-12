<template>
  <div class="flex items-center justify-center gap-1 mb-4">
    <span
      v-for="star in 5"
      :key="star"
      class="text-xl"
      :class="star <= Math.ceil(rating) ? 'text-black' : 'text-gray-400'"
    >
      ★
    </span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  rating: number
}>()
</script>