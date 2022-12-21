//DAL - посредник между бизнесом и сервером
import axios from 'axios'
import { UserType } from '../types/types'

export const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  //Чтобы браузер передал вместе с запросом куки и HTTP-авторизацию
  headers: {
    'API-KEY': '9d9e0ff7-a896-4463-afc9-e985160239ce',
  },
})

export enum ResultCodesEnum {
  Success = 0,
  Error = 1
}

export enum ResultCodeForCaptchaEnum {
  CaptchaIsRequired = 10
}

export type GetItemsType = {
  items: Array<UserType>,
  totalCount: number,
  error: string | null
}

export type APIResponseType<D = {}, RC = ResultCodesEnum > = {
  data: D
  resultCode: RC
  messages: Array<string>
}