import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/UserSlice'
import filesReducer from './reducers/FilesSlice'
import uploadReducer from './reducers/UploadSlice'

const rootReducer = combineReducers({
  userReducer,
  filesReducer,
  uploadReducer
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
