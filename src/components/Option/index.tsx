import { useQuizContext } from '../../hooks/useQuizContext'

import './Option.css'

interface OptionProps {
  option: string
  answer: string
  selectOption: () => void
  hide: string | null
}
export function Option({ option, answer, selectOption, hide }: OptionProps) {
  const [quizState] = useQuizContext()
  return (
    <div
      className={`option ${
        quizState.answerSelected && option === answer ? 'correct' : ''
      } ${quizState.answerSelected && option !== answer ? 'wrong' : ''}
      ${hide}`}
      onClick={selectOption}
    >
      <p>{option}</p>
    </div>
  )
}
