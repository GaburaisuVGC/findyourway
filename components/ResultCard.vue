<template>
  <div class="bg-white rounded-2xl p-6 mb-4">
    <LightningCircle :percentage="chances" />
    
    <div class="text-center mb-4">
      <div class="flex items-center justify-center gap-2 text-xl mb-2">
        <span class="font-bold" style="color: #212121;">{{ chances }}%</span>
        <span style="color: #212121;">·</span>
        <span style="color: #212121;">{{ getChanceLevel(chances) }}</span>
      </div>
    </div>
    
    <Stars :rating="reliability" />
    
    <p class="text-xs text-center mb-6 leading-relaxed" style="color: #757575;">
      Cette estimation est fournie à titre indicatif et ne garantit en aucun cas la décision d'admission de l'établissement.
    </p>
  </div>
  
  <button
    @click="$emit('retry')"
    class="w-full text-white font-medium py-4 px-6 rounded-2xl transition-colors"
    style="background-color: #212121;"
  >
    Tester une autre formation
  </button>
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