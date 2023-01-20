export type PostType = {
  id: number
  message: string
  likesCount: string
}

export type ContactsType = {
  github: string
  vk: string
  facebook: string
  instagram: string
  twitter: string
  website: string
  youtube: string
}

export type PhotosType = {
  small: string | undefined
  large: string | undefined
}

export type ProfileType = {
  userId: number | undefined
  lookingForAJob: boolean
  lookingForAJobDescription: string
  fullName: string
  contacts: ContactsType
  photos: PhotosType
  aboutMe: string
}

export type UserType = {
  id: number
  name: string
  status: string
  photos: PhotosType
  followed: boolean
}