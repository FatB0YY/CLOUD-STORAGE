export interface IUser {
    email: string
    id: string
    isActivated: boolean
    diskSpace: number
    usedSpace: number
    files: Array<any>
}