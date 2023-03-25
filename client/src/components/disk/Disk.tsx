import { FC, useState, useEffect } from 'react'
import { useAppSelector } from '../../hooks/redux'
import FileList from './fileList/FileList'
import Swal from 'sweetalert2'
import Dropzone from '../dropzone/Dropzone'
import Uploader from '../uploader/Uploader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import {
  useCreateDirMutation,
  useUploadFileMutation,
} from '../../service/FilesAPI'
import './disk.scss'
import { selectCurrentUser } from '../../redux/reducers/UserSlice'
import sizeFormat from '../../utils/sizeFormat'

const Disk: FC = () => {
  const [triggerCreateDir, { isLoading: isLoadingCreateDir }] =
    useCreateDirMutation()

  const [triggerUploadFile, {}] = useUploadFileMutation()

  const { currentDir: dirId } = useAppSelector((state) => state.filesReducer)
  const user = useAppSelector(selectCurrentUser)
  const [dragEnter, setDragEnter] = useState(false)
  const [usedSpacePercentage, setUsedSpacePercentage] = useState(0)

  const createDirHandler = async () => {
    Swal.fire({
      title: 'Создать новую папку',
      input: 'text',
      showCancelButton: true,
      cancelButtonText: 'Закрыть',
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

  const fileUploadHandler = async (event: any) => {
    // список файлов из инпута
    const files = [...event.target.files]
    await files.forEach(async (file) => {
      await triggerUploadFile({ file, dirId }).unwrap()
    })
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

  useEffect(() => {
    if (user) {
      const percentage = Math.abs(
        Number(((user.usedSpace / user.diskSpace) * 100).toFixed(2))
      )
      setUsedSpacePercentage(percentage)
    }
  }, [user])

  if (!user) {
    return <div>Ошибка компонента</div>
  }

  const freeSpace = user.diskSpace - user.usedSpace
  const freeSpaceFormatted = sizeFormat(freeSpace)
  const diskSpaceFormatted = sizeFormat(user.diskSpace)

  return !dragEnter ? (
    <div
      className='disk'
      onDragEnter={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
      onDragOver={dragEnterHandler}
    >
      <div className='disk__btns'>
        <div className='disk__upload'>
          <label htmlFor='disk__upload-input' className='disk__upload-label'>
            <FontAwesomeIcon icon={solid('cloud-arrow-up')} className='icon' />
            Загрузить файл
          </label>
          <input
            type='file'
            id='disk__upload-input'
            className='disk__upload-input'
            onChange={(event) => fileUploadHandler(event)}
            multiple={true}
            accept-charset='UTF-8'
          />
        </div>

        <button
          disabled={isLoadingCreateDir}
          className='disk__create'
          onClick={() => createDirHandler()}
        >
          <FontAwesomeIcon icon={solid('plus')} className='icon' />
          Создать папку
        </button>

        <div className='disk__infoSpace infoSpace'>
          <div className='infoSpace__indicatorWrapper'>
            <div className='infoSpace__indicatorBar indicatorBar'>
              <div
                className='indicatorBar__value'
                style={{ width: `${usedSpacePercentage}%` }}
              ></div>
            </div>
          </div>
          <div className='infoSpace__footer'>
            <span className='infoSpace__text'>
              {' '}
              Свободно {freeSpaceFormatted} из {diskSpaceFormatted}
            </span>
          </div>
        </div>
      </div>

      <div className='disk__center'>
        <FileList />
        <Uploader />
      </div>
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
