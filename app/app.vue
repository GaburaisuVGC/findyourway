<template>
  <AppLayout>
    <div v-if="!showResult" class="space-y-4">
      <SchoolCard
        :school="selectedSchool"
        :school-type="schoolType"
        :schools="allSchools"
        @select-school="onSelectSchool"
      />
      
      <ClassDropdown
        ref="classDropdownRef"
        v-model="selectedClass"
        @open="onDropdownToggle('class', true)"
        @close="onDropdownToggle('class', false)"
      />
      
      <SpecialtiesDropdown
        ref="specialtiesDropdownRef"
        v-model="selectedSpecialties"
        @open="onDropdownToggle('specialties', true)"
        @close="onDropdownToggle('specialties', false)"
      />
      
      <GradesDropdown
        ref="gradesDropdownRef"
        v-model="grades"
        @open="onDropdownToggle('grades', true)"
        @close="onDropdownToggle('grades', false)"
      />
      
      <div class="pt-6">
        <button
          @click="confirmEstimation"
          :disabled="!canConfirm"
          class="w-full font-medium py-4 px-6 rounded-2xl transition-all duration-300"
          :class="canConfirm ? 'button-enabled' : 'button-disabled'"
        >
          Confirmer
        </button>
      </div>
    </div>
    
    <div v-else class="animate-fade-in">
      <UniversityResult
        university-name="EDHEC Business School"
        location="Roubaix"
        specialty="International BBA"
      />
      
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
import SchoolCard from '../components/SchoolCard.vue'
import ClassDropdown from '../components/ClassDropdown.vue'
import SpecialtiesDropdown from '../components/SpecialtiesDropdown.vue'
import GradesDropdown from '../components/GradesDropdown.vue'
import UniversityResult from '../components/UniversityResult.vue'
import ResultCard from '../components/ResultCard.vue'
import { useRandomForm } from '../composables/useRandomForm'
import type { School } from '../types'

const { data } = await useRandomForm()

const showResult = ref(false)

// Refs pour les dropdowns
const classDropdownRef = ref()
const specialtiesDropdownRef = ref()
const gradesDropdownRef = ref()

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

function createSchoolsArray(): School[] {
  return SCHOOLS.map((name, index) => ({
    id: index + 1,
    name,
    city: 'Paris'
  }))
}

const allSchools = ref(createSchoolsArray())
const selectedSchool = ref(data?.value?.school ?? getRandomSchool())
const selectedClass = ref({ level: data.value?.classCard?.level ?? '', type: '' })
const selectedSpecialties = ref<string[]>([])
const grades = ref<Array<{ name: string; grade: string }>>([])

const estimationResult = ref({
  chances: 0,
  reliability: 0
})

const schoolType = computed(() => {
  return Math.random() > 0.5 ? 'Lycée Public' : 'Lycée Privé'
})

const canConfirm = computed(() => {
  return selectedSchool.value && selectedClass.value.level && selectedClass.value.type
})

function getRandomSchool(): School {
  const defaultSchool: School = { id: 1, name: SCHOOLS[0] ?? 'Unknown School', city: 'Paris' }
  return allSchools.value[Math.floor(Math.random() * allSchools.value.length)] ?? defaultSchool
}

function onSelectSchool(school: School) {
  selectedSchool.value = school
}

function onDropdownToggle(dropdownName: string, isOpen: boolean) {
  if (isOpen) {
    if (dropdownName !== 'class' && classDropdownRef.value) {
      classDropdownRef.value.close()
    }
    if (dropdownName !== 'specialties' && specialtiesDropdownRef.value) {
      specialtiesDropdownRef.value.close()
    }
    if (dropdownName !== 'grades' && gradesDropdownRef.value) {
      gradesDropdownRef.value.close()
    }
  }
}

function calculateChances(): { chances: number, reliability: number } {
  let baseChances = Math.floor(Math.random() * 101)
  let reliability = 3.5 + Math.random() * 1.5
  
  const validGrades = grades.value.filter(g => g.name.trim() && g.grade.trim())
  if (validGrades.length > 0) {
    const avgGrade = validGrades.reduce((sum, g) => {
      const gradeValue = parseFloat(g.grade.toString())
      return sum + (isNaN(gradeValue) ? 0 : gradeValue)
    }, 0) / validGrades.length
    
    if (avgGrade >= 16) baseChances = Math.min(100, baseChances + 20)
    else if (avgGrade >= 14) baseChances = Math.min(100, baseChances + 10)
    else if (avgGrade >= 12) baseChances = Math.min(100, baseChances + 5)
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
  if (!canConfirm.value) return
  
  estimationResult.value = calculateChances()
  showResult.value = true
}

function resetForm() {
  showResult.value = false
  selectedSchool.value = getRandomSchool()
  selectedClass.value = { level: '', type: '' }
  selectedSpecialties.value = []
  grades.value = []
}
</script>