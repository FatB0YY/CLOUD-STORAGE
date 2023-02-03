import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { uploadFile } from '../../redux/reducers/ActionCreators'
import './dropzone.scss'

const Dropzone = (props: any) => {
  const dispatch = useAppDispatch()
  const { currentDir } = useAppSelector((state) => state.filesReducer)

  const onDrop = useCallback((acceptedFiles: any) => {
    console.log('Файлы:', acceptedFiles)
    acceptedFiles.forEach((file: any) =>
      dispatch(uploadFile({ file, currentDir }))
    )
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
        <input {...getInputProps()} />
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
