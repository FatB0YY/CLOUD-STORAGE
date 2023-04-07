export interface IUser {
  email: string
  id: string
  name: string
  surname: string
  diskSpace: number
  usedSpace: number
  avatar: string | null
  files: string[]
}

export interface UserDataAuthReg {
  email: string
  password: string
  name: string
  surname: string
}

export interface UserDataAuthLogin {
  email: string
  password: string
}
