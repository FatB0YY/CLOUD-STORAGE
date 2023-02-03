import { dirIdType, IFile } from '../models/response/IFile'
import { rtkAPI } from './rtkAPI'

export const filesAPI = rtkAPI.injectEndpoints({
  endpoints: (build) => ({
    getAllFiles: build.query<IFile[], dirIdType>({
      query: (dirId) => ({
        url: `/files${dirId ? '?parent=' + dirId : ''}`,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: 'Files' as const, _id })),
              { type: 'Files', id: 'LISTFILES' },
            ]
          : [{ type: 'Files', id: 'LISTFILES' }],
    }),
    deleteFile: build.mutation<{ message: string }, IFile>({
      query: (file) => ({
        url: `/files?id=${file._id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Files', id: 'LISTFILES' }],
    }),
    createDir: build.mutation<IFile, { name: string; dirId: dirIdType }>({
      query: ({ name, dirId }) => ({
        url: `/files`,
        method: 'POST',
        body: {
          name,
          parent: dirId,
          type: 'dir',
        },
      }),
      invalidatesTags: [{ type: 'Files', id: 'LISTFILES' }],
    }),
  }),
})

export const { useGetAllFilesQuery, useDeleteFileMutation, useCreateDirMutation } = filesAPI
