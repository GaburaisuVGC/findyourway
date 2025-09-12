<template>
  <div class="rounded-xl p-4 mb-4" style="background-color: #EEE8E4;">
    <div class="flex items-center gap-2 text-sm mb-1" style="color: #757575;">
      <span>{{ universityName }}</span>
      <span>|</span>
      <div class="flex items-center gap-1">
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
        </svg>
        <span>{{ location }}</span>
      </div>
    </div>
    <div class="text-lg font-medium" style="color: #212121;">
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