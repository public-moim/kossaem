import React from 'react'
import './LandingPage.css'
import bg from '../bg-1.png'
import { Link } from 'react-router-dom'

function LandingPage() {
  return (
    <div className='landingContainer' >
      <div className="header">
      Best Choice to 
        Learn and Test 
        your Korean Skill
      </div>
      <p className='slogan'>Solve <span className='orange-text'>Quiz</span> and Earn <span className='orange-text'>Points</span></p>
      <div className="flex">
      <Link to='/signup/student'><div className="button-primary">Get Started </div></Link>
      <Link className='link' to='/signup/teacher'><div className="button-transparent">Become a Teacher </div></Link>
    
      </div>
      
    </div>
  )
}

export default LandingPage
