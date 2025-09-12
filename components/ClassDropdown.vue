<template>
  <div class="bg-white rounded-2xl mb-4 relative">
    <button
      @click="toggleOpen"
      class="w-full p-4 flex items-center justify-between text-left rounded-2xl border-none outline-none transition-all duration-200"
      style="color: #212121;"
    >
      <div class="flex-1">
        <div class="font-medium text-base">Classe</div>
        <div v-if="isComplete && !isOpen" class="text-sm mt-1 transition-all duration-200" style="color: #212121;">
          {{ selectedLevel }}{{ selectedType ? ', ' + selectedType : '' }}
        </div>
      </div>
      <div class="flex items-center gap-2">
        <div v-if="!isComplete && !isOpen" class="text-sm transition-all duration-200" style="color: #757575;">
          À compléter
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
      </div>
    </button>
    
    <div v-if="isOpen" class="p-4">
      <div class="mb-4">
        <div class="flex flex-wrap gap-2">
          <button
            v-for="level in levels"
            :key="level"
            @click="selectedLevel = level"
            class="option-pill"
            :class="{ 'option-pill-selected': selectedLevel === level }"
          >
            {{ level }}
          </button>
        </div>
      </div>
      
      <div class="border-t pt-4 mb-4">
        <h4 class="font-medium mb-3" style="color: #212121;">Type de bac</h4>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="type in bacTypes"
            :key="type"
            @click="selectedType = type"
            class="option-pill"
            :class="{ 'option-pill-selected': selectedType === type }"
          >
            {{ type }}
          </button>
        </div>
      </div>
      
      <button
        @click="confirmSelection"
        class="w-full text-white font-medium py-4 px-6 button-confirm"
        style="background-color: #212121;"
      >
        Confirmer
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: { level: string; type: string }
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: { level: string; type: string }): void
  (e: 'open'): void
  (e: 'close'): void
}>()

const isOpen = ref(false)
const selectedLevel = ref(props.modelValue.level)
const selectedType = ref(props.modelValue.type)

const levels = ['Seconde', 'Première', 'Terminale']
const bacTypes = ['Général', 'Technologique', 'Professionnel']

const isComplete = computed(() => selectedLevel.value && selectedType.value)

function toggleOpen() {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    emit('open')
  } else {
    emit('close')
  }
}

function confirmSelection() {
  emit('update:modelValue', { 
    level: selectedLevel.value, 
    type: selectedType.value 
  })
  isOpen.value = false
  emit('close')
}

defineExpose({
  close: () => {
    isOpen.value = false
  }
})
</script>