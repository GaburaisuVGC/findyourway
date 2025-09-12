export interface School {
  id: string
  name: string
}

export type SchoolList = School[]

export interface ClassCard {
  level: string
  stream?: string
  note?: number
}

export interface RandomFormResponse {
  school: School
  classCard: ClassCard
  timestamp: string
}