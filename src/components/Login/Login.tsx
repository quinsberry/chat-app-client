import React from 'react'

import { onAuth } from '../../api/api'

import './Login.scss'

import { TLoginParams } from '../../types/types'

type Props = {
  onLogin: (loginParams: TLoginParams) => void
  setErrors: (error: string) => void
}

const Login: React.FC<Props> = ({ onLogin, setErrors }) => {

  const [loginParams, setLoginParams] = React.useState({
    roomId: '',
    userName: ''
  })
  const [isLoading, setLoading] = React.useState(false)
  const [isEmpty, setIsEmpty] = React.useState({
    roomId: false,
    userName: false
  })

  const handleChange = (param: string, value: string) => {
    setLoginParams({
      ...loginParams,
      [param]: value
    })
    setIsEmpty({
      ...isEmpty,
      [param]: false
    })
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.keyCode === 13) {
      onSubmit()
    }
  }

  const onSubmit = async () => {

    // validation
    if (!loginParams.roomId || !loginParams.userName) {
      let emptyObj = {
        roomId: false,
        userName: false
      }
      if (!loginParams.roomId) {
        emptyObj = {
          ...emptyObj,
          roomId: true
        }
      }
      if (!loginParams.userName) {
        emptyObj = {
          ...emptyObj,
          userName: true
        }
      }
      setIsEmpty(emptyObj)
      return
    }

    setLoading(true)
    const res = await onAuth(loginParams)
    if (res) {
      onLogin(loginParams)
      return
    }
    setLoading(false)
    setErrors('Oops, we have some troubles with authentication.')
  }

  return (
    <div className="login-block">
      <input
        type="text"
        placeholder={!isEmpty.roomId ? 'Room ID' : 'Enter room id'}
        className={isEmpty.roomId ? 'empty' : ''}
        value={loginParams.roomId}
        onChange={e => handleChange('roomId', e.target.value)}
        onKeyDown={e => handleKeyDown(e)} />
      <input
        type="text"
        placeholder={!isEmpty.userName ? 'Your name' : 'Enter username'}
        className={isEmpty.userName ? 'empty' : ''}
        value={loginParams.userName}
        onChange={e => handleChange('userName', e.target.value)}
        onKeyDown={e => handleKeyDown(e)} />
      <button onClick={onSubmit} disabled={isLoading}>{isLoading ? 'Entering..' : 'Enter'}</button>
    </div>
  )
}

export default Login
