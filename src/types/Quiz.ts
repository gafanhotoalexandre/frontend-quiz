import { Question } from './Question'

export type Quiz = {
  category: string
  questions: Question[]
}

export type MiniQuiz = {
  question: string
  options: string[]
  answer: string
}
