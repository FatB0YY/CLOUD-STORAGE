import { IFile, ICrumb, TypeSortOption } from '../models/response/IFile'
import {
  addUploadFile,
  changeUploadFile,
  showUploader,
} from '../redux/reducers/UploadSlice'
import { rtkAPI } from './rtkAPI'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'
import config from '../config'
import Cookies from 'js-cookie'
import { IUser } from '../models/response/IUser'

export const filesAPI = rtkAPI.injectEndpoints({
  endpoints: (build) => ({
    getAllFiles: build.query<
      IFile[],
      { currentDir: ICrumb; sortValue: TypeSortOption }
    >({
      query: ({ currentDir, sortValue }) => ({
        url: `/files${currentDir.dirId ? `?parent=${currentDir.dirId}` : ''}${
          sortValue ? `${currentDir.dirId ? '&' : '?'}sort=${sortValue}` : ''
        }`,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: 'Files' as const, _id })),
              { type: 'Files', id: 'LISTFILES' },
            ]
          : [{ type: 'Files', id: 'LISTFILES' }],
    }),

    searchFiles: build.query<IFile[], string>({
      query: (searchName) => ({
        url: `/files/search?search=${searchName}`,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: 'Files' as const, _id })),
              { type: 'Files', id: 'LISTFILES' },
            ]
          : [{ type: 'Files', id: 'LISTFILES' }],
    }),

    deleteFile: build.mutation<{ message: string; user: IUser }, IFile>({
      query: (file) => ({
        url: `/files?id=${file._id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Files', id: 'LISTFILES' }],
    }),

    createDir: build.mutation<
      { file: IFile; user: IUser },
      { name: string; currentDir: ICrumb }
    >({
      query: ({ name, currentDir }) => ({
        url: `/files`,
        method: 'POST',
        body: {
          name,
          parent: currentDir.dirId,
          type: 'dir',
        },
      }),
      invalidatesTags: [{ type: 'Files', id: 'LISTFILES' }],
    }),

    uploadFile: build.mutation<
      { file: IFile; user: IUser },
      { file: File; currentDir: ICrumb }
    >({
      async queryFn({ file, currentDir }, { dispatch }) {
        try {
          console.log('file', file)

          const formData = new FormData()
          // blob
          formData.append('file', file)

          console.log('currentDir', currentDir)

          if (currentDir.dirId) {
            formData.append('parent', currentDir.dirId)
          }

          const uploadFile = { name: file.name, progress: 0, id: uuidv4() }

          dispatch(showUploader())
          dispatch(addUploadFile(uploadFile))

          let response = await axios.post(
            `${config.API_URL}/files/upload`,
            formData,
            {
              onUploadProgress: (progressEvent) => {
                const totalLength = progressEvent.total

                if (totalLength) {
                  uploadFile.progress = Math.round(
                    (progressEvent.loaded * 100) / totalLength
                  )
                  dispatch(changeUploadFile(uploadFile))
                }
              },
              headers: {
                Authorization: `Bearer ${Cookies.get('accessToken')}`,
              },
              withCredentials: true,
            }
          )

          return { data: response.data }
        } catch (error: any) {
          if (error.response && error.response.data.message) {
            return { error: error.response.data.message }
          } else {
            return { error: error.message }
          }
        }
      },
      invalidatesTags: [{ type: 'Files', id: 'LISTFILES' }],
    }),
  }),
})

export const {
  useGetAllFilesQuery,
  useDeleteFileMutation,
  useCreateDirMutation,
  useUploadFileMutation,
  useSearchFilesQuery,
} = filesAPI
