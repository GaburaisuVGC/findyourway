import { defineEventHandler } from 'h3'
import type { RandomFormResponse, School } from '../../types'

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

// helper to get a random element from an array
function randomFrom<T>(arr: T[]) { return arr[Math.floor(Math.random() * arr.length)] }

export default defineEventHandler(() => {
  const schoolName = randomFrom(SCHOOLS)
  // random id generator
  const school: School = {
      id: cryptoRandomId(), name: schoolName,
      city: ''
  }

  const levels = ['Seconde', 'Première', 'Terminale']
  const streams = ['Général', 'Technologique', 'Professionnel']

  // randomly include stream and note
  const classCard = {
    level: randomFrom(levels),
    stream: Math.random() > 0.5 ? randomFrom(streams) : undefined,
    note: Math.random() > 0.5 ? Math.floor(8 + Math.random() * 12) : undefined
  }

  // return a full RandomFormResponse
  const response: RandomFormResponse = {
    school,
    classCard,
    timestamp: new Date().toISOString()
  }

  console.log('Generated random form response:', response)

  return response
})

function cryptoRandomId() {
  // random id generator using Math.random
  return Math.floor(Math.random() * 1000000)
}