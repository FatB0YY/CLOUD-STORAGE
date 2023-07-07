import { createSlice } from '@reduxjs/toolkit'
import { IUploadFile } from '../../models/response/IUploadFile'

interface UploadState {
  isVisible: boolean
  files: IUploadFile[]
}

const initialState: UploadState = {
  files: [],
  isVisible: false,
}

const uploadSlice = createSlice({
  name: 'filesSlice',
  initialState,
  reducers: {
    showUploader(state) {
      state.isVisible = true
    },
    hideUploader(state) {
      state.isVisible = false
    },
    addUploadFile(state, action) {
      state.files = [...state.files, { ...action.payload }]
    },
    removeUploadFile(state, action) {
      state.files = [...state.files.filter((file) => file.id != action.payload)]
    },
    changeUploadFile(state, action) {
      state.files = [
        ...state.files.map((file) =>
          file.id == action.payload.id ? { ...file, progress: action.payload.progress } : { ...file },
        ),
      ]
    },
  },
  extraReducers: {},
})

export const { reducer: uploadReducer, actions: uploadActions } = uploadSlice
