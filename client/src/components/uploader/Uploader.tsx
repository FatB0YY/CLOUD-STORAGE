import { FC, useEffect, useState } from 'react'
import UploadFile from './UploadFile'
import './uploader.scss'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { hideUploader } from '../../redux/reducers/UploadSlice'

const Uploader: FC = () => {
  const { isVisible, files } = useAppSelector((state) => state.uploadReducer)
  const dispatch = useAppDispatch()
    
  useEffect(() => {
    if(files.length == 0){
      dispatch(hideUploader())
    }
  }, [files.length, dispatch, files])

  return (isVisible) ? (
    <div className='uploader'>
      <div className='uploader__header'>
        <div className='uploader__title'>Недавно загруженные файлы</div>
        <button className='uploader__close' onClick={() => dispatch(hideUploader())}>X</button>
      </div>
      {files.map((file) => (
        <UploadFile key={file.id} file={file} />
      ))}
    </div>
  ) : null
}

export default Uploader
