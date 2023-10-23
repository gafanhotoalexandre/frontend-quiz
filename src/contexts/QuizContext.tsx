import { createContext, useReducer } from 'react'

import { Quiz } from '../types/Quiz'
import { Question } from '../types/Question'
import questions from '../data/questions_complete'

type Stages = 'Start' | 'Category' | 'Playing' | 'End'

interface State {
  gameStage: Stages
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  questions: any
  currentQuestion: number
  answerSelected: boolean
  score: number
  help: boolean | string
  // optionToHide: string | null
}

type Action =
  | { type: 'CHANGE_STAGE' }
  | { type: 'START_GAME'; payload: string }
  | { type: 'REORDER_QUESTIONS' }
  | { type: 'CHANGE_QUESTION' }
  | { type: 'NEW_GAME' }
  | { type: 'CHECK_ANSWER'; payload: { answer: string; option: string } }
  | { type: 'SHOW_TIP' }
  | { type: 'REMOVE_OPTION' }

enum GameStage {
  Start = 'Start',
  Category = 'Category',
  Playing = 'Playing',
  End = 'End',
}
const STAGES: GameStage[] = [
  GameStage.Start,
  GameStage.Category,
  GameStage.Playing,
  GameStage.End,
]

const initialState: State = {
  gameStage: STAGES[0],
  questions,
  currentQuestion: 0,
  score: 0,
  answerSelected: false,
  help: false,
}

function quizReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'CHANGE_STAGE':
      return {
        ...state,
        gameStage: STAGES[1],
      }

    case 'START_GAME': {
      let quizQuestions: Question[] | null = null

      state.questions.forEach((question: Quiz) => {
        if (question.category === action.payload) {
          quizQuestions = question.questions
        }
      })

      const updatedState = { ...state }
      updatedState.questions = quizQuestions! || state.questions

      return {
        ...updatedState,
        gameStage: STAGES[2],
      }
    }

    case 'REORDER_QUESTIONS': {
      const reorderedQuestions = state.questions.sort(() => Math.random() - 0.5)
      return {
        ...state,
        questions: reorderedQuestions,
      }
    }

    case 'CHANGE_QUESTION': {
      const nextQuestion = state.currentQuestion + 1
      let endGame = false

      if (!state.questions[nextQuestion]) {
        endGame = true
      }
      return {
        ...state,
        currentQuestion: nextQuestion,
        gameStage: endGame ? STAGES[3] : state.gameStage,
        answerSelected: false,
        help: false,
      }
    }

    case 'NEW_GAME': {
      return initialState
    }

    case 'CHECK_ANSWER': {
      if (state.answerSelected) return state

      const answer = action.payload.answer
      const option = action.payload.option
      let correctAnswer = 0

      if (answer === option) correctAnswer = 1

      return {
        ...state,
        score: state.score + correctAnswer,
        answerSelected: option as unknown as boolean,
      }
    }

    case 'SHOW_TIP': {
      return {
        ...state,
        help: 'tip',
      }
    }

    default:
      return state
  }
}

export const QuizContext = createContext<
  [State, React.Dispatch<Action>] | undefined
>(undefined)

interface QuizProviderProps {
  children: React.ReactNode
}
export function QuizProvider({ children }: QuizProviderProps) {
  const value = useReducer(quizReducer, initialState)
  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>
}
