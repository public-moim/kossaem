import React, { useEffect, useState } from 'react'
import { AiOutlineSearch} from "react-icons/ai";
import './Record.css'


import Table from '../share/Table';
import axios from 'axios';

let search=''
function Record({setActive, setQuestions}) {
  const [data, setData] = useState([])
  const params =  JSON.parse(localStorage.getItem('user')).id
  var tempData = [...data]
  const [filtered, setFiltered]= useState([])

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/quiz/record/${params}`)
        
       setData(res.data)
       setFiltered(res.data)
      } catch (error) {
        console.log(error)
      }
       
       
    }

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
  const res = await axios.get(`/api/quiz/record/${params}?category=${search}`)

}

  
  return (
    <div className='content record'>
      <div className="search-boxContainer">
      <div className="search-box">

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
  )
}

export default Record
