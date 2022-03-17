import axios from 'axios'

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  //Чтобы браузер передал вместе с запросом куки и HTTP-авторизацию
  headers: {
    'API-KEY': 'b1775b2f-c3a5-4509-8dc9-90b5629de7c3',
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
  header() {
    return instance.get(`auth/me`)
  },
  profile(userId) {
    return instance.get(`profile/${userId || 2}`)
  },
}
