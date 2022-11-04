import { FC, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import {
  createDir,
  getFiles,
  uploadFile,
} from '../../redux/reducers/ActionCreators'
import FileList from './fileList/FileList'
import Swal from 'sweetalert2'
import { popStack, setCurrentDir } from '../../redux/reducers/FilesSlice'
import Dropzone from '../dropzone/Dropzone'
import './disk.scss'
import Uploader from '../uploader/Uploader'

const Disk: FC = () => {
  const dispatch = useAppDispatch()
  const { currentDir, error, dirStack } = useAppSelector(
    (state) => state.filesReducer
  )
  const [dragEnter, setDragEnter] = useState(false)

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
    const copy = [...dirStack]
    const backDirId = copy.pop()
    dispatch(setCurrentDir(backDirId))
    dispatch(popStack())
  }

  const fileUploadHandler = async (event: any) => {
    const files = [...event.target.files]
    files.forEach((file) => dispatch(uploadFile({ file, currentDir })))
  }

  function dragEnterHandler(event: any) {
    event.preventDefault()
    event.stopPropagation()
    setDragEnter(true)
  }

  function dragLeaveHandler(event: any) {
    event.preventDefault()
    event.stopPropagation()
    setDragEnter(false)
  }

  return !dragEnter ? (
    <div
      className='disk'
      onDragEnter={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
      onDragOver={dragEnterHandler}
    >
      <div className='disk__btns'>
        <button className='disk__back' onClick={() => backClickHandler()}>
          Назад
        </button>
        <button className='disk__create' onClick={() => createDirHandler()}>
          Создать папку
        </button>
        <div className='disk__upload'>
          <label htmlFor='disk__upload-input' className='disk__upload-label'>
            Загрузить файл
          </label>
          <input
            type='file'
            id='disk__upload-input'
            className='disk__upload-input'
            onChange={(event) => fileUploadHandler(event)}
          />
        </div>
      </div>
      <FileList />
      <Uploader />
    </div>
  ) : (
    <Dropzone
      dragEnterHandler={dragEnterHandler}
      dragLeaveHandler={dragLeaveHandler}
      setDragEnter={setDragEnter}
    />
  )
}

export default Disk
