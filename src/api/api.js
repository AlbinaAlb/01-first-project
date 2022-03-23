//DAL - посредник между бизнесом и сервером
import axios from 'axios'

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
  follow(userId) {
    return instance.post(`follow/${userId}`)
  },
  unfollow(userId) {
    return instance.delete(`follow/${userId}`)
  },
  getProfile(userId) {
    return instance.get(`profile/${userId || 2}`)
  },
}

export const authAPI = {
  me() {
    return instance.get(`auth/me`)
  },
}
