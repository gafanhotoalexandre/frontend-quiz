import { useEffect } from 'react'

import { Welcome } from './components/Welcome'
import { Question } from './components/Question'

import { useQuizContext } from './hooks/useQuizContext'

import './App.css'
import { GameOver } from './components/GameOver'
import { PickCategory } from './components/PickCategory'
function App() {
  const [quizState, dispatch] = useQuizContext()

  return (
    <div className="App">
      <h1>Quiz de Programação</h1>
      {quizState.gameStage === 'Start' && <Welcome />}
      {quizState.gameStage === 'Category' && <PickCategory />}
      {quizState.gameStage === 'Playing' && <Question />}
      {quizState.gameStage === 'End' && <GameOver />}
    </div>
  )
}

export default App
