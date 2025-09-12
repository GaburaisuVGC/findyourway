<template>
  <div class="relative">
    <button
      @click="isOpen = !isOpen"
      class="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-left flex justify-between items-center hover:border-gray-400 transition-colors"
    >
      <div>
        <p class="text-xs text-gray-500">Lycée actuel</p>
        <p class="font-medium">{{ selectedSchool.name }}</p>
      </div>
      <svg
        class="w-5 h-5 transition-transform duration-200"
        :class="{ 'transform rotate-180': isOpen }"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
    
    <div
      v-if="isOpen"
      class="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto"
    >
      <button
        v-for="school in schools"
        :key="school.id"
        @click="selectSchool(school)"
        class="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
      >
        <p class="font-medium">{{ school.name }}</p>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { School } from '../types'

const props = defineProps<{
  selectedSchool: School
  schools: School[]
}>()

const emit = defineEmits<{
  (e: 'select', school: School): void
}>()

const isOpen = ref(false)

function selectSchool(school: School) {
  emit('select', school)
  isOpen.value = false
}
</script>