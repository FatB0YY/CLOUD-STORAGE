import { createSlice } from '@reduxjs/toolkit'
import { dirIdType } from '../../models/response/IFile'

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
  extraReducers: (builder) => {},
})

const { actions, reducer } = filesSlice
export const { pushToDirStack, setCurrentDir, popDirStack } = actions
export default reducer
