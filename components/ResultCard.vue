<template>
  <div class="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8 text-center">
    <LightningCircle :percentage="chances" />
    
    <div class="mb-6">
      <h2 class="text-3xl font-bold mb-2">{{ chances }}%</h2>
      <p class="text-lg text-gray-600">{{ getChanceLevel(chances) }}</p>
    </div>
    
    <Stars :rating="reliability" />
    
    <p class="text-sm text-gray-500 mb-8 leading-relaxed">
      Cette estimation est fournie à titre indicatif et ne garantit en aucun cas la décision d'admission de l'établissement.
    </p>
    
    <button
      @click="$emit('retry')"
      class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-xl transition-colors"
    >
      Tester une autre formation
    </button>
  </div>
</template>

<script setup lang="ts">
import LightningCircle from './LightningCircle.vue'
import Stars from './Stars.vue'

defineProps<{
  chances: number
  reliability: number
}>()

defineEmits<{
  (e: 'retry'): void
}>()

function getChanceLevel(percentage: number): string {
  if (percentage >= 90) return 'Très élevées'
  if (percentage >= 75) return 'Élevées'
  if (percentage >= 50) return 'Moyennes'
  if (percentage >= 25) return 'Faibles'
  return 'Très faibles'
}
</script>