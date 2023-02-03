import { createSlice } from '@reduxjs/toolkit'
import { dirIdType } from '../../models/response/IFile'

interface FileState {
  currentDir: dirIdType
  dirStack: string[]
  nameStack: string[]
}

const initialState: FileState = {
  currentDir: undefined,
  dirStack: [],
  nameStack: [],
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
    pushToNameStack(state, action) {
      state.nameStack.push(action.payload)
    },
    popNameStack(state) {
      state.nameStack.pop()
    },
  },
  extraReducers: (builder) => {},
})

const { actions, reducer } = filesSlice
export const { pushToDirStack, setCurrentDir, popDirStack } = actions
export default reducer
