<template>
  <div class="rounded-xl p-6 text-white relative mb-6 animate-fade-in" style="background: linear-gradient(135deg, #B176FF 0%, #FF7342 100%);">
    <h2 class="text-xl font-bold mb-2">{{ school.name }}</h2>
    <div class="flex flex-col gap-1 text-sm mb-4">
      <div class="flex items-center gap-2">
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
        </svg>
        <span>{{ school.city }}</span>
      </div>
      <div class="flex items-center gap-2">
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4z" clip-rule="evenodd" />
        </svg>
        <span>{{ schoolType }}</span>
      </div>
    </div>
    <button 
      @click="$emit('modify')" 
      class="absolute bottom-4 left-4 text-white text-sm school-modify-btn"
    >
      Modifier
    </button>
  </div>
</template>

<script setup lang="ts">
import type { School } from '../types'

defineProps<{
  school: School
  schoolType?: string
}>()

defineEmits<{
  (e: 'modify'): void
}>()
</script>