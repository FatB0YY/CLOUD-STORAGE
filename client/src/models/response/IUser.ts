export interface IUser {
  email: string
  id: string
  diskSpace: number
  usedSpace: number
  avatar: string | null
  files: string[]
}

export interface UserDataAuth {
  email: string
  password: string
}
