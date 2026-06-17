import React, { createContext, useState, useCallback } from 'react'
import QUESTIONS from '../data/questions'

export const QuestionsContext = createContext(null)

export function QuestionsProvider({children}){
  const [questions] = useState(QUESTIONS)
  const [score, setScore] = useState(0)
  const [perQuestionFirstCorrect, setPerQuestionFirstCorrect] = useState(() => Array(QUESTIONS.length).fill(false))

  const reset = useCallback(()=>{
    setScore(0)
    setPerQuestionFirstCorrect(Array(QUESTIONS.length).fill(false))
  }, [])

  return (
    <QuestionsContext.Provider value={{questions, score, setScore, perQuestionFirstCorrect, setPerQuestionFirstCorrect, reset}}>
      {children}
    </QuestionsContext.Provider>
  )
}
