<template>
  <div class="rounded-2xl p-4 mb-4 text-center beige-background">
    <div class="flex items-center justify-center gap-2 text-sm mb-1 gray-text">
      <span>{{ universityName }}</span>
      <span>|</span>
      <div class="flex items-center gap-1">
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
        </svg>
        <span>{{ location }}</span>
      </div>
    </div>
    <div class="text-lg font-medium text-center dark-text">
      {{ specialty }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  universityName: string
  location: string
  specialty: string
}>()
</script>