<template>
  <div class="bg-white rounded-xl shadow p-4 w-full">
    <div class="flex items-start justify-between gap-4">
      <div>
        <p class="text-xs text-gray-400">Lycée actuel</p>
        <h3 class="text-lg font-semibold">{{ school.name }}</h3>
      </div>
      <button class="text-sm px-3 py-1 border rounded-md hover:bg-gray-50" @click="$emit('edit')">
        Modifier
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { School } from '../types'
// define props and emits for TypeScript
defineProps<{ school: School }>()
const emit = defineEmits<{
  (e: 'edit'): void
}>()
</script>