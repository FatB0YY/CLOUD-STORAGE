import $api from '../http'
import { AxiosResponse } from 'axios'
import { IFile } from '../models/response/IFile'
import { deleteFile } from '../redux/reducers/ActionCreators'

export default class FileService {
  static async fetchFiles(
    dirId: string | null | undefined
  ): Promise<AxiosResponse<Array<IFile>>> {
    return $api.get<Array<IFile>>(`/files${dirId ? '?parent=' + dirId : ''}`)
  }

  static async createDir(
    dirId: string | null | undefined,
    name: string
  ): Promise<any> {
    return $api.post(`/files`, {
      name,
      parent: dirId,
      type: 'dir',
    })
  }

  static async uploadFile(dir: any, file: any, formData: any): Promise<any> {
    return $api.post(`/files/upload`, formData, {
      onUploadProgress: (progressEvent) => {
        const totalLength = progressEvent.lengthComputable
          ? progressEvent.total
          : progressEvent.target.getResponseHeader('content-length') ||
            progressEvent.target.getResponseHeader(
              'x-decompressed-content-length'
            )
        console.log('total', totalLength)
        if (totalLength) {
          let progress = Math.round((progressEvent.loaded * 100) / totalLength)
          console.log(progress)
        }
      },
    })
  }

  static async downloadFile(file: any): Promise<any> {
    return $api.get(`/files/download?id=${file._id}`, {
      responseType: 'blob',
    })
  }

  static async deleteFile(file: any): Promise<any> {
    return $api.delete(`/files?id=${file._id}`)
  }
}
