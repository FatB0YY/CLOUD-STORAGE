import { useAppSelector } from '../../hooks/redux'
import { useUploadFileMutation } from '../../service/FilesAPI'
import React, { useCallback, FC } from 'react'
import {
  useDropzone,
  DropzoneRootProps,
  DropzoneInputProps,
} from 'react-dropzone'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import './dropzone.scss'

interface MyDropzoneProps {
  setDragEnter: React.Dispatch<React.SetStateAction<boolean>>
  dragStartHandler: (event: React.DragEvent<HTMLDivElement>) => void
  dragLeaveHandler: (event: React.DragEvent<HTMLDivElement>) => void
}

const MyDropzone: FC<MyDropzoneProps> = ({
  setDragEnter,
  dragStartHandler,
  dragLeaveHandler,
}) => {
  const [triggerUploadFile, {}] = useUploadFileMutation()
  const { currentDir } = useAppSelector((state) => state.filesReducer)

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      for (const file of acceptedFiles) {
        await triggerUploadFile({
          file,
          // проверить
          currentDir,
        }).unwrap()
      }
      setDragEnter(false)
    },
    [triggerUploadFile, currentDir, setDragEnter]
  )

  function clickCloseHandler(event: React.MouseEvent<SVGSVGElement>) {
    event.preventDefault()
    event.stopPropagation()

    setDragEnter(false)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <section
      className='dropzone'
      onDragStart={dragStartHandler}
      onDragLeave={dragLeaveHandler}
      onDragOver={dragStartHandler}
    >
      <div {...getRootProps({ className: 'drop-area' } as DropzoneRootProps)}>
        <FontAwesomeIcon
          icon={solid('xmark')}
          className='dropzone__icon'
          onClick={clickCloseHandler}
        />
        <input {...(getInputProps() as DropzoneInputProps)} />
        {isDragActive ? (
          <p className='dropzone__text'>Отпустите файлы, чтобы загрузить их</p>
        ) : (
          <p className='dropzone__text'>
            Перетащите несколько файлов сюда или нажмите, чтобы выбрать файлы
          </p>
        )}
      </div>
    </section>
  )
}

export default MyDropzone
