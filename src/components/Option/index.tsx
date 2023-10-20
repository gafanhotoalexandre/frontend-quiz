import { useQuizContext } from '../../hooks/useQuizContext'

import './Option.css'

interface OptionProps {
  option: string
  answer: string
  selectOption: () => void
}
export function Option({ option, answer, selectOption }: OptionProps) {
  const [quizState, dispatch] = useQuizContext()
  return (
    <div className="option" onClick={selectOption}>
      <p>{option}</p>
    </div>
  )
}
