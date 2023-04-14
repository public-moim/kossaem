import React, {useEffect} from 'react'

function TableFooter({range, setPage, page, slice}) {
    useEffect(()=> {
        if (slice.length <1 && page !==1){
            setPage(page-1)
        }
    },[slice, page, setPage])
  return (
    <div className='paginationContainer'>
        {range.map((el, index)=> (
            <button className={page === el ? 'paginationBtn active' : 'paginationBtn'}
            key={index}
            onClick={() => setPage(el)}>
                {el}
            </button>
        ))}
      
    </div>
  )
}

export default TableFooter
