import axios from 'axios'
import Cookies from 'js-cookie'
import config from '../config'
import { IFile } from '../models/response/IFile'

export default class FileService {
  static async downloadFile(file: IFile) {
    return axios.get(`${config.API_URL}/files/download?id=${file._id}`, {
      responseType: 'blob',
      headers: {
        Authorization: `Bearer ${Cookies.get('accessToken')}`,
      },
      withCredentials: true,
    })
  }

  static async downloadFolder(file: IFile) {
    return axios.get(`${config.API_URL}/files/downloadFolder?folderId=${file._id}`, {
      responseType: 'blob',
      headers: {
        Authorization: `Bearer ${Cookies.get('accessToken')}`,
      },
      withCredentials: true,
    })
  }
}
