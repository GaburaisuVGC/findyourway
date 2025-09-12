<template>
  <div class="flex justify-center mb-6">
    <div class="relative w-[120px] h-[120px]">
      <svg class="absolute inset-0" width="120" height="120" viewBox="0 0 120 120">
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#B176FF" />
            <stop offset="100%" style="stop-color:#FF7342" />
          </linearGradient>
        </defs>
        
        <circle
          cx="60"
          cy="60"
          r="50"
          fill="none"
          stroke="#e5e7eb"
          stroke-width="4"
        />
        
        <circle
          cx="60"
          cy="60"
          r="50"
          fill="none"
          stroke="url(#progressGradient)"
          stroke-width="4"
          stroke-linecap="round"
          :stroke-dasharray="circumference"
          :stroke-dashoffset="currentOffset"
          transform="rotate(-90 60 60)"
        />
      </svg>
      
      <div class="inset-0 flex items-center justify-center" style="position: relative; top: -50%">
        <div class="w-16 h-16 flex items-center justify-center">
          <span class="text-xl">⚡</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  percentage: number
}>()

const radius = 50
const circumference = 2 * Math.PI * radius
const currentOffset = ref(circumference)

onMounted(() => {
  nextTick(() => {
    const targetOffset = circumference - (props.percentage / 100) * circumference
    const startOffset = circumference
    const duration = 2000
    let startTime: number | null = null

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      const easeOutCubic = 1 - Math.pow(1 - progress, 3)
      
      currentOffset.value = startOffset - (startOffset - targetOffset) * easeOutCubic
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    
    setTimeout(() => {
      requestAnimationFrame(animate)
    }, 100)
  })
})
</script>