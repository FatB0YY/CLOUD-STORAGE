// import { bindActionCreators } from 'redux'
// import { useDispatch } from 'react-redux'
// import { useMemo } from 'react'
// import { downloadFile } from "../redux/reducers/ActionCreators"
// import { popDirStack, pushToDirStack, setCurrentDir } from "../redux/reducers/FilesSlice"
// import { addUploadFile, changeUploadFile, hideUploader, removeUploadFile, showUploader } from "../redux/reducers/UploadSlice"
// import { logOut, setUser } from "../redux/reducers/UserSlice"
// import { useAppDispatch } from "./redux"

// const actions = {
//     ...downloadFile,
//     ...setCurrentDir,
//     ...pushToDirStack,
//     ...popDirStack,
//     ...showUploader,
//     ...hideUploader,
//     ...addUploadFile,
//     ...removeUploadFile,
//     ...changeUploadFile,
//     ...setUser,
//     ...logOut,
// }   

// export function useActions(actions, deps) {
//     const dispatch = useDispatch()
//     return useMemo(
//       () => {
//         if (Array.isArray(actions)) {
//           return actions.map((a) => bindActionCreators(a, dispatch))
//         }
//         return bindActionCreators(actions, dispatch)
//       },
//       deps ? [dispatch, ...deps] : [dispatch]
//     )
//   }

export {}

//   export const useActions = () => {
//     const dispatch = useAppDispatch()
//     const dispatch = useDispatch()
//     return bindActionCreators(actions, dispatch)
// }