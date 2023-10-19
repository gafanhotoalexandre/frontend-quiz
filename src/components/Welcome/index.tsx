import QuizImage from '../../assets/images/quiz.svg'
import { useQuizContext } from '../../hooks/useQuizContext'

import './Welcome.css'

export function Welcome() {
  const [, dispatch] = useQuizContext()

  return (
    <div id="welcome">
      <h2>Seja bem-vindo!</h2>
      <p>Clique no botão abaixo para começar:</p>
      <button onClick={() => dispatch({ type: 'CHANGE_STAGE' })}>
        Iniciar
      </button>
      <img src={QuizImage} alt="Início do quiz" />
    </div>
  )
}
