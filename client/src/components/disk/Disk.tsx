import React, { useState, useEffect, useRef, FC } from 'react'
import { useAppSelector } from '../../hooks/redux'
import FileList from './fileList/FileList'
import Swal from 'sweetalert2'
import Dropzone from '../dropzone/Dropzone'
import Uploader from '../uploader/Uploader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { useCreateDirMutation, useUploadFileMutation } from '../../service/FilesAPI'
import './disk.scss'
import { selectCurrentUser } from '../../redux/reducers/UserSlice'
import sizeFormat from '../../utils/sizeFormat'
import { IFile, ICrumb } from '../../models/response/IFile'

const Disk: FC = () => {
  const [triggerCreateDir, { isLoading: isLoadingCreateDir }] = useCreateDirMutation()

  const [triggerUploadFile, {}] = useUploadFileMutation()

  const currentDir = useAppSelector((state) => state.files.currentDir)
  const user = useAppSelector(selectCurrentUser)
  const [usedSpacePercentage, setUsedSpacePercentage] = useState(0)

  const [dragEnter, setDragEnter] = useState(false)

  const createDirHandler = async () => {
    Swal.fire({
      title: 'Создать новую папку',
      input: 'text',
      showCancelButton: true,
      inputPlaceholder: 'Название папки...',
      cancelButtonText: 'Закрыть',
      confirmButtonText: 'Создать папку',
      showLoaderOnConfirm: true,
      preConfirm: async (name: string) => {
        const regex = /\S+/
        if (!name || !regex.test(name)) {
          Swal.showValidationMessage('Некорректное название')
        } else {
          await triggerCreateDir({
            name: name.trim(),
            // проверить
            currentDir,
          })
            .unwrap()
            .catch((error) => {
              console.error(error)
              // Обработка ошибки
            })
        }
      },

      allowOutsideClick: () => !Swal.isLoading(),
    })
  }

  const fileUploadHandler = async (event: any) => {
    // список файлов из инпута
    const files: File[] = [...event.target.files]

    // проверить проблему здесь (повторный запрос)
    for (const file of files) {
      await triggerUploadFile({
        file,
        // проверить
        currentDir,
      })
        .unwrap()
        .catch((error) => {
          console.error(error)
          // Обработка ошибки
        })
    }
  }

  function dragStartHandler(event: any) {
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
      const percentage = Math.abs(Number(((user.usedSpace / user.diskSpace) * 100).toFixed(2)))
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
      onDragStart={(event) => dragStartHandler(event)}
      onDragLeave={(event) => dragLeaveHandler(event)}
      onDragOver={(event) => dragStartHandler(event)}
    >
      <div className='disk__btns'>
        <div className='disk__upload'>
          <label
            htmlFor='disk__upload-input'
            className='disk__upload-label'
          >
            <FontAwesomeIcon
              icon={solid('cloud-arrow-up')}
              className='icon'
            />
            Загрузить файл
          </label>
          <input
            type='file'
            id='disk__upload-input'
            className='disk__upload-input'
            onChange={(event) => fileUploadHandler(event)}
            multiple={true}
          />
        </div>

        <button
          disabled={isLoadingCreateDir}
          className='disk__create'
          onClick={() => createDirHandler()}
        >
          <FontAwesomeIcon
            icon={solid('plus')}
            className='icon'
          />
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
      dragStartHandler={dragStartHandler}
      dragLeaveHandler={dragLeaveHandler}
      setDragEnter={setDragEnter}
    />
  )
}

export default Disk
