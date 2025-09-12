<template>
  <AppLayout>
    <div v-if="!showResult">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="md:col-span-2 space-y-4">
          <SchoolDropdown
            :selected-school="selectedSchool"
            :schools="allSchools"
            @select="onSelectSchool"
          />
          
          <div class="bg-white rounded-xl shadow p-6">
            <h2 class="text-xl font-semibold mb-4">En quelle classe es-tu ?</h2>
            <div class="grid grid-cols-2 gap-4">
              <button
                v-for="classOption in availableClasses"
                :key="classOption"
                @click="selectedClass = classOption"
                class="border rounded-xl py-3 px-4 text-center hover:bg-blue-50 transition"
                :class="{ 'bg-blue-100 border-blue-500': classOption === selectedClass }"
              >
                {{ classOption }}
              </button>
            </div>
          </div>
          
          <div class="bg-white rounded-xl shadow p-6">
            <h3 class="text-lg font-semibold mb-4">Spécialités</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                v-for="specialty in specialties"
                :key="specialty"
                @click="toggleSpecialty(specialty)"
                class="text-left border rounded-lg py-2 px-3 text-sm hover:bg-gray-50 transition"
                :class="{ 'bg-blue-50 border-blue-300': selectedSpecialties.includes(specialty) }"
              >
                {{ specialty }}
              </button>
            </div>
          </div>
          
          <div class="bg-white rounded-xl shadow p-6">
            <h3 class="text-lg font-semibold mb-4">Notes</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm text-gray-600 mb-1">Moyenne générale</label>
                <input
                  v-model="grades.general"
                  type="number"
                  min="0"
                  max="20"
                  step="0.1"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="16.5"
                >
              </div>
              <div>
                <label class="block text-sm text-gray-600 mb-1">Français</label>
                <input
                  v-model="grades.french"
                  type="number"
                  min="0"
                  max="20"
                  step="0.1"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="15.0"
                >
              </div>
              <div>
                <label class="block text-sm text-gray-600 mb-1">Mathématiques</label>
                <input
                  v-model="grades.math"
                  type="number"
                  min="0"
                  max="20"
                  step="0.1"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="14.0"
                >
              </div>
              <div>
                <label class="block text-sm text-gray-600 mb-1">Sciences</label>
                <input
                  v-model="grades.science"
                  type="number"
                  min="0"
                  max="20"
                  step="0.1"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="16.0"
                >
              </div>
            </div>
          </div>
        </div>

        <aside class="space-y-4">
          <div class="bg-white rounded-xl shadow p-6">
            <h3 class="font-semibold mb-3">Résumé</h3>
            <div class="space-y-2 text-sm">
              <p>Lycée : <span class="font-medium">{{ selectedSchool.name }}</span></p>
              <p>Classe : <span class="font-medium">{{ selectedClass }}</span></p>
              <p v-if="selectedSpecialties.length">
                Spécialités : <span class="font-medium">{{ selectedSpecialties.join(', ') }}</span>
              </p>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow p-6 text-center">
            <button
              @click="confirmEstimation"
              class="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-medium transition-colors"
            >
              Confirmer
            </button>
          </div>
        </aside>
      </div>
    </div>
    
    <div v-else class="flex justify-center items-center min-h-[60vh]">
      <ResultCard
        :chances="estimationResult.chances"
        :reliability="estimationResult.reliability"
        @retry="resetForm"
      />
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from '../components/AppLayout.vue'
import SchoolDropdown from '../components/SchoolDropdown.vue'
import ResultCard from '../components/ResultCard.vue'
import { useRandomForm } from '../composables/useRandomForm'
import type { School } from '../types'

const { data } = await useRandomForm()

const showResult = ref(false)

const SCHOOLS = [
  "Etienne Dolet",
  "Lycée privé Charles de Foucauld",
  "Lycée polyvalent Guillaume Tirel",
  "Lycée polyvalent l'Initiative",
  "Lycée polyvalent privé Saint Jean de Montmartre",
  "Lycée privé Pascal",
  "Lycée du bâtiment et des travaux publics",
  "Lycée polyvalent privé Saint-Nicolas",
  "Lycée privé La Rochefoucauld",
  "Lycée technique privé de l'école technique supérieure du laboratoire",
  "Lycée privé Charles Péguy",
  "Lycée privé Sainte-Louise",
  "Lycée privé L'Ecole alsacienne",
  "Lycée polyvalent ESAA-Ecole Boulle",
  "Lycée polyvalent Paul Poiret",
  "Lycée Charlemagne",
  "Lycée Claude Monet",
  "Lycée privé Lucien de Hirsch",
  "Lycée privé Saint-Michel de Picpus"
]

const availableClasses = ['Seconde', 'Première', 'Terminale']

function createSchoolsArray(): School[] {
  return SCHOOLS.map((name, index) => ({
    id: index + 1,
    name,
    city: 'Paris'
  }))
}

const allSchools = ref(createSchoolsArray())
const selectedSchool = ref(data?.value?.school ?? getRandomSchool())
const selectedClass = ref(data.value?.classCard?.level ?? getRandomClass())
const selectedSpecialties = ref<string[]>([])
const grades = ref({
  general: '',
  french: '',
  math: '',
  science: ''
})

const estimationResult = ref({
  chances: 0,
  reliability: 0
})

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

function getRandomClass() {
  return availableClasses[Math.floor(Math.random() * availableClasses.length)]
}

function getRandomSchool(): School {
  const defaultSchool: School = { id: 1, name: SCHOOLS[0] ?? 'Unknown School', city: 'Paris' };
  return allSchools.value[Math.floor(Math.random() * allSchools.value.length)] ?? defaultSchool;
}

function onSelectSchool(school: School) {
  selectedSchool.value = school
}

function toggleSpecialty(specialty: string) {
  const index = selectedSpecialties.value.indexOf(specialty)
  if (index > -1) {
    selectedSpecialties.value.splice(index, 1)
  } else {
    selectedSpecialties.value.push(specialty)
  }
}

function calculateChances(): { chances: number, reliability: number } {
  let baseChances = Math.floor(Math.random() * 101)
  let reliability = 3.5 + Math.random() * 1.5
  
  if (grades.value.general) {
    const generalGrade = parseFloat(grades.value.general)
    if (generalGrade >= 16) baseChances = Math.min(100, baseChances + 20)
    else if (generalGrade >= 14) baseChances = Math.min(100, baseChances + 10)
    else if (generalGrade >= 12) baseChances = Math.min(100, baseChances + 5)
    else baseChances = Math.max(0, baseChances - 10)
    
    reliability += 0.3
  }
  
  if (selectedSpecialties.value.length > 0) {
    baseChances = Math.min(100, baseChances + selectedSpecialties.value.length * 5)
    reliability += 0.2
  }
  
  reliability = Math.min(5, reliability)
  
  return {
    chances: baseChances,
    reliability: Math.round(reliability * 10) / 10
  }
}

function confirmEstimation() {
  estimationResult.value = calculateChances()
  showResult.value = true
}

function resetForm() {
  showResult.value = false
  selectedSchool.value = getRandomSchool()
  selectedClass.value = getRandomClass()
  selectedSpecialties.value = []
  grades.value = {
    general: '',
    french: '',
    math: '',
    science: ''
  }
}
</script>