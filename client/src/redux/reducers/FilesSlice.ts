import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { ICrumb } from '../../models/response/ICrumb'
import { dirIdType } from '../../models/response/IFile'
import { filesAPI } from '../../service/FilesAPI'
import { userAPI } from '../../service/UserAPI'
import { downloadFile } from './ActionCreators'

interface FileState {
  currentDir: dirIdType
  dirStack: string[]
  breadcrumbStack: ICrumb[]
}

const initialState: FileState = {
  currentDir: undefined,
  dirStack: [],
  breadcrumbStack: [],
}

export const filesSlice = createSlice({
  name: 'filesSlice',
  initialState,
  reducers: {
    setCurrentDir(state, action: PayloadAction<dirIdType>) {
      state.currentDir = action.payload
    },
    pushToDirStack(state, action) {
      state.dirStack.push(action.payload)
    },
    popDirStack(state) {
      state.dirStack.pop()
    },

    pushTobreadcrumbStack(state, action: PayloadAction<ICrumb>) {
      state.breadcrumbStack.push(action.payload)
    },
    popbreadcrumbStack(state) {
      state.breadcrumbStack.pop()
    },
  },
  extraReducers: (builder) => {
    // Rejected
    builder.addCase(downloadFile.rejected.type, (state, action: any) => {
      toast.error(action.payload.message)
    })
    // builder.addCase(downloadFolder.rejected.type, (state, action: any) => {
    //   toast.error(action.payload.message)
    // })
    builder.addMatcher(
      userAPI.endpoints.uploadAvatar.matchRejected,
      (state, action: any) => {
        toast.error(action.payload)
      }
    )
    builder.addMatcher(
      userAPI.endpoints.deleteAvatar.matchRejected,
      (state, action: any) => {
        toast.error(action.payload)
      }
    )
    builder.addMatcher(
      filesAPI.endpoints.getAllFiles.matchRejected,
      (state, action: any) => {
        toast.error(action.payload?.data.message)
      }
    )
    builder.addMatcher(
      filesAPI.endpoints.uploadFile.matchRejected,
      (state, action: any) => {
        toast.error(action.payload)
      }
    )
    builder.addMatcher(
      filesAPI.endpoints.deleteFile.matchRejected,
      (state, action: any) => {
        toast.error(action.payload?.data.message)
      }
    )
    builder.addMatcher(
      filesAPI.endpoints.createDir.matchRejected,
      (state, action: any) => {
        toast.error(action.payload?.data.message)
      }
    )
  },
})

const { actions, reducer } = filesSlice
export const {
  pushToDirStack,
  setCurrentDir,
  popDirStack,
  popbreadcrumbStack,
  pushTobreadcrumbStack,
} = actions
export default reducer
