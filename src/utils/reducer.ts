import { TState } from '../types/types'

export default (state: TState, action: any) => {
  switch (action.type) {
    case 'JOINED':
      return {
        ...state,
        isAuth: true,
        userName: action.payload.userName,
        roomId: action.payload.roomId,
      }
    case 'SET_USERS':
      return {
        ...state,
        users: action.payload
      }
    case 'SET_MESSAGES':
      return {
        ...state,
        messages: action.payload
      }
    case 'NEW_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload]
      }
    case 'SET_DATA':
      return {
        ...state,
        messages: action.payload.messages,
        users: action.payload.users
      }
    case 'SET_ERRORS':
      return {
        ...state,
        error: action.payload
      }
    default:
      return state
  }
}