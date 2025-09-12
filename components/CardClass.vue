<template>
  <div class="bg-white shadow-md rounded-2xl p-6">
    <h2 class="text-xl font-semibold mb-4">En quelle classe es-tu ?</h2>

    <div class="grid grid-cols-2 gap-4">
      <button
        v-for="option in classes"
        :key="option"
        @click="emit('select', option)"
        class="border rounded-xl py-3 px-4 text-center hover:bg-blue-50 transition"
        :class="{ 'bg-blue-100 border-blue-500': option === selected }"
      >
        {{ option }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
// define props and emits for TypeScript
const props = defineProps<{
  classes: string[]
  selected?: string
}>()
const emit = defineEmits<{
  (e: 'select', selectedClass: string): void
}>()
</script>
