import axios from 'axios'
import React, {useEffect, useRef, useState} from 'react'
import Dashboard from './Dashboard'
import './quiz.css'
import ReactPlayer from 'react-player'
function QuizPlay() {
  const [active, setActive] = useState('problem')
  
  const [quiz, setQuiz] = useState(true)
  const [getQuiz, setGetQuiz] = useState()
  const quizForm = useRef()
  const [quizResult, setQuizResult] = useState()

  const getRandomQuiz = async () => {
    
    
    //get random quiz 
    const res = await axios.get('/api/quiz/register')
    setGetQuiz(res.data[0])
    
    setActive('problem')
    setQuiz(!quiz)
  }
  

  const handleSubmit = async () => {
    let form= quizForm.current
    let yourAnswer = (form['radAnswer'].value)  
    let user_id = JSON.parse(localStorage.getItem('user')).id
    let quiz_id = getQuiz.id
    let quizData = {
      user_id : user_id,
      quiz_id: quiz_id,
      answer: yourAnswer
    }
    
    try {
      const res = await axios.post('/api/quiz/record',quizData)
      setQuizResult(res.data)
      if (res.data.isSuccess.includes('ok')){
        setActive('result')
      }
      
      setQuiz(!quiz)
    } catch (error) {
      console.log(error)
    }
    
  }

 


  return (
    <div className="content center">
      {
        active === 'problem'
        ?
       
        
          <div className="quizProblem">

            {
              quiz
              ?
              <div className="center">
                <div className="button-primary" onClick={getRandomQuiz}>I am ready</div>
              </div>
              :
              <div className="quizProblem box">
                <p className='instruction'> {getQuiz.instructions}</p>
            <div className="media">
              
            <ReactPlayer
            url={getQuiz.filepath}
            controls
           width='100%'
            height="50px"/>
            </div>
            <div className="questionBox">{getQuiz.question}.</div>
            <div className="answers questionBox">
              
              <form ref={quizForm}>
                <div className="option">
                <input type="radio" value={`${getQuiz.options[0]}`} name="radAnswer"  />
                <label>{getQuiz.options[0]}</label>
                </div>
                <div className="option">
                <input type="radio" value={`${getQuiz.options[1]}`} name="radAnswer" />
                <label>{getQuiz.options[1]}</label>
                </div>
                <div className="option">
                <input type="radio" value={`${getQuiz.options[2]}`} name="radAnswer" />
                <label>{getQuiz.options[2]}</label>
                </div>
                <div className="option">
                <input type="radio" value={`${getQuiz.options[3]}`} name="radAnswer" />
                <label>{getQuiz.options[3]}</label>
                </div>
                
              </form>
            </div>

              <div className="secondary-button" onClick={handleSubmit}>Submit</div>
              </div>
            }
            
          </div>
        :
        (active === 'result')
        ?
          <div className="quizResult">
            

             
            <div className="result">{quizResult.result}</div>

            <p className='light-text'>You earn <span className='orange-text'>{quizResult.point}P</span></p>

              <div className="button-primary" onClick={getRandomQuiz}>
                Take another quiz
              </div>
            
          </div>
          :
          ""

      }
      

      
      

    </div>
  )
}

export default QuizPlay
