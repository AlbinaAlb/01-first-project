import { ResultCodesEnum } from './api'

export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
  data: D
  resultCode: RC
  messages: Array<string>
}
