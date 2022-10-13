import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/UserSlice'
import filesReducer from './reducers/FilesSlice'

const rootReducer = combineReducers({
  userReducer,
  filesReducer,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
