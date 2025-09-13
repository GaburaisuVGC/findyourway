<template>
  <div class="bg-white rounded-2xl mb-4 relative">
    <button
      @click="toggleOpen"
      class="w-full p-4 flex items-center justify-between text-left rounded-2xl border-none outline-none transition-all duration-200 dark-text"
    >
      <div class="flex-1">
        <div class="font-medium text-base">Spécialités</div>
        <div v-if="isComplete && !isOpen" class="text-sm mt-1 dark-text">
          {{ selectedSpecialties.join(', ') }}
        </div>
      </div>
      <div class="flex items-center gap-2">
        <div v-if="!isComplete && !isOpen" class="text-sm gray-text">
          À compléter
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
      </div>
    </button>
    
    <div v-if="isOpen" class="p-4">
      <div class="mb-4">
        <div class="flex flex-wrap gap-2">
          <button
            v-for="specialty in specialties"
            :key="specialty"
            @click="toggleSpecialty(specialty)"
            class="option-pill"
            :class="{ 'option-pill-selected': selectedSpecialties.includes(specialty) }"
          >
            {{ specialty }}
          </button>
        </div>
      </div>
      
      <button
        @click="confirmSelection"
        class="w-full text-white font-medium py-4 px-6 button-confirm dark-background"
      >
        Confirmer
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: string[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void
  (e: 'open'): void
  (e: 'close'): void
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

function toggleOpen() {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    emit('open')
  } else {
    emit('close')
  }
}

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
  emit('close')
}

defineExpose({
  close: () => {
    isOpen.value = false
  }
})
</script>