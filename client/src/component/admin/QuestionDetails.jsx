import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AiOutlineEdit , AiOutlineDelete} from "react-icons/ai";
import { MdOutlinePlaylistAddCheck } from "react-icons/md";
import ReactPlayer from 'react-player';
import { useNavigate, useParams } from 'react-router-dom';
import EditQuiz from './EditQuiz';
function QuestionDetails() {
  const [questions,setQuestions] = useState()
  const [popUp, setPopup] = useState(false)
const params = useParams()
const navigate = useNavigate()


const fetchData = async(id) =>{
  try {
    const res = await axios.get(`/api/quiz/admin/register?id=${id}`)
    setQuestions(res.data[0])
    
  } catch (error) {
    console.log(error)
  }
}

useEffect(()=> {
fetchData(parseInt(params.id))
},[])

const handleDelete = async() => {
  const res = await axios.delete(`/api/quiz/register/${params.id}`)
  
  window.alert('Deleted')
  navigate('/admin/list')
  
}

const handleList = ()=> {
  navigate('/admin/list')
}

const handleEdit = () => {
setPopup(!popUp)
}
  
  return (
    <div className="content">
<div className='addQuiz detailsContainer'>
      {
        ! questions
        ?
        <div className="details"></div>
        :
<div className="details">
<p className='subheader'> Instruction</p>
{questions.instructions}
<p className='subheader'> Question</p>
{questions.question}
<p className='subheader'> Options</p>
{questions.options.map((item,idx)=> (
  <span key={idx} style={{marginRight:'5px'}}>{item + ';'}</span>
))}

<p className='subheader'> Answer</p>
{questions.answer}

<p className='subheader'> Category</p>
{questions.category}
<p className='subheader'> Level</p>
{questions.level}

<p className='subheader'> Media</p>
<div className="react-player">
<ReactPlayer
url={questions.filepath}
controls
height='100%'
width='100%'
/>
</div>

        </div>
      }
        

        <div className="operations">
          <p className={popUp ? 'icon red' :'icon'} onClick={handleEdit}><span ><AiOutlineEdit/></span>{popUp? 'Close Edit' : 'Edit'}</p>
          <p className='icon' onClick={handleDelete}><span ><AiOutlineDelete/></span>Delete</p>
          <p className='icon' onClick={handleList} ><span className='icon md'><MdOutlinePlaylistAddCheck/></span>List</p>
        </div>

        {popUp
        ?
        <div className="absolute">
<EditQuiz questions={questions} handleEdit={handleEdit}/>
        </div>
      
    :
    ""}
      
      
    </div>
    </div>
    
  )
}

export default QuestionDetails
