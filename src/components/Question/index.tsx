import { useQuizContext } from '../../hooks/useQuizContext'

import './Question.css'

export function Question() {
  const [quizState, dispatch] = useQuizContext()
  const currentQuestion = quizState.questions[quizState.currentQuestion]

  return (
    <div id="question">
      <p>
        Pergunta de {quizState.currentQuestion + 1} a{' '}
        {quizState.questions.length}
      </p>
      <h2>{currentQuestion.question}</h2>

      <section id="options-container">
        <p>Opções</p>
      </section>

      <button onClick={() => dispatch({ type: 'CHANGE_QUESTION' })}>
        Continuar
      </button>
    </div>
  )
}
