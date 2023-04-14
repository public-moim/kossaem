import React, { useState, useEffect } from 'react'
import { RxEnter } from "react-icons/rx";
import { Link } from 'react-router-dom';
import axios from 'axios';
import Chart1 from './Chart1';

import * as generate from './generateData'
import Chart2 from './Chart2';

function Dashboard() {
  const [record, setRecord] = useState()
  const [data, setData] = useState()
  const [answerRate, setAnswerRate] = useState(0)
  const [chartData, setChartData] =useState()
  const [correctRate, setCorrectRate] = useState()
  const [attendance, setAttendance] = useState()
  const [chartAttendance, setChartAttendance] = useState()
  const [attendanceRate,setRate] = useState()
  const [radar,setRadar]= useState()
  const user_id = JSON.parse(localStorage.getItem('user')).id
  const [active, setActive] =useState('reading')
  //generate array for chart
  const today = new Date()
  const last_month = new Date()
  last_month.setMonth(today.getMonth() - 1)
  const length = (today.getTime() - last_month.getTime()+1) / (1000 * 3600 * 24)
  const getDays = (length, last_month) => {
    let dates = []
    let date = last_month

    for (var i = 0; i < length; i++) {

      dates.push(
        new Date(date)
      )
      date.setDate(date.getDate() + 1)


    }
    return dates
  }

  const dates = getDays(length, last_month)

  const fetch = async () => {
    const res = await axios.get(`/api/quiz/record/${user_id}`)
    const resAttendance = await axios.get(`/api/auth/login/${user_id}`)

    let correct_answer = 0
    setRecord(res.data.length)
    setData(res.data)
    setAttendance(resAttendance.data)
    res.data.forEach(function (item) {
      if (item.result === 'correct') {
        correct_answer = correct_answer + 1
      }
    })
    

    if(res.data.length){
      setAnswerRate(Math.ceil(correct_answer / res.data.length * 100))
    }
    else{
      setAnswerRate(0)
    }

  }


  useEffect(() => {
    fetch()
    

  }, [])

  useEffect(()=> {
    let chart_data=[]
    chart_data=generate.frequencyData(length,record,data,dates)

    const correctRateData=generate.correctRate(length,record,data,dates,chart_data)

    //console.log(generate.radarData(data,'reading',record))

    if(active === 'reading'){
      setRadar(generate.radarData(data,'reading',record))
    } else if(active === 'listening'){
      setRadar(generate.radarData(data,'listening',record))
    }

    

    setChartData(chart_data)
    setCorrectRate(correctRateData)
    

  },[data,active])

  useEffect(()=> {
    
    if(attendance){
      setChartAttendance(generate.attendanceData(attendance, new Date().getFullYear())) 
      const tes=generate.attendanceData(attendance, new Date().getFullYear())
    setRate(tes[3].quiz)
    
    }

  
  },[attendance])

  

  return (
    <div className="dashboard content">
      <div className="left">
        <div className="summary">
          <div className="dbBox">
            <div className='dbBox-name'>Questions answered <span className='dbNumber'>{record}</span></div>
            <div className="smallgraph"><Chart1 chartData={chartData} /></div>

          </div>

          <div className="dbBox">
            <div className='dbBox-name'>Correct answer rate <span className='dbNumber'>{answerRate}%</span></div>
            <div className="smallgraph"><Chart1 chartData={correctRate} /></div>

          </div>

          <div className="dbBox">
            <div className='dbBox-name'>Attendance rate <span className='dbNumber'>{attendanceRate}%</span></div>
            <div className="smallgraph"><Chart1 chartData={chartAttendance} /></div>

          </div>
        </div>

        <div className="graphContainer dbBox">
          <div className="flex">
            <div className={active==='reading' ? "secondary-button active" : "secondary-button"} onClick={()=>setActive('reading')}>
              Reading
            </div>
            <div className={active==='listening' ? "secondary-button active" : "secondary-button"} onClick={()=> setActive('listening')}>
              Listening
            </div>
          </div>
          <div className="radar-chart">
          <Chart2 chartData={radar}/>
          </div>
          
          
          
        </div>
      </div>

      <div className="right">
        <div className="dbBox activeChat">
          <div className="title">

            <p>Available teacher</p>
            {/*<Link className="icon" to='/student/chat'>

              <RxEnter />

            </Link>*/}


          </div>



          <div className="chatProfile">
            <div className="profPict-small"><span className='activeState'></span></div>
            <div className="userName">Ssaem-1</div>
            <div className="secondary-button">Say Hi</div>
          </div>
          <div className="chatProfile">
            <div className="profPict-small"><span className='activeState'></span></div>
            <div className="userName">Ssaem-1</div>
            <div className="secondary-button">Say Hi</div>
          </div>
        </div>

      </div>


    </div>
  )
}

export default Dashboard
