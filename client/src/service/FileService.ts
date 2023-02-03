import { dirIdType, IFile } from '../models/response/IFile'
import { changeUploadFile } from '../redux/reducers/UploadSlice'

export default class FileService {
  static async uploadFile(formData: any, uploadFile: any, dispatch: any): Promise<any> {
    return $api.post(`/files/upload`, formData, {
      onUploadProgress: (progressEvent) => {
        const totalLength = progressEvent.lengthComputable
          ? progressEvent.total
          : progressEvent.target.getResponseHeader('content-length') ||
            progressEvent.target.getResponseHeader(
              'x-decompressed-content-length'
            );

        if (totalLength) {
          uploadFile.progress = Math.round((progressEvent.loaded * 100) / totalLength)
          dispatch(changeUploadFile(uploadFile))
        }
      },
    })
  }

  // static async downloadFile(file: any): Promise<any> {
  //   return $api.get(`/files/download?id=${file._id}`, {
  //     responseType: 'blob',
  //   })
  // }
}


// inviladatesTags для мутации состояния файлов, удаление изменение добавление!