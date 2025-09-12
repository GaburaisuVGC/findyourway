import { defineEventHandler } from 'h3'
import type { ClassCard, RandomFormResponse, School } from '../../types'

export const SCHOOLS: School[] = [
  { id: 1, name: "Etienne Dolet", city: "Paris", type: "Public" },
  { id: 2, name: "Lycée privé Charles de Foucauld", city: "Paris", type: "Privé" },
  { id: 3, name: "Lycée polyvalent Guillaume Tirel", city: "Paris", type: "Public" },
  { id: 4, name: "Lycée polyvalent l'Initiative", city: "Paris", type: "Public" },
  { id: 5, name: "Lycée polyvalent privé Saint Jean de Montmartre", city: "Paris", type: "Privé" },
  { id: 6, name: "Lycée privé Pascal", city: "Paris", type: "Privé" },
  { id: 7, name: "Lycée du bâtiment et des travaux publics", city: "Paris", type: "Public" },
  { id: 8, name: "Lycée polyvalent privé Saint-Nicolas", city: "Paris", type: "Privé" },
  { id: 9, name: "Lycée privé La Rochefoucauld", city: "Paris", type: "Privé" },
  { id: 10, name: "Lycée technique privé de l'école technique supérieure du laboratoire", city: "Paris", type: "Privé" },
  { id: 11, name: "Lycée privé Charles Péguy", city: "Paris", type: "Privé" },
  { id: 12, name: "Lycée privé Sainte-Louise", city: "Paris", type: "Privé" },
  { id: 13, name: "Lycée privé L'Ecole alsacienne", city: "Paris", type: "Privé" },
  { id: 14, name: "Lycée polyvalent ESAA-Ecole Boulle", city: "Paris", type: "Public" },
  { id: 15, name: "Lycée polyvalent Paul Poiret", city: "Paris", type: "Public" },
  { id: 16, name: "Lycée Charlemagne", city: "Paris", type: "Public" },
  { id: 17, name: "Lycée Claude Monet", city: "Paris", type: "Public" },
  { id: 18, name: "Lycée privé Lucien de Hirsch", city: "Paris", type: "Privé" },
  { id: 19, name: "Lycée privé Saint-Michel de Picpus", city: "Paris", type: "Privé" }
]

function randomFrom<T>(arr: T[]) { return arr[Math.floor(Math.random() * arr.length)] }

export default defineEventHandler(() => {
  const school = randomFrom(SCHOOLS)

  const levels = ['Seconde', 'Première', 'Terminale']
  const streams: Array<'Général' | 'Technologique' | 'Professionnel'> = ['Général', 'Technologique', 'Professionnel']

const classCard: ClassCard = {
  level: randomFrom(levels),
  type: randomFrom(streams),
}

  const response: RandomFormResponse = {
    school,
    classCard,
    timestamp: new Date().toISOString()
  }

  console.log('Generated random form response:', response)

  return response
})
