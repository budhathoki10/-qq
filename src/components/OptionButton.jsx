import React from 'react'
import { motion } from 'framer-motion'

export default function OptionButton({ label, text, onClick, disabled, state, delay = 0, showAnswerMark = false }){
  const background = state === 'wrong'
    ? '#e63946'
    : state === 'correct'
      ? '#2ecc71'
      : 'linear-gradient(135deg, #ffffff, #eaf3ff)'

  return (
    <motion.button
      className={`option-btn ${state} ${showAnswerMark ? 'answer-hint' : ''}`}
      onClick={onClick}
      disabled={disabled}
      initial={{ scale: 0.92, opacity: 0, y: 18 }}
      animate={{
        scale: state === 'correct' ? [1, 1.04, 1] : 1,
        opacity: 1,
        y: 0,
        x: state === 'wrong' ? [0, -7, 7, -4, 4, 0] : 0,
        boxShadow: state === 'correct'
          ? '0 0 26px rgba(46, 204, 113, 0.45)'
          : '0 12px 26px rgba(57, 83, 125, 0.14)'
      }}
      whileHover={!disabled ? { y: -2 } : undefined}
      whileTap={!disabled ? { scale: 0.98 } : undefined}
      transition={{ delay, duration: state === 'wrong' ? 0.35 : 0.35 }}
      style={{ background }}
    >
      <div className="opt-label">{label}</div>
      <div className="opt-text">{text}</div>
      {showAnswerMark ? <div className="answer-mark">Answer</div> : null}
    </motion.button>
  )
}
