import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { ICrumb } from '../../models/response/IFile'
import { filesAPI } from '../../service/FilesAPI'
import { userAPI } from '../../service/UserAPI'
import { downloadFile } from './ActionCreators'

interface FileState {
  currentDir: ICrumb
  dirStack: ICrumb[]
  breadcrumbsStack: ICrumb[]
}

const initialState: FileState = {
  currentDir: {
    dirId: null,
    name: 'Диск',
    path: '',
  },
  dirStack: [],
  breadcrumbsStack: [
    {
      dirId: null,
      name: 'Диск',
      path: '',
    },
  ],
}

const filesSlice = createSlice({
  name: 'filesSlice',
  initialState,
  reducers: {
    setCurrentDir(state, action: PayloadAction<ICrumb>) {
      state.currentDir = action.payload
    },
    pushToDirStack(state, action: PayloadAction<ICrumb>) {
      state.dirStack.push(action.payload)
    },
    popDirStack(state) {
      state.dirStack.pop()
    },
    removeICrumbAfterIndex(state, action: PayloadAction<ICrumb>) {
      const clickedIndex = state.dirStack.findIndex((breadcrumb) => breadcrumb.dirId === action.payload.dirId)

      // Если элемент найден в массиве, удаляем элементы,
      // начиная с индекса, соответствующего кликнутому элементу, до конца массива
      if (clickedIndex !== -1) {
        state.dirStack.splice(clickedIndex)
      }
    },
    // Breadcrumbs
    pushToBreadcrumbsStack(state, action: PayloadAction<ICrumb>) {
      state.breadcrumbsStack.push(action.payload)
    },
    popBreadcrumbsStack(state) {
      state.breadcrumbsStack.pop()
    },
    removeBreadcrumbsAfterIndex(state, action: PayloadAction<ICrumb>) {
      const clickedIndex = state.breadcrumbsStack.findIndex((breadcrumb) => breadcrumb.dirId === action.payload.dirId)

      // Если элемент найден в массиве, удаляем элементы,
      // начиная с индекса, соответствующего кликнутому элементу, до конца массива
      if (clickedIndex !== -1) {
        state.breadcrumbsStack.splice(clickedIndex + 1)
      }
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
    builder.addMatcher(userAPI.endpoints.uploadAvatar.matchRejected, (state, action: any) => {
      toast.error(action.payload)
    })
    builder.addMatcher(userAPI.endpoints.deleteAvatar.matchRejected, (state, action: any) => {
      toast.error(action.payload)
    })
    builder.addMatcher(filesAPI.endpoints.getAllFiles.matchRejected, (state, action: any) => {
      toast.error(action.payload?.data.message)
    })
    builder.addMatcher(filesAPI.endpoints.uploadFile.matchRejected, (state, action: any) => {
      toast.error(action.payload)
    })
    builder.addMatcher(filesAPI.endpoints.deleteFile.matchRejected, (state, action: any) => {
      toast.error(action.payload?.data.message)
    })
    builder.addMatcher(filesAPI.endpoints.createDir.matchRejected, (state, action: any) => {
      toast.error(action.payload?.data.message)
    })
  },
})

export const { reducer: filesReducer, actions: filesActions } = filesSlice
