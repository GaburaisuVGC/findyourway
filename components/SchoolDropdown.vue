<template>
  <div class="relative">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-40 bg-black bg-opacity-25"
      @click="isOpen = false"
    ></div>
    
    <div
      v-if="isOpen"
      class="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto border"
    >
      <button
        v-for="school in schools"
        :key="school.id"
        @click="selectSchool(school)"
        class="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
        style="color: #212121;"
      >
        <p class="font-medium">{{ school.name }}</p>
        <p class="text-sm" style="color: #757575;">{{ school.city }}</p>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { School } from '../types'

const props = defineProps<{
  selectedSchool: School
  schools: School[]
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'select', school: School): void
  (e: 'close'): void
}>()

function selectSchool(school: School) {
  emit('select', school)
  emit('close')
}
</script>