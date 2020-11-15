import axios from 'axios'

import { TLoginParams, TRoom } from '../types/types'

type ServerResp<D> = {
  success: boolean
  data: D
  errors: []
}

export const onAuth = (loginParams: TLoginParams) => {
  return axios
    .post<ServerResp<[]>>(`/rooms`, loginParams)
    .then((res) => res.data)
    .catch((err) => console.log(err))
}

export const getRoomData = (roomId: string) => {
  return axios
    .get<ServerResp<TRoom>>(`/rooms/${roomId}`)
    .then((res) => res.data)
    .catch((err) => console.log(err))
}
