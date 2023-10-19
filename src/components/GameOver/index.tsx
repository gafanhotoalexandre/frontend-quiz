import { useQuizContext } from '../../hooks/useQuizContext'

import WellDone from '../../assets/images/welldone.svg'
import './GameOver.css'

export function GameOver() {
  const [quizState, dispatch] = useQuizContext()
  return (
    <div id="gameover">
      <h2>Fim de Jogo!</h2>
      <p>Pontuação: {quizState.score}</p>

      <p>
        Você acertou {quizState.score} de {quizState.questions.length}{' '}
        perguntas.
      </p>
      <img src={WellDone} alt="Fim do Quiz" />
      <button onClick={() => dispatch({ type: 'NEW_GAME' })}>Reiniciar</button>
    </div>
  )
}
