//DAL - посредник между бизнесом и сервером
import axios from 'axios'
import { ProfileType } from '../types/types'

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  //Чтобы браузер передал вместе с запросом куки и HTTP-авторизацию
  headers: {
    'API-KEY': '9d9e0ff7-a896-4463-afc9-e985160239ce',
  },
})

//объект для группировки всех методов
export const usersAPI = {
  //делает запрос на сервер
  getUsers(currentPage = 1, pageSize = 10) {
    return instance
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => {
        return response.data
      })
  },
  follow(userId: number) {
    return instance.post(`follow/${userId}`)
  },
  unfollow(userId: number) {
    return instance.delete(`follow/${userId}`)
  },
  getProfile(userId: number) {
    return profileAPI.getProfile(userId)
  },
}

export const profileAPI = {
  getProfile(userId: number) {
    return instance.get(`profile/${userId}`)
  },
  //получить статус
  getStatus(userId: number) {
    return instance.get(`profile/status/${userId}`)
  },
  //редактировать статус
  updateStatusApi(status: string) {
    //передаем на сервер объект, который имеет статус и он будет равен тому новому тексту, который введет пользователь
    return instance.put(`profile/status`, {
      status: status,
    })
  },
  //отправляем запрос на сервер,чтобы он обновил фото профиля
  savePhoto(photoFile: any) {
    const formData = new FormData()
    formData.append('image', photoFile)
    return instance.put(`profile/photo`, formData)
  },
  saveProfile(profile: ProfileType) {
    return instance.put(`profile`, profile)
  },
}

//для того, чтобы не использовать 0 или 1 в if, пишется ResultCodesEnum.Success или ResultCodesEnum.Error
export enum ResultCodesEnum {
  Success = 0,
  Error = 1
}

export enum ResultCodeForCaptcha {
  CaptchaIsRequired = 10
}

type MeResponseType = {
  data: { id: number; email: string; login: string }
  resultCode: ResultCodesEnum
  messages: Array<string>
}

type LoginResponseType = {
  data: { userId: number }
  resultCode: ResultCodesEnum | ResultCodeForCaptcha
  messages: Array<string>
}

export const authAPI = {
  me() {
    return instance.get<MeResponseType>(`auth/me`).then((res) => res.data)
  },
  login(
    email: string,
    password: string,
    rememberMe = false,
    captcha: null | string = null
  ) {
    return instance
      .post<LoginResponseType>(`auth/login`, {
        email,
        password,
        rememberMe,
        captcha,
      })
      .then((res) => res.data)
  },
  logout() {
    return instance.delete(`auth/login`)
  },
}

export const secutityAPI = {
  getCaptchaUrl() {
    return instance.get(`security/get-captcha-url`)
  },
}
