import React from 'react'
import { motion } from 'framer-motion'

export default function ProgressBar({ current, total }){
  const percent = total > 0 ? (current / total) * 100 : 0

  return (
    <div className="progress-wrap" aria-label={`Question ${current} of ${total}`}>
      <div className="progress-track">
        <motion.div
          className="progress-fill"
          initial={false}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}
