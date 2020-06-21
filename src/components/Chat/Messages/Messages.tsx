import React from 'react'

import socket from '../../../socket'
import Message from './Message/Message'

import './Messages.scss'

import { TMessages, TMessage } from '../../../types/types'

type Props = {
  messages: TMessages
  userName: string
  roomId: string

  addMessage: (newMsg: TMessage) => void
}

const Messages: React.FC<Props> = ({ messages, userName, roomId, addMessage }) => {

  const [messageValue, setMessageValue] = React.useState('')
  const messagesRef = React.useRef<HTMLDivElement>(null)


  React.useEffect(() => {
    if (messagesRef.current !== null) {
      messagesRef.current.scrollTo(0, 99999)
    }
  }, [messages])

  const handleChange = (value: string) => {
    setMessageValue(value)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.keyCode === 13) {
      e.preventDefault()
      onSendMessage()
    }
  }

  const onSendMessage = () => {
    if (messageValue.length) {
      socket.emit('ROOM:NEW_MESSAGE', {
        text: messageValue,
        userName,
        roomId
      })
      addMessage({ userName, text: messageValue })
      setMessageValue('')
    }
  }


  return (
    <div className="chat-messages">
      <div ref={messagesRef} className="messages">
        {messages.map((msg, idx) => {
          return (
            <Message message={msg} key={idx} authorizedUserName={userName} />
          )
        })}
      </div>
      <div className="form">
        <textarea
          value={messageValue}
          onChange={e => handleChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="form-control"
          rows={3} ></textarea>
        <button onClick={onSendMessage}>Send</button>
      </div>
    </div>
  )
}

export default Messages
