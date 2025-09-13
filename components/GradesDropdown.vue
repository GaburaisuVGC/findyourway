<template>
  <div class="bg-white rounded-2xl mb-4 relative">
    <button
      @click="toggleOpen"
      class="w-full p-4 flex items-center justify-between text-left rounded-2xl border-none outline-none transition-all duration-200 dark-text"
    >
      <div class="flex-1">
        <div class="font-medium text-base">Notes</div>
        <div v-if="isComplete && !isOpen" class="text-sm mt-1 transition-all duration-200 dark-text">
          {{ subjectsCount }} matière{{ subjectsCount > 1 ? 's' : '' }} ajoutée{{ subjectsCount > 1 ? 's' : '' }}
        </div>
      </div>
      <div class="flex items-center gap-2">
        <div v-if="!isComplete && !isOpen" class="text-sm transition-all duration-200 gray-text">
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
      <div class="mb-4 space-y-3">
        <div 
          v-for="(subject, index) in internalSubjects" 
          :key="`subject-${index}`"
          class="flex items-center gap-3 animate-slide-up"
        >
          <input
            v-model="subject.name"
            type="text"
            placeholder="Nom de la matière"
            class="flex-1 p-3 border border-gray-300 rounded-2xl outline-none focus:border-blue-500 transition-all duration-200 grade-input dark-text"
          >
          <input
            v-model="subject.grade"
            type="text"
            placeholder="Note"
            class="w-20 p-3 border border-gray-300 rounded-2xl outline-none focus:border-blue-500 text-center transition-all duration-200 grade-input dark-text"
          >
          <button
            @click="removeSubject(index)"
            class="p-2 text-red-500 hover:bg-red-50 rounded-2xl transition-colors duration-200"
            :disabled="internalSubjects.length === 1"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
      
      <button
        @click="addSubject"
        class="w-full mb-4 p-3 border-2 border-dashed border-gray-300 rounded-2xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 gray-text"
      >
        + Ajouter une matière
      </button>
      
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
interface Subject {
  name: string
  grade: string
}

const props = defineProps<{
  modelValue: Subject[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: Subject[]): void
  (e: 'open'): void
  (e: 'close'): void
}>()

const isOpen = ref(false)
const internalSubjects = ref<Subject[]>([{ name: '', grade: '' }])

watch(() => props.modelValue, (newValue) => {
  if (newValue && newValue.length > 0) {
    internalSubjects.value = [...newValue]
  } else {
    internalSubjects.value = [{ name: '', grade: '' }]
  }
}, { immediate: true, deep: true })

const isComplete = computed(() => 
  internalSubjects.value.some(s => s.name.trim() && s.grade.trim())
)

const subjectsCount = computed(() => 
  internalSubjects.value.filter(s => s.name.trim() && s.grade.trim()).length
)

function toggleOpen() {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    emit('open')
  } else {
    emit('close')
  }
}

function addSubject() {
  internalSubjects.value.push({ name: '', grade: '' })
}

function removeSubject(index: number) {
  if (internalSubjects.value.length > 1) {
    internalSubjects.value.splice(index, 1)
  }
}

function confirmSelection() {
  const validSubjects = internalSubjects.value.filter(s => s.name.trim() && s.grade.trim())
  emit('update:modelValue', validSubjects)
  isOpen.value = false
  emit('close')
}

defineExpose({
  close: () => {
    isOpen.value = false
  }
})
</script>