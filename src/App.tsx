import React from 'react'
import socket from './socket'

import { Login, Chat, ErrorPopUp } from './components'
import reducer from './utils/reducer'
import { getRoomData } from './api/api'

import './App.scss'

import { TLoginParams, TUsers, TMessage, TRoom } from './types/types'


const App: React.FC = () => {

  const [state, dispatch] = React.useReducer(reducer, {
    isAuth: false,
    roomId: null,
    userName: null,
    users: [],
    messages: [],
    error: null
  })

  React.useEffect(() => {
    socket.on('ROOM:SET_USERS', actions.setUsers)
    socket.on('ROOM:NEW_MESSAGE', actions.addMessage)
  }, [])


  const actions = {
    setLoginParams: (loginParams: TLoginParams) => dispatch({ type: 'JOINED', payload: loginParams }),
    addMessage: (newMsg: TMessage) => dispatch({ type: 'NEW_MESSAGE', payload: newMsg }),
    setUsers: (users: TUsers) => dispatch({ type: 'SET_USERS', payload: users }),
    setData: (data: TRoom) => dispatch({ type: 'SET_DATA', payload: data }),
    setErrors: (error: string | null) => dispatch({ type: 'SET_ERRORS', payload: error })
  }

  const onLogin = async (loginParams: TLoginParams) => {

    socket.emit('ROOM:JOIN', loginParams)
    const res = await getRoomData(loginParams.roomId)
    console.log(res)
    if (res) {
      actions.setLoginParams(loginParams)
      actions.setData(res.data)
    }
  }


  return (
    <div className="wrapper">
      {!state.isAuth ? (
        <>
          <Login onLogin={onLogin} setErrors={actions.setErrors} />
          {state.error && (
            <ErrorPopUp error={state.error} setErrors={actions.setErrors} />
          )}
        </>
      ) : (
          <Chat
            users={state.users}
            messages={state.messages}
            setErrors={actions.setErrors}
            userName={state.userName}
            roomId={state.roomId}
            addMessage={actions.addMessage} />
        )
      }
    </div>
  )
}

export default App
