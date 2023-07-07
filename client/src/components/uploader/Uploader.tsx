import { FC, useEffect } from 'react'
import UploadFile from './UploadFile'
import './uploader.scss'
import { useActionCreators, useAppSelector } from '../../hooks/redux'
import { uploadActions } from '../../redux/reducers/UploadSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

const Uploader: FC = () => {
  const isVisible = useAppSelector((state) => state.upload.isVisible)
  const files = useAppSelector((state) => state.upload.files)

  const actionsUpload = useActionCreators(uploadActions)

  useEffect(() => {
    if (files.length == 0) {
      actionsUpload.hideUploader()
    }
  }, [files.length, files])

  return isVisible ? (
    <div className='uploader'>
      <div className='uploader__header'>
        <div className='uploader__title'>Загружаемые файлы</div>
        <button
          className='uploader__close'
          onClick={() => actionsUpload.hideUploader()}
        >
          <FontAwesomeIcon
            icon={solid('close')}
            className='icon'
          />
        </button>
      </div>
      {files.map((file) => (
        <UploadFile
          key={file.id}
          file={file}
        />
      ))}
    </div>
  ) : null
}

export default Uploader
