export interface IFile {
  name: string
  type: TypeFile
  accessLink: string
  id?: string
  _id?: string
  date: string
  size: number
  path: string
  user: string
  parent: string
  childs: string[]
  progress?: number
}

export enum TypeFile{
  DIR = 'dir',
  FILE = 'file'
}

export type dirIdType = string | undefined
