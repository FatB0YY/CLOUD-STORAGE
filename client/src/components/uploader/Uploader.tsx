import { FC, useEffect } from 'react'
import UploadFile from './UploadFile'
import './uploader.scss'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { hideUploader } from '../../redux/reducers/UploadSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

const Uploader: FC = () => {
  const { isVisible, files } = useAppSelector((state) => state.uploadReducer)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (files.length == 0) {
      dispatch(hideUploader())
    }
  }, [files.length, dispatch, files])

  return isVisible ? (
    <div className='uploader'>
      <div className='uploader__header'>
        <div className='uploader__title'>Загружаемые файлы</div>
        <button
          className='uploader__close'
          onClick={() => dispatch(hideUploader())}
        >
          <FontAwesomeIcon icon={solid('close')} className='icon' />
        </button>
      </div>
      {files.map((file) => (
        <UploadFile key={file.id} file={file} />
      ))}
    </div>
  ) : null
}

export default Uploader
