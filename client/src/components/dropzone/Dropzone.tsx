import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { useAppSelector } from '../../hooks/redux'
import { useUploadFileMutation } from '../../service/FilesAPI'
import './dropzone.scss'

const Dropzone = (props: any) => {
  const [triggerUploadFile, {}] = useUploadFileMutation()
  const { currentDir: dirId } = useAppSelector((state) => state.filesReducer)

  const onDrop = useCallback((acceptedFiles: any) => {
    acceptedFiles.forEach((file: any) => triggerUploadFile({ file, dirId }).unwrap())
    props.setDragEnter(false)
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <section
      className='drop-area'
      onDragEnter={props.dragEnterHandler}
      onDragLeave={props.dragLeaveHandler}
      onDragOver={props.dragEnterHandler}
    >
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} className='dropzone__input'/>
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

export default Dropzone
