import { useQuizContext } from '../../hooks/useQuizContext'
import { Option } from '../Option'

import './Question.css'

export function Question() {
  const [quizState, dispatch] = useQuizContext()
  const currentQuestion = quizState.questions[quizState.currentQuestion]

  function onSelectOption(option: string) {
    dispatch({
      type: 'CHECK_ANSWER',
      payload: { answer: currentQuestion.answer, option },
    })
  }
  return (
    <div id="question">
      <p>
        Pergunta de {quizState.currentQuestion + 1} a{' '}
        {quizState.questions.length}
      </p>
      <h2>{currentQuestion.question}</h2>

      <section id="options-container">
        {currentQuestion.options.map((option) => (
          <Option
            key={option}
            option={option}
            answer={currentQuestion.answer}
            selectOption={() => onSelectOption(option)}
          />
        ))}
      </section>

      {quizState.answerSelected && (
        <button onClick={() => dispatch({ type: 'CHANGE_QUESTION' })}>
          Continuar
        </button>
      )}
    </div>
  )
}
