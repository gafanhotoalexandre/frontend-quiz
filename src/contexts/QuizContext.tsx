import { createContext, useReducer } from 'react'

import { MiniQuiz } from '../types/Quiz'
import questions from '../data/questions'

interface State {
  gameStage: string
  questions: MiniQuiz[]
  currentQuestion: number
  // answerSelected: boolean
  score: number
  // help: boolean | string
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

const STAGES = ['Start', 'Playing', 'End']

const initialState: State = {
  gameStage: STAGES[0],
  questions,
  currentQuestion: 0,
  score: 0,
}

function quizReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'CHANGE_STAGE':
      return {
        ...state,
        gameStage: STAGES[1],
      }

    case 'REORDER_QUESTIONS': {
      const reorderedQuestions = questions.sort(() => Math.random() - 0.5)
      return {
        ...state,
        questions: reorderedQuestions,
      }
    }

    case 'CHANGE_QUESTION': {
      const nextQuestion = state.currentQuestion + 1
      let endGame = false

      if (!questions[nextQuestion]) {
        endGame = true
      }
      return {
        ...state,
        currentQuestion: nextQuestion,
        gameStage: endGame ? STAGES[2] : state.gameStage,
      }
    }

    case 'NEW_GAME': {
      return initialState
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
