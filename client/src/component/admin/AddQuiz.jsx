import React, {useState,useRef,useEffect} from 'react'
import './Admin.css'
import { AiOutlineCloseCircle, AiOutlinePlus,AiOutlineUpload } from "react-icons/ai";
import axios from 'axios';
import S3 from 'react-aws-s3'
import data from '../share/data';
// installed using npm install buffer --save
window.Buffer = window.Buffer || require("buffer").Buffer;

function AddQuiz() {
    const [input, setInput]= useState({
        question: '', 
        answer:'',
        category:'', 
        level:'', 
        instructions: ''
        
    })

    const [options, setOptions] = useState([])
    const optionsRef = useRef() 

    const [file,setFile] = useState()

    const config = {
        bucketName: process.env.REACT_APP_BUCKET_NAME,
        region: process.env.REACT_APP_REGION,
        accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
    }

    const formHandler = (e)=> {
        const fieldName = e.target.name;

        setInput(prevValue => ({
            ...prevValue,
            [fieldName]:e.target.value,
            options:options

        }))
    }

   const addOption = () => {
    
    setOptions(prevValue => ([
        ...prevValue,optionsRef.current.value
    ]))

    
   }

   const handleClose = (idx) => {
    const newOptions = options.filter((item,index)=> index !== idx)
    
    setOptions(newOptions)

    
    
   }

   useEffect(()=> {
    optionsRef.current.value=''

   },[options])

   const uploadFile = async () => {
    const ReactS3Client = new S3(config)
    const newFileName = file.name.split(' ').join('_');
    console.log(newFileName)
    try {
        ReactS3Client
    .uploadFile(file, newFileName)
    .then(data =>  setInput(prevValue => ({
        ...prevValue,
        mediaLink: data.location
    })))
       
    } catch (error) {
        console.log(error)
    }
  
   }

   const submitHandler = async (e) => {
    e.preventDefault()
    const res = await axios.post('/api/quiz/register', input)
    console.log(res)
    

   window.alert('Succces')
    
    setInput({
        question: '', 
        answer:'',
        category:'', 
        level:'', 
        instructions: ''
    })

    setOptions([])

    setFile()
   }

   

  return (
    <div className="content">
<div className='addQuiz'>
        <div className="bodyTitle">
            Add Quiz
          </div>
        <form>

            <select name='instructions' className='addQuestion' value={input.instructions} onChange={formHandler}>
                <option value = '' disabled defaultValue>Select instruction</option>
                <option value = '다음은 무엇에 대한 글인지 고르십시오'>다음은 무엇에 대한 글인지 고르십시오</option>
                <option value='(       )에 들어갈 가장 알맞은 것을 고르십시오'>(&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)에 들어갈 가장 알맞은 것을 고르십시오</option>
                <option value='다음 밑줄 친 부분과 의미가 비슷한 것을 고르십시오'>다음 밑줄 친 부분과 의미가 비슷한 것을 고르십시오</option>
                <option value='다음을 듣고 알맞은 그림을 고르십시오'>다음을 듣고 알맞은 그림을 고르십시오</option>
                <option value='다음을 듣고 일치하는 것을 고르십시오'>다음을 듣고 일치하는 것을 고르십시오</option>
            </select>

            

            <div className="addQuestionContainer">
            <textarea name='question' placeholder='Add question'className='addQuestion' value={input.question} onChange={formHandler}>
            </textarea>
            </div>
            

            <div className="addAnswer">
                <div className="answerOption">
                    <input placeholder='Answer options'  ref={optionsRef}></input>
                    <div className="secondary-button" onClick={addOption}><AiOutlinePlus/></div>
                </div>

                <div className="optionList">
                    {options.map((item, idx)=> {
                        return(
                            <div className="item" key={idx}>{item}  <span className='closeBtn' onClick={(e)=>handleClose(idx)} ><AiOutlineCloseCircle/></span></div>        
                        )
                    })}
                    
                    
                </div>
            </div>

            {/* <input type="text" placeholder='Correct Answer' name='answer' onChange={formHandler} value={input.answer}/> */}
            <select name='answer' onChange={formHandler} value={input.answer}>
                <option value='' disabled defaultValue >Select correct answer</option>
                <option value={`${options[0]}`}>{options[0]}</option>
                <option value={`${options[1]}`}>{options[1]}</option>
                <option value={`${options[2]}`}>{options[2]}</option>
                <option value={`${options[3]}`}>{options[3]}</option>
            </select>

            <select name='category' onChange={formHandler} value={input.category} >
                <option value='' disabled defaultValue >Select category</option>
                <option value='reading'>Reading</option>
                <option value='listening'>Listening</option>
            </select>
            
            <select name='level' onChange={formHandler} value={input.level}>
                <option value='' disabled defaultValue >Select level</option>
                <option value='1'> Level 1</option>
                <option value='2'> Level 2</option>
                <option value='3'> Level 3</option>
                <option value='4'> Level 4</option>
                <option value='5'> Level 5</option>
                <option value='6'> Level 6</option>

            </select>
            
            
            <div className="media" >
            <label>Add media</label>
            <div className="mediaUpload flex">
            <input type="file" name='mediaLink' onChange={(e)=> setFile(e.target.files[0])} />
            <div className="icon" onClick={uploadFile}><AiOutlineUpload/></div>
            </div>
            
            </div>
            

            <button className='button-primary' onClick={submitHandler}>Add</button>
            
        </form>
      
    </div>
    </div>
    
  )
}

export default AddQuiz
