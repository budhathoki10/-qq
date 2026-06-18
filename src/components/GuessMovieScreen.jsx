import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import MOVIE_ROUNDS from '../data/movieRounds'
import '../styles/guessMovie.css'

export default function GuessMovieScreen(){
  const [started, setStarted] = useState(false)
  const [index, setIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [complete, setComplete] = useState(false)

  const round = MOVIE_ROUNDS[index]

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

  if(!started){
    return (
      <div className="movie-intro-root">
        <motion.div
          className="movie-spotlight"
          animate={{ opacity: [0.58, 1, 0.58] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <div className="movie-particles" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>

        <div className="movie-intro-content">
          <h1 className="movie-intro-title">
            <span className="movie-intro-type">Guess the Movie</span>
            <span className="movie-intro-edition">Bollywood Edition</span>
          </h1>

          <motion.button
            className="movie-start-btn glow-btn"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.05 }}
            onClick={() => setStarted(true)}
            type="button"
          >
            Get Started
          </motion.button>
        </div>
      </div>
    )
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
          <h1>Guess the Movie</h1>
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
              <AnimatePresence>
                {revealed ? (
                  <motion.div
                    className="movie-answer"
                    initial={{ width: 0, opacity: 0, y: 12 }}
                    animate={{ width: 'auto', opacity: 1, y: 0 }}
                    exit={{ width: 0, opacity: 0, y: 12 }}
                    transition={{ duration: 0.78, ease: 'easeOut' }}
                  >
                    <span>The movie name is</span>
                    <strong>{round.answer}</strong>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="movie-controls">
          <button className="movie-nav" onClick={goBack} disabled={index === 0} type="button">
            Back
          </button>

          <button className="movie-nav reveal" onClick={() => setRevealed(true)} disabled={revealed} type="button">
            Reveal Movie Name
          </button>

          <button className="movie-nav primary" onClick={goNext} disabled={!revealed} type="button">
            {index === MOVIE_ROUNDS.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  )
}
