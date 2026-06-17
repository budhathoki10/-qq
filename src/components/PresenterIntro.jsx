import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import presentersPhoto from '../assets/sabinandrahul.png'
import '../styles/presenter.css'

export default function PresenterIntro(){
  const navigate = useNavigate()

  return (
    <div className="presenter-root">
      <motion.div
        className="presenter-heading"
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="eyebrow">Meet Your Hosts</span>
        <h2>Tonight's Quiz Presenters</h2>
      </motion.div>

      <motion.div
        className="card presenter-card presenter-feature"
        initial={{ y: 42, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.12, duration: 0.55, ease: 'easeOut' }}
      >
        <div className="presenter-photo-frame">
          <img src={presentersPhoto} alt="Sabin KC and Rahul Sirjapati" className="presenter-photo"/>
          <div className="photo-caption">DAV Semester 4</div>
        </div>

        <div className="presenter-details">
          <div className="presenter-person">
            <h3>Sabin KC</h3>
            <p className="title">Quiz Presenter</p>
          </div>
          <div className="presenter-person">
            <h3>Rahul Sirjapati</h3>
            <p className="title">Quiz Presenter</p>
          </div>
        </div>

        <p className="desc">Currently pursuing Bachelor's in DAV, Semester 4</p>
      </motion.div>

      <motion.p className="hostline" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.8}}>
        Hosted by Sabin KC &amp; Rahul Sirjapati
      </motion.p>

      <motion.button className="begin-btn" whileHover={{scale:1.02}} onClick={()=>navigate('/quiz')}>
        Let's Begin
      </motion.button>
    </div>
  )
}
