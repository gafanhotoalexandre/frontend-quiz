import { useContext } from 'react'
import { QuizContext } from '../contexts/QuizContext'

export function useQuizContext() {
  const context = useContext(QuizContext)
  if (!context) {
    throw new Error('useQuizContext deve ser usado dentro de um QuizProvider.')
  }
  return context
}
