import { PhotosType, ProfileType } from '../types/types'
import { instance, APIResponseType } from './api'

type SavePhotoResponseDataType = {
  photos: PhotosType
}

export const profileAPI = {
  getProfile(userId: number) {
    return instance
      .get<ProfileType>(`profile/${userId}`)
      .then((res) => res.data)
  },
  //получить статус
  getStatus(userId: number) {
    return instance
      .get<string>(`profile/status/${userId}`)
      .then((res) => res.data)
  },
  //редактировать статус
  updateStatusApi(status: string) {
    //передаем на сервер объект, который имеет статус и он будет равен тому новому тексту, который введет пользователь
    return instance
      .put<APIResponseType>(`profile/status`, {
        status: status,
      })
      .then((res) => res.data)
  },
  //отправляем запрос на сервер,чтобы он обновил фото профиля
  savePhoto(photoFile: File) {
    const formData = new FormData()
    formData.append('image', photoFile)
    return instance
      .put<APIResponseType<SavePhotoResponseDataType>>(
        `profile/photo`,
        formData
      )
      .then((res) => res.data)
  },
  saveProfile(profile: ProfileType) {
    return instance
      .put<APIResponseType>(`profile`, profile)
      .then((res) => res.data)
  },
}
