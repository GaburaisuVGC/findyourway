<template>
  <div class="relative mb-6 animate-fade-in">
    <div class="rounded-2xl p-6 text-white md:flex md:items-center md:justify-between" style="background: linear-gradient(90deg,rgba(255, 115, 66, 1) 60%, rgba(177, 118, 255, 1) 100%);">
      <div class="md:flex-1">
        <h2 class="text-xl font-bold mb-2">{{ school.name }}</h2>
        <div class="flex items-center gap-4 text-sm mb-4 md:mb-0">
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
            </svg>
            <span>Paris</span>
          </div>
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4z" clip-rule="evenodd" />
            </svg>
            <span>{{ schoolType }}</span>
          </div>
        </div>
      </div>
      <div class="relative">
        <button 
           @click="showSchoolDropdown = !showSchoolDropdown"
           class="school-modify-btn md:ml-4"
        >
          Modifier
        </button>
      </div>
    </div>
    
    <div v-if="showSchoolDropdown" class="w-full overflow-hidden rounded-b-2xl shadow-lg border-t-0" style="background: white; border-radius: 0 0 1rem 1rem;">
      <div class="p-4">
        <div class="space-y-2 max-h-60 overflow-y-auto">
          <button
              v-for="school in schools"
              :key="school.id"
              @click="selectSchool(school)"
              class="w-full px-4 py-3 text-left hover:bg-gray-50 transition-all duration-200 border-b border-gray-100 last:border-b-0 text-black rounded-lg"
          >
            <p class="font-medium">{{ school.name }}</p>
            <p class="text-sm opacity-90">{{ school.city }}</p>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { School } from '../types'

const props = defineProps<{
  school: School
  schoolType?: string
  schools: School[]
}>()

const emit = defineEmits<{
  (e: 'selectSchool', school: School): void
}>()

const showSchoolDropdown = ref(false)

function selectSchool(school: School) {
  emit('selectSchool', school)
  showSchoolDropdown.value = false
}
</script>