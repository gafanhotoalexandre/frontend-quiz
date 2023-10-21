import { useQuizContext } from '../../hooks/useQuizContext'

import './Option.css'

interface OptionProps {
  option: string
  answer: string
  selectOption: () => void
}
export function Option({ option, answer, selectOption }: OptionProps) {
  const [quizState] = useQuizContext()
  return (
    <div
      className={`option ${
        quizState.answerSelected && option === answer ? 'correct' : ''
      } ${quizState.answerSelected && option !== answer ? 'wrong' : ''}`}
      onClick={selectOption}
    >
      <p>{option}</p>
    </div>
  )
}
