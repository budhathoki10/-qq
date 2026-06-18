import React, { useContext, useMemo, useEffect, useState } from 'react'
import { QuestionsContext } from '../context/QuestionsContext'
import { useNavigate } from 'react-router-dom'
import confetti from 'canvas-confetti'
import { motion } from 'framer-motion'
import '../styles/result.css'

export default function ResultScreen(){
  const { questions, score, perQuestionFirstCorrect } = useContext(QuestionsContext)
  const navigate = useNavigate()
  const [count, setCount] = useState(0)

  useEffect(()=>{
    let cur = 0
    const interval = window.setInterval(()=>{
      cur++
      if(cur > score) {
        window.clearInterval(interval)
        setCount(score)
      }
      else setCount(cur)
    }, 40)

    if(score>=20){
      confetti({ particleCount: 200, spread: 160, origin: { y: 0.62 } })
    }

    return () => window.clearInterval(interval)
  },[score])

  const byCategory = useMemo(()=>{
    const map = {}
    questions.forEach((q,i)=>{
      if(!map[q.category]) map[q.category]={correct:0,total:0}
      map[q.category].total++
      if(perQuestionFirstCorrect[i]) map[q.category].correct++
    })
    return map
  },[questions, perQuestionFirstCorrect])

  return (
    <div className="result-root">
      <motion.div
        className="result-panel"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <span className="eyebrow">Quiz Complete</span>
        <h2>Your Score</h2>
        <div className="score">{count} / {questions.length}</div>

        <div className="breakdown">
          {Object.keys(byCategory).map((cat, index)=> {
            const category = byCategory[cat]
            const width = `${(category.correct / category.total) * 100}%`

            return (
              <motion.div
                className="cat-row"
                key={cat}
                initial={{ opacity: 0, x: -18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.08 }}
              >
                <div className="cat-name">{cat}</div>
                <div className="cat-bar">
                  <motion.div
                    className="fill"
                    initial={{ width: 0 }}
                    animate={{ width }}
                    transition={{ delay: 0.32 + index * 0.08, duration: 0.65, ease: 'easeOut' }}
                  />
                </div>
                <div className="cat-score">{category.correct}/{category.total}</div>
              </motion.div>
            )
          })}
        </div>

        <div className="result-actions">
          <button onClick={()=>navigate('/guess-movie')} className="play-again">Guess the Movie</button>
        </div>
      </motion.div>
    </div>
  )
}
