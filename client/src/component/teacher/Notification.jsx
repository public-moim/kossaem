import React from 'react'
import { AiOutlineCloseCircle} from "react-icons/ai";
function Notification() {
  return (
    <div className='box1'>
      <div className="secondary-button">Delete all</div>
      <div className="chatRequest">
        <p className="msg">Syahri has requested to open the practice room</p>
        <div className="accept">
          <p className="time">12:00</p>
          <div className="acceptRequest">Get this request</div>
        </div>

        
      </div>

      <div className="chatRequest">
        <p className="msg">Syahri has requested to open the practice room</p>
        <div className="accept">
          <p className="time">12:00</p>
          <div className="acceptRequest">Get this request</div>
        </div>

        
      </div>
    </div>
  )
}

export default Notification
