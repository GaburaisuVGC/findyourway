import { useFetch } from 'nuxt/app'
import type { RandomFormResponse } from '../types'

export const useRandomForm = async () => {
  const { data, error } = await useFetch<RandomFormResponse>('/api/random', { server: true })
  return {
    data,
    error
  }
}