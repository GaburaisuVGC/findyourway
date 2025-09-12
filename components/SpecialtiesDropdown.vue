<template>
  <div class="bg-white rounded-xl mb-4 relative">
    <button
      @click="isOpen = !isOpen"
      class="w-full p-4 flex items-center justify-between text-left rounded-xl border-none outline-none"
      style="color: #212121;"
    >
      <div class="flex-1">
        <div class="font-medium text-base">Spécialités</div>
        <div v-if="!isComplete && !isOpen" class="text-sm mt-1" style="color: #757575;">
          À compléter
        </div>
        <div v-else-if="isComplete && !isOpen" class="text-sm mt-1" style="color: #212121;">
          {{ selectedSpecialties.join(', ') }}
        </div>
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
    
    <div v-if="isOpen" class="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-lg z-50 border">
      <div class="p-4">
        <div class="mb-4">
          <div class="grid grid-cols-1 gap-2">
            <button
              v-for="specialty in specialties"
              :key="specialty"
              @click="toggleSpecialty(specialty)"
              class="text-left p-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-between"
              :class="{ 'bg-blue-50': selectedSpecialties.includes(specialty) }"
              style="color: #212121;"
            >
              <span>{{ specialty }}</span>
              <svg 
                v-if="selectedSpecialties.includes(specialty)" 
                class="w-5 h-5 text-blue-600" 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
        
        <button
          @click="confirmSelection"
          class="w-full text-white font-medium py-4 px-6 rounded-lg transition-colors"
          style="background-color: #212121;"
        >
          Confirmer
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const props = defineProps<{
  modelValue: string[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void
}>()

const isOpen = ref(false)
const selectedSpecialties = ref([...props.modelValue])

const specialties = [
  'Mathématiques',
  'Physique-Chimie',
  'SVT',
  'Histoire-Géographie',
  'Langues vivantes',
  'Littérature',
  'Économie',
  'Arts',
  'Informatique',
  'Philosophie'
]

const isComplete = computed(() => selectedSpecialties.value.length > 0)

function toggleSpecialty(specialty: string) {
  const index = selectedSpecialties.value.indexOf(specialty)
  if (index > -1) {
    selectedSpecialties.value.splice(index, 1)
  } else {
    selectedSpecialties.value.push(specialty)
  }
}

function confirmSelection() {
  emit('update:modelValue', [...selectedSpecialties.value])
  isOpen.value = false
}
</script>