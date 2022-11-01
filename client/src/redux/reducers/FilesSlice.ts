import { createSlice } from '@reduxjs/toolkit'
import { IFile } from '../../models/response/IFile'
import { createDir, getFiles, uploadFile } from './ActionCreators'
import { PayloadAction } from '@reduxjs/toolkit'

interface FileState {
  files: Array<IFile>
  currentDir: string | null | undefined
  error: string | null
  isLoading: boolean
  dirStack: Array<string>
}

const initialState: FileState = {
  files: [],
  currentDir: null,
  error: null,
  isLoading: false,
  dirStack: [],
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
    popStack(state){ 
      state.dirStack.pop()
    }
  },
  extraReducers: {
    //////////////////////////////////// getFiles
    // успешная загрузка
    [getFiles.fulfilled.type]: (state, action: PayloadAction<Array<IFile>>) => {
      //state.files = action.payload
      state.isLoading = false
      state.files = action.payload
    },
    // ожидание
    [getFiles.pending.type]: (state) => {
      state.isLoading = true
      state.error = null
    },
    // ошибка
    [getFiles.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },

    //////////////////////////////////// createDir
    // успешная загрузка
    [createDir.fulfilled.type]: (state, action: PayloadAction<IFile>) => {
      state.files.push(action.payload)
      state.isLoading = false
    },

    // ожидание
    [createDir.pending.type]: (state) => {
      state.error = null
      state.isLoading = true
    },
    // ошибка
    [createDir.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.isLoading = false
    },

    //////////////////////////////////// uploadFile
    // успешная загрузка
    [uploadFile.fulfilled.type]: (state, action) => {
      state.files.push(action.payload)
      state.isLoading = false
    },

    // ожидание
    [uploadFile.pending.type]: (state) => {
      state.error = null
      state.isLoading = true
    },
    // ошибка
    [uploadFile.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.isLoading = false
    },
  },
})

const { actions, reducer } = filesSlice
export const { pushToStack, setCurrentDir, popStack } = actions
export default reducer
