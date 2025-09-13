<template>
  <div class="bg-white rounded-2xl p-6 mb-4">
    <LightningCircle :percentage="chances" />
    
    <div class="text-center mb-4">
      <div class="flex items-center justify-center gap-2 text-xl mb-2">
        <span class="font-bold dark-text">{{ chances }}%</span>
        <span style="color: #212121;">·</span>
        <span style="color: #212121;">{{ getChanceLevel(chances) }}</span>
      </div>
    </div>

    <div class="flex items-center justify-center gap-2 mb-4">
      <span class="reliability font-medium text-gray-700 leading-none">Fiabilité</span>
      <Stars :rating="reliability" />
    </div>

    <p class="text-xs text-center mb-6 leading-relaxed gray-text">
      Cette estimation est fournie à titre indicatif et ne garantit en aucun cas la décision d'admission de l'établissement.
    </p>
  </div>
  
  <div class="pt-6">
  <button
    @click="$emit('retry')"
    class="w-full text-white font-medium py-4 px-6 rounded-2xl transition-colors button-enabled dark-background"
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
