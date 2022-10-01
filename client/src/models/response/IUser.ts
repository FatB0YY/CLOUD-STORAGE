export interface IUser {
    email: string
    _id: string
    isActivated: boolean
    diskSpace: number
    usedSpace: number
    files: Array<any>
}