import React, {useState} from 'react'
import '../share/table.css'
import TableFooter from '../share/TableFooter'
import useTable from '../share/useTable'
import { Link, Navigate, useNavigate } from 'react-router-dom'
function Table({data, rowsPerPage,setActive,setQuestions}) {
    const [page, setPage] = useState(1)
    const {slice, range} = useTable(data, page, rowsPerPage)
    const navigate = useNavigate();

    const handleClick = (e) => {
        //setActive(3)
       // setQuestions(e)
        navigate(`/admin/quiz/${e.id}`)        
    }
      
  return (
    <div className='recordTable'>
        <table className='table'>
            <thead>
                <tr>
                    <th>Question</th>
                    <th>Answer</th>
                    
                    <th>Category</th>
                    <th>Level</th>
                </tr>
            </thead>
            <tbody>
                {slice.map((el,idx)=> (
                    <tr key={idx}>
                       <td onClick={(e)=> handleClick(el)} className='toDetails' >{el.question} </td>
                        <td style={{textAlign:'center'}}>{el.answer}</td>
                        
                        <td style={{textAlign:'center'}}>{el.category}</td>
                        <td style={{textAlign:'center'}}>{el.type}</td>
                    </tr>
                ))}

            </tbody>
        </table>
        <div className="footer">
        <TableFooter  range={range} slice={slice} setPage={setPage} page={page}/>
        </div>
        
      
    </div>
  )
}

export default Table
