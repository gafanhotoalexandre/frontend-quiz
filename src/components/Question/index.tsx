import { useQuizContext } from '../../hooks/useQuizContext'
import { Question as QuestionType } from '../../types/Question'
import { Option } from '../Option'

import './Question.css'

export function Question() {
  const [quizState, dispatch] = useQuizContext()
  const currentQuestion: QuestionType =
    quizState.questions[quizState.currentQuestion]

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
        {currentQuestion.options.map((option: string) => (
          <Option
            key={option}
            option={option}
            answer={currentQuestion.answer}
            selectOption={() => onSelectOption(option)}
            hide={quizState.optionToHide === option ? 'hide' : null}
          />
        ))}
      </section>

      {!quizState.answerSelected && !quizState.help && (
        <>
          {currentQuestion.tip && (
            <button onClick={() => dispatch({ type: 'SHOW_TIP' })}>Dica</button>
          )}
          <button onClick={() => dispatch({ type: 'REMOVE_OPTION' })}>
            Excluir uma opção
          </button>
        </>
      )}

      {!quizState.answerSelected && quizState.help === 'tip' && (
        <p>{currentQuestion.tip}</p>
      )}
      {quizState.answerSelected && (
        <button onClick={() => dispatch({ type: 'CHANGE_QUESTION' })}>
          Continuar
        </button>
      )}
    </div>
  )
}
