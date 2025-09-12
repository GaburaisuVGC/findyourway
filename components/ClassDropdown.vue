<template>
  <div class="bg-white rounded-xl mb-4 relative animate-slide-up">
    <button
      @click="isOpen = !isOpen"
      class="w-full p-4 flex items-center justify-between text-left rounded-xl border-none outline-none transition-all duration-200 hover:shadow-md"
      style="color: #212121;"
    >
      <div class="flex-1">
        <div class="font-medium text-base">Classe</div>
        <div v-if="!isComplete && !isOpen" class="text-sm mt-1 transition-all duration-200" style="color: #757575;">
          À compléter
        </div>
        <div v-else-if="isComplete && !isOpen" class="text-sm mt-1 transition-all duration-200" style="color: #212121;">
          {{ selectedLevel }}{{ selectedType ? ', ' + selectedType : '' }}
        </div>
      </div>
      <svg 
        class="w-5 h-5 transition-transform duration-300" 
        :class="{ 'transform rotate-180': isOpen }" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
    
    <div v-if="isOpen" class="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-lg z-50 border dropdown-shadow animate-fade-in">
      <div class="p-4">
        <div class="mb-4">
          <h4 class="font-medium mb-3" style="color: #212121;">Niveau</h4>
          <div class="space-y-2">
            <button
              v-for="level in levels"
              :key="level"
              @click="selectedLevel = level"
              class="w-full text-left p-3 rounded-lg transition-all duration-200 dropdown-item"
              :class="{ 'dropdown-item-selected': selectedLevel === level }"
              style="color: #212121;"
            >
              {{ level }}
            </button>
          </div>
        </div>
        
        <div class="border-t pt-4 mb-4">
          <h4 class="font-medium mb-3" style="color: #212121;">Type de bac</h4>
          <div class="space-y-2">
            <button
              v-for="type in bacTypes"
              :key="type"
              @click="selectedType = type"
              class="w-full text-left p-3 rounded-lg transition-all duration-200 dropdown-item"
              :class="{ 'dropdown-item-selected': selectedType === type }"
              style="color: #212121;"
            >
              {{ type }}
            </button>
          </div>
        </div>
        
        <button
          @click="confirmSelection"
          class="w-full text-white font-medium py-4 px-6 rounded-lg button-confirm"
          style="background-color: #212121;"
        >
          Confirmer
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: { level: string; type: string }
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: { level: string; type: string }): void
}>()

const isOpen = ref(false)
const selectedLevel = ref(props.modelValue.level)
const selectedType = ref(props.modelValue.type)

const levels = ['Seconde', 'Première', 'Terminale']
const bacTypes = ['Général', 'Technologique', 'Professionnel']

const isComplete = computed(() => selectedLevel.value && selectedType.value)

function confirmSelection() {
  emit('update:modelValue', { 
    level: selectedLevel.value, 
    type: selectedType.value 
  })
  isOpen.value = false
}
</script>