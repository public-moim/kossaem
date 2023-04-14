import React, {useState,useRef,useEffect} from 'react'
import { AiOutlineCloseCircle, AiOutlinePlus,AiOutlineUpload } from "react-icons/ai";
import axios from 'axios';
import S3 from 'react-aws-s3'
function EditQuiz({ questions, handleEdit }) {
    const [input, setInput] = useState({
        question: questions.question,
        answer: questions.answer,
        category: questions.category,
        level: questions.type,
        instructions: questions.instructions

    })
    const [file, setFile] = useState()
    const formHandler = (e) => {
        const fieldName = e.target.name;

        setInput(prevValue => ({
            ...prevValue,
            [fieldName]: e.target.value,
            options: options

        }))

        
    }

    const [options, setOptions] = useState([questions.options][0])

    const optionsRef = useRef()
    const addOption = (e) => {
    e.preventDefault()
        setOptions(prevValue => ([
            ...prevValue, optionsRef.current.value
        ]))

        


    }

    const handleClose = (idx) => {
        const newOptions = options.filter((item, index) => index !== idx)

        setOptions(newOptions)

    }

    const config = {
        bucketName: process.env.REACT_APP_BUCKET_NAME,
        region: process.env.REACT_APP_REGION,
        accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
    }

    const uploadFile = async () => {
        const ReactS3Client = new S3(config)
        const newFileName = file.name.split(' ').join('_');

        try {
            ReactS3Client
                .uploadFile(file, newFileName)
                .then(data => setInput(prevValue => ({
                    ...prevValue,
                    mediaLink: data.location
                })))

        } catch (error) {
            console.log(error)
        }

    }
    useEffect(() => {
        optionsRef.current.value = ''
        setInput(prevValue => ({
            ...prevValue,

            options: options,


        }))
    }, [options])



    const submitHandler = async (e) => {
        e.preventDefault()

        if (!Object.keys(input).includes('mediaLink')) {
            let newInput
            newInput = { ...input, mediaLink: questions.filepath }
            

            const res = await axios.put(`/api/quiz/register/${questions.id}`, newInput)
            if (res.status ===200){
                window.alert('Succces')
                window.location.reload()
            } else if(res.status !==200){
                window.alert('Failed',res.status)
                window.location.reload()
            }


        }
        else if (Object.keys(input).includes('mediaLink')) {
            const res = await axios.put(`/api/quiz/register/${questions.id}`, input)
            if (res.status ===200){
                window.alert('Succces')
                window.location.reload()
            } else if(res.status !==200){
                window.alert('Failed',res.status)
                window.location.reload()
            }

        }
        

        setInput({
            question: '',
            answer: '',
            category: '',
            level: '',
            instructions: ''
        })

        setOptions([])

        setFile()
    }

   

     

  return (
      <div className='editContainer'>
          <div className="close-form icon" onClick={handleEdit} ><AiOutlineCloseCircle /></div>
          <form>

              <select name='instructions' className='addQuestion' value={input.instructions} onChange={formHandler}>
                  <option value='' disabled selecte>Select instruction</option>
                  <option value='다음은 무엇에 대한 글인지 고르십시오'>다음은 무엇에 대한 글인지 고르십시오</option>
                  <option value='(       )에 들어갈 가장 알맞은 것을 고르십시오'>(&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)에 들어갈 가장 알맞은 것을 고르십시오</option>
                  <option value='다음 밑줄 친 부분과 의미가 비슷한 것을 고르십시오'>다음 밑줄 친 부분과 의미가 비슷한 것을 고르십시오</option>
                  <option value='다음을 듣고 알맞은 그림을 고르십시오'>다음을 듣고 알맞은 그림을 고르십시오</option>
                  <option value='다음을 듣고 일치하는 것을 고르십시오'>다음을 듣고 일치하는 것을 고르십시오</option>
              </select>



              <div className="addQuestionContainer">
                  <textarea name='question' placeholder='Add question' className='addQuestion' value={input.question} onChange={formHandler}>
                  </textarea>
              </div>


              <div className="addAnswer">
                  <div className="answerOption">
                      
                          <input placeholder='Answer options' ref={optionsRef}></input>
                      
                      
                      <div className="secondary-button" onClick={addOption}><AiOutlinePlus /></div>
                  </div>

                  <div className="optionList">
                      {options.map((item, idx) => {
                          return (
                              <div className="item" key={idx}>{item}  <span className='closeBtn' onClick={(e) => handleClose(idx)} ><AiOutlineCloseCircle /></span></div>
                          )
                      })}


                  </div>
              </div>

              {/* <input type="text" placeholder='Correct Answer' name='answer' onChange={formHandler} value={input.answer}/> */}
              <select name='answer' onChange={formHandler} value={input.answer}>
                  <option value='' disabled selected >Select correct answer</option>
                  <option value={`${options[0]}`}>{options[0]}</option>
                  <option value={`${options[1]}`}>{options[1]}</option>
                  <option value={`${options[2]}`}>{options[2]}</option>
                  <option value={`${options[3]}`}>{options[3]}</option>
              </select>

              <select name='category' onChange={formHandler} value={input.category} >
                  <option value='' disabled selected >Select category</option>
                  <option value='reading'>Reading</option>
                  <option value='listening'>Listening</option>
              </select>

              <select name='level' onChange={formHandler} value={input.level}>
                  <option value='' disabled selected >Select level</option>
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
                      <input type="file" name='mediaLink' onChange={(e) => setFile(e.target.files[0])} />
                      <div className="icon" onClick={uploadFile}><AiOutlineUpload /></div>
                  </div>

              </div>


              <button className='button-primary' onClick={submitHandler}>Edit</button>

          </form>
      </div>
  )
}

export default EditQuiz
