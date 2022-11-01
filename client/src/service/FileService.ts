import $api from '../http'
import { AxiosResponse } from 'axios'
import { IFile } from '../models/response/IFile'

export default class FileService {
  static async fetchFiles(
    dirId: string | null | undefined
  ): Promise<AxiosResponse<Array<IFile>>> {
    return $api.get<Array<IFile>>(`/files${dirId ? '?parent=' + dirId : ''}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
  }

  static async createDir(
    dirId: string | null | undefined,
    name: string
  ): Promise<any> {
    return $api.post(
      `/files`,
      {
        name,
        parent: dirId,
        type: 'dir',
      },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    )
  }

  static async uploadFile(dir: any, file: any, formData: any): Promise<any> {
    return $api.post(`/files/upload`, formData, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
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
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      responseType: 'blob'
    })
  }
}
