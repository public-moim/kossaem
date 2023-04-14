import React, {useState} from 'react'

function Chat() {
  const [rooms, setRooms] = useState(0)

  return (
    <div className='content chat'>
      <div className="bodyTitle">
        You don't have any active room chat
      </div>
      <div className="button-primary">
        Request for practice room
      </div>
      <p className="light-text">Exchange <span className="orange-text">10P</span> for one day chat!</p>

    </div>
  )
}

export default Chat
