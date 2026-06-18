import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import MOVIE_ROUNDS from '../data/movieRounds'
import '../styles/guessMovie.css'

const ROUND_SECONDS = 12

export default function GuessMovieScreen(){
  const [index, setIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState(ROUND_SECONDS)
  const [revealed, setRevealed] = useState(false)
  const [complete, setComplete] = useState(false)

  const round = MOVIE_ROUNDS[index]

  useEffect(() => {
    if(complete || revealed) return undefined

    const timer = window.setInterval(() => {
      setTimeLeft(current => {
        if(current <= 1){
          window.clearInterval(timer)
          setRevealed(true)
          return 0
        }

        return current - 1
      })
    }, 1000)

    return () => window.clearInterval(timer)
  }, [index, revealed, complete])

  useEffect(() => {
    if(!complete) return undefined

    const end = Date.now() + 5000
    const fire = window.setInterval(() => {
      confetti({
        particleCount: 90,
        spread: 100,
        startVelocity: 46,
        origin: { x: Math.random(), y: Math.random() * 0.55 }
      })
    }, 220)

    const stop = window.setTimeout(() => window.clearInterval(fire), Math.max(0, end - Date.now()))

    return () => {
      window.clearInterval(fire)
      window.clearTimeout(stop)
    }
  }, [complete])

  function resetRound(nextIndex){
    setIndex(nextIndex)
    setTimeLeft(ROUND_SECONDS)
    setRevealed(false)
  }

  function goBack(){
    if(index === 0) return
    resetRound(index - 1)
  }

  function goNext(){
    if(!revealed) return

    if(index === MOVIE_ROUNDS.length - 1){
      setComplete(true)
      return
    }

    resetRound(index + 1)
  }

  if(complete){
    return (
      <div className="movie-root final-movie-root">
        <motion.div
          className="final-movie-panel"
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          <span className="eyebrow">Guess the Movie Complete</span>
          <h1>Thank you for your patience</h1>
          <p>You have completed all the movie guessing rounds.</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="movie-root">
      <div className="movie-panel">
        <div className="movie-topbar">
          <div>
            <span className="eyebrow">Bonus Round</span>
            <h1>Guess the Movie</h1>
          </div>

          <div className={`movie-timer ${timeLeft <= 5 ? 'danger' : ''}`}>
            <span>{timeLeft}</span>
            sec
          </div>
        </div>

        <div className="movie-progress">Movie {index + 1} of {MOVIE_ROUNDS.length}</div>

        <AnimatePresence mode="wait">
          <motion.div
            className="movie-card"
            key={round.id}
            initial={{ opacity: 0, x: 38 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -38 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <img src={round.image} alt={`Movie clue ${index + 1}`} className="movie-clue" />

            <div className="movie-answer-area">
              {revealed ? (
                <motion.div
                  className="movie-answer"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 'auto', opacity: 1 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                  <span>The answer is</span>
                  <strong>{round.answer}</strong>
                </motion.div>
              ) : (
                <div className="movie-waiting">Answer reveals when the timer reaches zero.</div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="movie-controls">
          <button className="movie-nav" onClick={goBack} disabled={index === 0} type="button">
            Back
          </button>

          <button className="movie-nav primary" onClick={goNext} disabled={!revealed} type="button">
            {index === MOVIE_ROUNDS.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  )
}
