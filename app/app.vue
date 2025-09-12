<template>
  <AppLayout>
    <div v-if="!showResult" class="space-y-4">
      <SchoolCard
        :school="selectedSchool"
        :school-type="selectedSchool.type"
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

      <div class="pt-6 text-center">
        <button
          @click="confirmEstimation"
          :disabled="!canConfirm"
          class="w-full font-medium py-4 px-6 rounded-3xl transition-all duration-300 little-button"
          :class="canConfirm ? 'button-enabled' : 'button-disabled'"
        >
          Confirmer
        </button>
      </div>
    </div>

    <div v-else>
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
import AppLayout from "../components/AppLayout.vue";
import SchoolCard from "../components/SchoolCard.vue";
import ClassDropdown from "../components/ClassDropdown.vue";
import SpecialtiesDropdown from "../components/SpecialtiesDropdown.vue";
import GradesDropdown from "../components/GradesDropdown.vue";
import UniversityResult from "../components/UniversityResult.vue";
import ResultCard from "../components/ResultCard.vue";
import { useRandomForm } from "../composables/useRandomForm";
import type { School, ClassCard } from "../types";
import { SCHOOLS } from "../server/api/random";

const { data } = await useRandomForm();

const showResult = ref(false);

const classDropdownRef = ref();
const specialtiesDropdownRef = ref();
const gradesDropdownRef = ref();

const allSchools = ref(SCHOOLS)
const selectedSchool = ref(data?.value?.school ?? randomSchool())
const selectedClass = ref<ClassCard>({
  level: data.value?.classCard?.level ?? '',
  type: data.value?.classCard?.type ?? 'Général'
})
const selectedSpecialties = ref<string[]>([])
const grades = ref<Array<{ name: string; grade: string }>>([])

const estimationResult = ref({
  chances: 0,
  reliability: 0,
})

const canConfirm = computed(() => {
  return selectedSchool.value && selectedClass.value.level && selectedClass.value.type
})

function randomSchool(): School {
  return SCHOOLS[Math.floor(Math.random() * SCHOOLS.length)]!
}

function onSelectSchool(school: School) {
  selectedSchool.value = school
}

function onDropdownToggle(type: string, isOpen: boolean) {
  if (isOpen) {
    if (type !== "class") classDropdownRef.value?.close();
    if (type !== "specialties") specialtiesDropdownRef.value?.close();
    if (type !== "grades") gradesDropdownRef.value?.close();
  }
}

function confirmEstimation() {
  estimationResult.value = {
    chances: Math.floor(Math.random() * 100),
    reliability: 3.5 + Math.random() * 1.5
  }
  showResult.value = true
}

function resetForm() {
  showResult.value = false
  selectedClass.value = { level: '', type: 'Général' }
  selectedSpecialties.value = []
  grades.value = []
  estimationResult.value = { chances: 0, reliability: 0 }
}
</script>
