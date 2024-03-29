import { createAsyncThunk } from '@reduxjs/toolkit'
import { IFile } from '../../models/response/IFile'
import FileService from '../../service/FileService'

export const downloadFile = createAsyncThunk('filesSlice/downloadFile', async (file: IFile, thunkAPI) => {
  try {
    const response = await FileService.downloadFile(file)

    if (response.status === 200) {
      const downloadUrl = window.URL.createObjectURL(response.data)
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = file.name
      document.body.appendChild(link)
      link.click()
      link.remove()
    }
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ message: 'Ошибка при скачивании' })
  }
})

export const downloadFolder = createAsyncThunk('filesSlice/downloadFile', async (file: IFile, thunkAPI) => {
  try {
    const response = await FileService.downloadFolder(file)

    if (response.status === 200) {
      const downloadUrl = window.URL.createObjectURL(response.data)
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = file.name
      document.body.appendChild(link)
      link.click()
      link.remove()
    }
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ message: 'Ошибка при скачивании' })
  }
})
