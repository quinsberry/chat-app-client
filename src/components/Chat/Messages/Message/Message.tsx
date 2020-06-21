import React from 'react'

import './Message.scss'

import { TMessage } from '../../../../types/types'

type Props = {
  message: TMessage
  authorizedUserName: string
}

const Message: React.FC<Props> = ({ message, authorizedUserName }) => {
  return (
    <div className={`message ${authorizedUserName !== message.userName ? 'not-mine' : 'mine'}`}>
      <p>{message.text}</p>
      <div>
        <span>{message.userName}</span>
      </div>
    </div>
  )
}

export default Message
