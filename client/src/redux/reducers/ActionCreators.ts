import { createAsyncThunk } from '@reduxjs/toolkit'
import FileService from '../../service/FileService'
import { addUploadFile, showUploader } from './UploadSlice'
import { v4 as uuidv4 } from 'uuid'

interface DirData {
  currentDir: string | null | undefined
  name: string
}

export const uploadFile = createAsyncThunk(
  'uploadFile',
  async ({ file, dirId }: any, { rejectWithValue, dispatch }) => {
    try {
      const formData = new FormData()
      formData.append('file', file)

      if (dirId) {
        formData.append('parent', dirId)
      }

      // изменить?
      const uploadFile = { name: file.name, progress: 0, id: uuidv4() }

      dispatch(showUploader())
      dispatch(addUploadFile(uploadFile))

      const response = await FileService.uploadFile(
        formData,
        uploadFile,
        dispatch
      )
      return response.data
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

export const downloadFile = createAsyncThunk(
  'downloadFile',
  async (file: any, { rejectWithValue }) => {
    // try {
    //   const response = await FileService.downloadFile(file)

    //   if (response.status == 200) {
    //     const downloadUrl = window.URL.createObjectURL(response.data)

    //     // костыль?
    //     const link = document.createElement('a')
    //     link.href = downloadUrl
    //     link.download = file.name
    //     document.body.appendChild(link)
    //     link.click()
    //     link.remove()
    //   }
    // } catch (error: any) {
    //   if (error.response && error.response.data.message) {
    //     return rejectWithValue(error.response.data.message)
    //   } else {
    //     return rejectWithValue(error.message)
    //   }
    // }
  }
)