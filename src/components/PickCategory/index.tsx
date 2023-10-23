import { useQuizContext } from '../../hooks/useQuizContext'

import CategoryImg from '../../assets/images/category.svg'
import './PickCategory.css'
import { Quiz } from '../../types/Quiz'

export function PickCategory() {
  const [quizState, dispatch] = useQuizContext()

  function chooseCategoryAndReorderQuestions(category: string) {
    dispatch({ type: 'START_GAME', payload: category })
    dispatch({ type: 'REORDER_QUESTIONS' })
  }
  return (
    <div id="category">
      <h2>Escolha uma categoria</h2>
      <p>As perguntas serã referente a uma das linguagens abaixo:</p>

      <div>
        {quizState.questions.map((question: Quiz) => (
          <button
            key={question.category}
            onClick={() => chooseCategoryAndReorderQuestions(question.category)}
          >
            {question.category}
          </button>
        ))}
      </div>

      <img src={CategoryImg} alt="Categorias do quiz" />
    </div>
  )
}
