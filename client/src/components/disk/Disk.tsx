import { FC, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { createDir, getFiles } from '../../redux/reducers/ActionCreators'
import FileList from './fileList/FileList'
import Swal from 'sweetalert2'
import './disk.scss'
import { setCurrentDir } from '../../redux/reducers/FilesSlice'

const Disk: FC = () => {
  const dispatch = useAppDispatch()
  const { currentDir, error, dirStack } = useAppSelector(
    (state) => state.filesReducer
  )

  useEffect(() => {
    dispatch(getFiles(currentDir))

    if (error) {
      Swal.fire({
        icon: 'error',
        title: 'Ошибка',
        text: error,
      })
    }
  }, [currentDir, error, dispatch, dirStack])

  const createDirHandler = () => {
    Swal.fire({
      title: 'Создать новую папку',
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'Создать папку',
      showLoaderOnConfirm: true,
      preConfirm: (name) => {
        if (!name || name.trim() == '' || name.trim().length == '0') {
          Swal.showValidationMessage('Ошибка при валидации')
        }
        dispatch(createDir({ currentDir, name }))
      },

      allowOutsideClick: () => !Swal.isLoading(),
    })
  }

  const backClickHandler = () => {
    const copyDirStack = [...dirStack]
    const backDirId = copyDirStack.pop()
    dispatch(setCurrentDir(backDirId))
  }

  return (
    <div className='disk'>
      <div className='disk__btns'>
        <button className='disk__back' onClick={() => backClickHandler()}>
          Назад
        </button>
        <button className='disk__create' onClick={() => createDirHandler()}>
          Создать папку
        </button>
      </div>
      <FileList />
    </div>
  )
}

export default Disk
