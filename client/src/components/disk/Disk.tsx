import { FC, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { uploadFile } from '../../redux/reducers/ActionCreators'
import FileList from './fileList/FileList'
import Swal from 'sweetalert2'
import { popDirStack, setCurrentDir } from '../../redux/reducers/FilesSlice'
import Dropzone from '../dropzone/Dropzone'
import Uploader from '../uploader/Uploader'
import { dirIdType } from '../../models/response/IFile'
import { useCreateDirMutation } from '../../service/FilesAPI'
import { toast } from 'react-toastify'
import './disk.scss'

const Disk: FC = () => {
  const [
    triggerCreateDir,
    {
      isError: isErrorCreateDir,
      isLoading: isLoadingCreateDir,
      error: errorCreateDir,
    },
  ] = useCreateDirMutation()
  const { currentDir: dirId, dirStack } = useAppSelector(
    (state) => state.filesReducer
  )
  const [dragEnter, setDragEnter] = useState(false)
  const dispatch = useAppDispatch()

  const createDirHandler = async () => {
    Swal.fire({
      title: 'Создать новую папку',
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'Создать папку',
      showLoaderOnConfirm: true,
      preConfirm: async (name: string) => {
        const regex = /\S+/
        if (!name || !regex.test(name)) {
          Swal.showValidationMessage('Некорректное название')
        } else {
          await triggerCreateDir({ name: name.trim(), dirId }).unwrap()
        }
      },

      allowOutsideClick: () => !Swal.isLoading(),
    })
  }

  const backClickHandler = () => {
    const copy = [...dirStack]
    const backDirId: dirIdType = copy.pop()
    dispatch(setCurrentDir(backDirId))
    dispatch(popDirStack())
  }

  const fileUploadHandler = async (event: any) => {
    const files = [...event.target.files]
    files.forEach((file) => dispatch(uploadFile({ file, dirId })))
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

  if (isErrorCreateDir) {
    if (Array.isArray((errorCreateDir as any).data.error)) {
      ;(errorCreateDir as any).data.error.forEach((el: any) =>
        toast.error(el.message, {
          position: 'top-right',
        })
      )
    } else {
      toast.error((errorCreateDir as any).data.message, {
        position: 'top-right',
      })
    }
  }

  return !dragEnter ? (
    <div
      className='disk'
      onDragEnter={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
      onDragOver={dragEnterHandler}
    >
      <div className='disk__btns'>
        <button
          disabled={!dirId}
          className='disk__back'
          onClick={() => backClickHandler()}
        >
          Назад
        </button>
        <button
          disabled={isLoadingCreateDir}
          className='disk__create'
          onClick={() => createDirHandler()}
        >
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
