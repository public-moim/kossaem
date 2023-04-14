import React, {useState} from 'react'
import './table.css'
import TableFooter from './TableFooter'
import useTable from './useTable'
import { Link } from 'react-router-dom'
function Table({data, rowsPerPage,setActive,setQuestions}) {
    const [page, setPage] = useState(1)
    const {slice, range} = useTable(data, page, rowsPerPage)
    //console.log(slice)
    const handleClick = (e) => {
        setActive(5)
        setQuestions(e)
    }
      
  return (
    <div className='recordTable'>
        <table className='table'>
            <thead>
                <tr>
                    <th  >Question</th>
                    <th>Answer</th>
                    <th>Result</th>
                    <th>Category</th>
                    <th>Level</th>
                </tr>
            </thead>
            <tbody>
                {slice.map((el, index)=> (
                    <tr key={index}>
                        <td >{el.question} </td>
                        <td style={{textAlign:'center'}}>{el.youranswer}</td>
                        <td style={{textAlign:'center'}}>{el.result}</td>
                        <td style={{textAlign:'center' } }>{el.category}</td>
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
