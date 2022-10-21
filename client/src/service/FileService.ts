import $api from '../http'
import { AxiosResponse } from 'axios'
import { IFile } from '../models/response/IFile'

export default class FileService {
  static async fetchFiles(dirId: string | null | undefined): Promise<AxiosResponse<Array<IFile>>> {
    return $api.get<Array<IFile>>(`/files${dirId?'?parent='+dirId:''}`, {
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
}
