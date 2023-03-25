export interface IFile {
  name: string
  type: TypeFile
  accessLink: string
  _id?: string
  date: string
  size: number
  path: string
  user: string
  parent: string
  childs: string[]
  progress?: number
}

export enum TypeSortOption {
  NAME = 'name',
  TYPE = 'type',
  DATE = 'date',
}

export function getExtensionIcon(extension: string): string {
  let icon: string

  if (extension === TypeFile.DIR) {
    return (icon = extensionIcon[TypeFile.DIR])
  }

  if (!extensionIcon[extension]) {
    return (icon = extensionIcon[TypeFile.FILE])
  }

  return (icon = extensionIcon[extension])
}

export enum TypeFile {
  Z7 = 'z7',
  DOC = 'doc',
  DOCX = 'docx',
  GIF = 'gif',
  HTML = 'html',
  ISO = 'iso',
  JPG = 'jpg',
  JS = 'js',
  MP3 = 'mp3',
  PDF = 'pdf',
  PNG = 'png',
  PPT = 'ppt',
  PSD = 'psd',
  RAR = 'rar',
  SWF = 'swf',
  TXT = 'txt',
  XLS = 'xls',
  XLSX = 'xlsx',
  DIR = 'dir',
  FILE = 'file',
}

interface ExtensionIcon {
  [key: string]: string
}

const extensionIcon: ExtensionIcon = {
  [TypeFile.DIR]: 'icons-file/dirsvg.svg',
  [TypeFile.FILE]: 'icons-file/file.png',
  [TypeFile.Z7]: 'icons-file/7z-svgrepo-com.svg',
  [TypeFile.DOC]: 'icons-file/doc-svgrepo-com.svg',
  [TypeFile.DOCX]: 'icons-file/doc-svgrepo-com.svg',
  [TypeFile.GIF]: 'icons-file/gif-svgrepo-com.svg',
  [TypeFile.HTML]: 'icons-file/html-svgrepo-com.svg',
  [TypeFile.ISO]: 'icons-file/iso-svgrepo-com.svg',
  [TypeFile.JPG]: 'icons-file/jpg-svgrepo-com.svg',
  [TypeFile.JS]: 'icons-file/js-svgrepo-com.svg',
  [TypeFile.MP3]: 'icons-file/mp3-svgrepo-com.svg',
  [TypeFile.PDF]: 'icons-file/pdf-svgrepo-com.svg',
  [TypeFile.PPT]: 'icons-file/ppt-svgrepo-com.svg',
  [TypeFile.PSD]: 'icons-file/psd-svgrepo-com.svg',
  [TypeFile.RAR]: 'icons-file/rar-svgrepo-com.svg',
  [TypeFile.SWF]: 'icons-file/swf-svgrepo-com.svg',
  [TypeFile.TXT]: 'icons-file/txt-svgrepo-com.svg',
  [TypeFile.XLS]: 'icons-file/xls-svgrepo-com.svg',
  [TypeFile.XLSX]: 'icons-file/xls-svgrepo-com.svg',
  [TypeFile.PNG]: 'icons-file/icon-png.png',
}

export type dirIdType = string | undefined
