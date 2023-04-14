import React from 'react'
import { Link } from 'react-router-dom'
import { IoCloseSharp } from "react-icons/io5";
function Popup({pop, popUpHandler}) {
    

  return (
    <div className={pop? 'popUpContainer' : 'popUpContainer hide'}>
      <div className="popUpBox">
        {/*<div className="close" onClick={()=> popUpHandler(false)}><IoCloseSharp/></div>*/}
        
        <div className="bodyTitle">Congratulations</div>
        <p>Your account has been successfully created</p>
        <Link to='/login'><div className="button-primary">Login</div></Link>
        
      </div>
    </div>
  )
}

export default Popup
