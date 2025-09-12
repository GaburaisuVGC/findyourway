export interface School {
  id: number
  name: string
  city: string
}

export interface ClassCard {
  level: string
  description?: string
}

export interface EstimationResult {
  chances: number
  reliability: number
  level: string
}

export interface FormData {
  school: School
  classLevel: string
  specialties: string[]
  grades: {
    general: string
    french: string
    math: string
    science: string
  }
}

export type SchoolList = School[]

export interface RandomFormResponse {
  school: School
  classCard: ClassCard
  timestamp: string
}