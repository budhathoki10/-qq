import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QuestionsProvider } from './context/QuestionsContext'
import IntroScreen from './components/IntroScreen'
import PresenterIntro from './components/PresenterIntro'
import QuizScreen from './components/QuizScreen'
import ResultScreen from './components/ResultScreen'

export default function App(){
  return (
    <BrowserRouter>
      <QuestionsProvider>
        <Routes>
          <Route path='/' element={<IntroScreen/>} />
          <Route path='/presenters' element={<PresenterIntro/>} />
          <Route path='/quiz' element={<QuizScreen/>} />
          <Route path='/results' element={<ResultScreen/>} />
        </Routes>
      </QuestionsProvider>
    </BrowserRouter>
  )
}
