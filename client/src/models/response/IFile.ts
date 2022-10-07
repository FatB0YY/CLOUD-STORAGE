export interface IFile {
    name: string
    type: string
    accessLink: string
    id: string
    date: string
    size: number
    path: string
    user: string
    parent: string
    childs: Array<string> | Array<IFile>
}