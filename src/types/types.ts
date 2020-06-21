export type TLoginParams = {
  roomId: string
  userName: string
}

export type TState = {
  isAuth: boolean
  userName: string
  roomId: number
  users: TUsers
  messages: TMessages,
  error: Array<String> | null
}

export type TRoom = {
  users: TUsers
  messages: TMessages
}

export type TUsers = Array<String>

export type TMessages = Array<TMessage>

export type TMessage = {
  text: string
  userName: string
}