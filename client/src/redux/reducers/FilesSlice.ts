import { createSlice } from '@reduxjs/toolkit'
import { getFiles } from './ActionCreators'

const initialState = {
  files: [],
  currentDir: null,
  error: null
}

export const filesSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
  },
  extraReducers: {
    // успешная загрузка
    [getFiles.fulfilled.type]: (state, action: any) => {
      state.files = action.payload
    },

    // ожидание
    [getFiles.pending.type]: (state) => {
      // state.isLoading = true
      state.error = null
    },
    // ошибка
    [getFiles.rejected.type]: (state, action: any) => {
      // state.isLoading = false
      state.error = action.payload
    },
  },
})

export default filesSlice.reducer