import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { dirIdType } from '../../models/response/IFile'
import { filesAPI } from '../../service/FilesAPI'
import { userAPI } from '../../service/UserAPI'

interface FileState {
  currentDir: dirIdType
  dirStack: string[]
}

const initialState: FileState = {
  currentDir: undefined,
  dirStack: [],
}

export const filesSlice = createSlice({
  name: 'filesSlice',
  initialState,
  reducers: {
    setCurrentDir(state, action: { payload: dirIdType; type: string }) {
      state.currentDir = action.payload
    },
    pushToDirStack(state, action) {
      state.dirStack.push(action.payload)
    },
    popDirStack(state) {
      state.dirStack.pop()
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      userAPI.endpoints.uploadAvatar.matchRejected,
      (state, action) => {
        toast.error(action.payload as any)
      }
    )
    builder.addMatcher(
      userAPI.endpoints.deleteAvatar.matchRejected,
      (state, action) => {
        toast.error(action.payload as any)
      }
    )
    builder.addMatcher(
      filesAPI.endpoints.getAllFiles.matchRejected,
      (state, action) => {
        toast.error(action.payload as any)
      }
    )
    builder.addMatcher(
      filesAPI.endpoints.uploadFile.matchRejected,
      (state, action) => {
        toast.error(action.payload as any)
      }
    )
    builder.addMatcher(
      filesAPI.endpoints.deleteFile.matchRejected,
      (state, action) => {
        console.log(action.payload)

        // toast.error(action.payload.data.message as any)
      }
    )
  },
})

const { actions, reducer } = filesSlice
export const { pushToDirStack, setCurrentDir, popDirStack } = actions
export default reducer
