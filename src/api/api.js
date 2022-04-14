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
    return profileAPI.getProfile(userId)
  },
}

export const profileAPI = {
  getProfile(userId) {
    return instance.get(`profile/${userId}`)
  },
  //получить статус
  getStatus(userId) {
    return instance.get(`profile/status/${userId}`)
  },
  //редактировать статус
  updateStatus(status) {
    //передаем на сервер объект, который имеет статус и он будет равен тому новому тексту, который введет пользователь
    return instance.put(`profile/status`, {
      status: status,
    })
  }
}

export const authAPI = {
  me() {
    return instance.get(`auth/me`)
  },
  login(email, password, rememberMe = false) {
    return instance.post(`auth/login`, { email, password, rememberMe })
  },
  logout() {
    return instance.delete(`auth/login`)
  },
}
