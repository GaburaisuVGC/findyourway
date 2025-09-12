<template>
  <AppLayout>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="md:col-span-2 space-y-4">
        <SchoolSelector :school="data?.school" @edit="onEditSchool" />
        <CardClass :card="data?.classCard" @change="onChangeClass" />
        <div class="bg-white rounded-xl shadow p-4">
          <p class="text-sm text-gray-500">Spécialités</p>
        </div>
        <div class="bg-white rounded-xl shadow p-4">
          <p class="text-sm text-gray-500">Notes</p>
        </div>
      </div>

      <aside class="space-y-4">
        <div class="bg-white rounded-xl shadow p-4">
          <p class="text-sm text-gray-500">Résumé</p>
          <div class="mt-3">
            <p class="text-sm">Lycée : <span class="font-medium">{{ data?.school?.name }}</span></p>
            <p class="text-sm">Classe : <span class="font-medium">{{ data?.classCard?.level }}</span></p>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow p-4 text-center">
          <button class="w-full bg-green-600 text-white py-2 rounded-lg">Estimer mes chances</button>
        </div>
      </aside>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from '../components/AppLayout.vue'
import SchoolSelector from '../components/SchoolSelector.vue'
import CardClass from '../components/CardClass.vue'
import { useRandomForm } from '../composables/useRandomForm'

const { data } = await useRandomForm()

function onEditSchool() { location.reload() }
function onChangeClass() { location.reload() }
</script>
