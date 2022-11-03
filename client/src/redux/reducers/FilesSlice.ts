import { createSlice } from '@reduxjs/toolkit'
import { IFile } from '../../models/response/IFile'
import { createDir, deleteFile, getFiles, uploadFile } from './ActionCreators'
import { PayloadAction } from '@reduxjs/toolkit'

interface FileState {
  files: Array<IFile>
  currentDir: string | null | undefined
  error: string | null
  dirStack: Array<string>

  isLoadingFiles: boolean
}

const initialState: FileState = {
  files: [],
  currentDir: null,
  error: null,
  dirStack: [],

  isLoadingFiles: false,
}

export const filesSlice = createSlice({
  name: 'filesSlice',
  initialState,
  reducers: {
    setCurrentDir(state, action: PayloadAction<string | undefined>) {
      state.currentDir = action.payload
    },
    pushToStack(state, action: PayloadAction<any>) {
      state.dirStack.push(action.payload)
    },
    popStack(state) {
      state.dirStack.pop()
    },
  },
  extraReducers: {
    //////////////////////////////////// getFiles
    // успешная загрузка
    [getFiles.fulfilled.type]: (state, action: PayloadAction<Array<IFile>>) => {
      state.isLoadingFiles = false
      state.files = action.payload
    },
    // ожидание
    [getFiles.pending.type]: (state) => {
      state.isLoadingFiles = true
      state.error = null
    },
    // ошибка
    [getFiles.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingFiles = false
      state.error = action.payload
    },

    //////////////////////////////////// createDir
    // успешная загрузка
    [createDir.fulfilled.type]: (state, action: PayloadAction<IFile>) => {
      state.files.push(action.payload)
      state.isLoadingFiles = false
    },

    // ожидание
    [createDir.pending.type]: (state) => {
      state.error = null
      state.isLoadingFiles = true
    },
    // ошибка
    [createDir.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.isLoadingFiles = false
    },

    //////////////////////////////////// uploadFile
    // успешная загрузка
    [uploadFile.fulfilled.type]: (state, action) => {
      state.files.push(action.payload)
      state.isLoadingFiles = false
    },

    // ожидание
    [uploadFile.pending.type]: (state) => {
      state.error = null
      state.isLoadingFiles = true
    },
    // ошибка
    [uploadFile.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.isLoadingFiles = false
    },

    //////////////////////////////////// deleteFile
    // успешная загрузка
    [deleteFile.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.files = [
        ...state.files.filter((file) => file._id != action.payload.dirId),
      ]
      state.isLoadingFiles = false
    },

    // ожидание
    [deleteFile.pending.type]: (state) => {
      state.error = null
      state.isLoadingFiles = true
    },
    // ошибка
    [deleteFile.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.isLoadingFiles = false
    },
  },
})

const { actions, reducer } = filesSlice
export const { pushToStack, setCurrentDir, popStack } = actions
export default reducer
