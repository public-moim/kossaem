import React, { useState, useEffect } from 'react'
//import data from "../share/data";
import Table from './Table';
import { AiOutlineSearch} from "react-icons/ai";
import axios from 'axios'
let search=''
function ListQuiz({setActive, setQuestions}) {
  const [data, setData] = useState([])
  var tempData = [...data]
  const [filtered, setFiltered]= useState([])
  
  const fetchData = async () => {
    try {
      const res = await axios.get(`/api/quiz/admin/register`)
      
     setData(res.data)
     setFiltered(res.data)
    } catch (error) {
      console.log(error)
    }
     
     
  }
  useEffect(()=>{
    

    fetchData()
    


  },[])

  const handleChange = (e) => {
     search = e.target.value.toLowerCase()
    

    var newData = [...tempData]

    newData = newData.filter((item) => {
      return item.category.toLowerCase().indexOf(search) !== -1
    })

    setFiltered(newData)
    
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    console.log(search)
    const res = await axios.get(`/api/quiz/admin/register?category=${search}`)

  }

   //useEffect(()=> {
    
  //   const newData = newData.filter(item=> item.category.toLowerCase().includes(search))
  //   setData(newData)
  //   console.log(newData)
  //   console.log(search)
  //console.log(search)
  // },[search])
  

  return (
    <div className="content">
      <div className='addQuiz'>
        <div className="bodyTitle">
              Quiz List
            </div>
        <div className="search-boxContainer">
        <div className="search-box ">
          <form onSubmit={handleSearch} className='search-flex' >
            <input placeholder='Search in category' onChange={handleChange}></input>
            <div className="icon" onClick={handleSearch}><AiOutlineSearch/></div>
          </form>
        
        </div>
        </div>

        <div className='recordBox'>
        {data.length === 0
          ?
        <div>No data</div>
      :
      <Table data={filtered} rowsPerPage={10} setActive={setActive} setQuestions={setQuestions}></Table>}


        
        </div>
      </div>
    </div>
    
  )
}

export default ListQuiz
