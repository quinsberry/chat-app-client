import axios from 'axios'
import { API_URL } from '../config'

import { TLoginParams, TRoom } from '../types/types'

type ServerResp<D> = {
  success: boolean
  data: D
  errors: []
}

export const onAuth = (loginParams: TLoginParams) => {
  return axios
    .post<ServerResp<[]>>(`${API_URL}/rooms`, loginParams)
    .then((res) => res.data)
    .catch((err) => console.log(err))
}

export const getRoomData = (roomId: string) => {
  return axios
    .get<ServerResp<TRoom>>(`${API_URL}/rooms/${roomId}`)
    .then((res) => res.data)
    .catch((err) => console.log(err))
}
