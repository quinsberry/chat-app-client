import React from 'react'

import Messages from './Messages/Messages'

import './Chat.scss'

import { TMessages, TUsers, TMessage } from '../../types/types'

type Props = {
  users: TUsers
  messages: TMessages
  userName: string
  roomId: string

  addMessage: (newMsg: TMessage) => void
  setErrors: (error: string) => void
}

const Chat: React.FC<Props> = ({ users, messages, userName, roomId, addMessage, setErrors }) => {


  return (
    <div className="chat">
      <div className="chat-users">
        <span className="chat-users__room">Room ID: <b>{roomId}</b></span>
        <hr />
        <b>Online ({users.length}):</b>
        <ul>
          {users.map((name, idx: number) => {
            return (
              <li key={idx}>{name}</li>
            )
          })}
        </ul>
      </div>
      <Messages messages={messages} userName={userName} roomId={roomId} addMessage={addMessage} />
    </div>
  )
}

export default Chat
