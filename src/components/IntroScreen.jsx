import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import '../styles/intro.css'

export default function IntroScreen(){
  const navigate = useNavigate()
  const categories = [
    { icon: 'M', label: 'Marketing BBA' },
    { icon: 'S', label: 'Sports' },
    { icon: 'N', label: 'Nepal Affairs' },
    { icon: 'P', label: 'Politics' },
    { icon: 'R', label: 'Riddles' }
  ]

  return (
    <div className="intro-root">
      <motion.div className="spotlight" animate={{opacity:[0.68,1,0.68]}} transition={{duration:3.2, repeat:Infinity}} />
      <div className="particle-field" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>

      <div className="intro-content">
        <h1 className="title">
          <span className="type">QUIZ TIME!</span>
      
        </h1>

        <motion.p className="subtitle" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.7}}>
          Test Your Knowledge
        </motion.p>

        <motion.div
          className="badges"
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: 1.9 } } }}
        >
          {categories.map(category => (
            <motion.div
              className="badge"
              key={category.label}
              variants={{
                hidden: { opacity: 0, scale: 0.72, y: 12 },
                show: { opacity: 1, scale: 1, y: 0 }
              }}
            >
              <span>{category.icon}</span>
              {category.label}
            </motion.div>
          ))}
        </motion.div>

        <motion.button
          className="start-btn glow-btn"
          whileHover={{scale:1.03}}
          whileTap={{scale:0.98}}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.45 }}
          onClick={()=>navigate('/presenters')}
        >
          Start Quiz
        </motion.button>
      </div>
    </div>
  )
}
