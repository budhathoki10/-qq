import React, { useContext, useState, useMemo } from 'react'
import { QuestionsContext } from '../context/QuestionsContext'
import OptionButton from './OptionButton'
import { motion, AnimatePresence } from 'framer-motion'
import '../styles/quiz.css'
import { useNavigate } from 'react-router-dom'
import ProgressBar from './ProgressBar'

function shuffleQuestionOptions(questions){
  return questions.map(question => {
    const options = question.options.map((text, originalIndex) => ({ text, originalIndex }))

    for(let i = options.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i + 1))
      const temp = options[i]
      options[i] = options[j]
      options[j] = temp
    }

    return {
      ...question,
      options: options.map(option => option.text),
      correctIndex: options.findIndex(option => option.originalIndex === question.correctIndex)
    }
  })
}

function createQuestionProgress(){
  return {
    selectedStates: ['neutral','neutral','neutral','neutral'],
    locked: false,
    firstAttemptDone: false,
    wrongAttempts: 0,
    showAnswerHint: false
  }
}

export default function QuizScreen(){
  const { questions, score, setScore, perQuestionFirstCorrect, setPerQuestionFirstCorrect } = useContext(QuestionsContext)
  const shuffledQuestions = useMemo(() => shuffleQuestionOptions(questions), [questions])
  const [index, setIndex] = useState(0)
  const [questionProgress, setQuestionProgress] = useState(() => questions.map(() => createQuestionProgress()))
  const navigate = useNavigate()

  if(!shuffledQuestions || shuffledQuestions.length===0) return <div>Loading...</div>

  const q = shuffledQuestions[index]
  const currentProgress = questionProgress[index] || createQuestionProgress()
  const { selectedStates, locked, wrongAttempts, showAnswerHint } = currentProgress

  function updateQuestionProgress(questionIndex, updater){
    setQuestionProgress(prev => {
      const copy = [...prev]
      copy[questionIndex] = updater(copy[questionIndex] || createQuestionProgress())
      return copy
    })
  }

  function goNext(){
    if(index === shuffledQuestions.length - 1){
      navigate('/results')
      return
    }

    setIndex(idx => idx + 1)
  }

  function jumpToQuestion(questionIndex){
    setIndex(questionIndex)
  }

  function goBack(){
    setIndex(currentIndex => Math.max(0, currentIndex - 1))
  }

  function handleOptionClick(i){
    if(locked || selectedStates[i] === 'wrong') return

    const isCorrect = i === q.correctIndex

    if(isCorrect){
      if(wrongAttempts < 2 && !perQuestionFirstCorrect[index]){
        setPerQuestionFirstCorrect(prev => {
          const copy = [...prev]
          copy[index] = true
          return copy
        })
        setScore(s=>s+1)
      }

      const next = ['neutral','neutral','neutral','neutral']
      next[i] = 'correct'
      updateQuestionProgress(index, progress => ({
        ...progress,
        selectedStates: next,
        locked: true,
        firstAttemptDone: true,
        showAnswerHint: false
      }))
    } else {
      
      const nextWrongAttempts = wrongAttempts + 1
      const nextStates = [...selectedStates]
      nextStates[i] = 'wrong'

      updateQuestionProgress(index, progress => {
        return {
          ...progress,
          selectedStates: nextStates,
          firstAttemptDone: true,
          wrongAttempts: nextWrongAttempts,
          showAnswerHint: nextWrongAttempts >= 2
        }
      })
    }
  }

  return (
    <div className="quiz-root">
      <div className="topbar">
        <div className="cat">
          <span className="cat-icon">{q.icon}</span>
          {q.category}
        </div>
        <div className="progress">Question {index + 1} of {shuffledQuestions.length}</div>
      </div>

      <ProgressBar current={index + 1} total={shuffledQuestions.length} />

      <AnimatePresence mode="wait">
        <motion.div
          className="question-stage"
          key={q.id}
          initial={{ x: 44, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -44, opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <motion.div
            className="question"
            initial={{ y: -22, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.42 }}
          >
            {q.question}
          </motion.div>

          <div className="options-grid">
            {q.options.map((opt, i)=> (
              <OptionButton
                key={`${q.id}-${i}`}
                label={String.fromCharCode(65 + i)}
                text={opt}
                state={selectedStates[i]}
                disabled={locked || selectedStates[i] === 'wrong'}
                delay={0.22 + i * 0.08}
                showAnswerMark={showAnswerHint && i === q.correctIndex}
                onClick={()=>handleOptionClick(i)}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {locked ? (
          <motion.div
            className="correct-indicator"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
          >
            Correct!
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="quiz-footer">
        <button className="nav-control" onClick={goBack} disabled={index === 0} type="button">
          Back
        </button>

        <div className="score-chip">Score: {score}</div>

        <button className="nav-control primary" onClick={goNext} type="button">
          {index === shuffledQuestions.length - 1 ? 'Finish' : 'Next'}
        </button>
      </div>

      <div className="question-road" aria-label="Question roadmap">
        <div className="road-head">
          <div>
            <div className="road-label">Question Road</div>
            <div className="road-subtitle">Jump directly to any question</div>
          </div>
      
        </div>

        <div className="road-list">
          {shuffledQuestions.map((question, questionIndex) => {
            const progress = questionProgress[questionIndex] || createQuestionProgress()
            const isCurrent = questionIndex === index
            const isAnswered = progress.locked
            const isMovieRound = question.category === 'Guess the Movie'

            return (
              <button
                key={question.id}
                className={`road-dot ${isCurrent ? 'current' : ''} ${isAnswered ? 'answered' : ''} ${isMovieRound ? 'movie-round' : ''}`}
                onClick={() => jumpToQuestion(questionIndex)}
                title={`${question.category} - Question ${questionIndex + 1}`}
                type="button"
              >
                {questionIndex + 1}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
