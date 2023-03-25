import { FC, useEffect, useState } from 'react'
import { useAppDispatch } from '../../hooks/redux'
import { IUploadFile } from '../../models/response/IUploadFile'
import { removeUploadFile } from '../../redux/reducers/UploadSlice'
import './uploader.scss'

interface propsUpload {
  file: IUploadFile
}

const UploadFile: FC<propsUpload> = ({ file }) => {
  const [name, setName] = useState(file.name)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (file.name.length > 25) {
      setName(file.name.slice(0, 25) + '...')
    }

    if (file.progress == 100) {
      setTimeout(() => {
        dispatch(removeUploadFile(file.id))
      }, 5000)
    }
  }, [file.progress, dispatch, file.id])

  return (
    <div className='upload-file'>
      <div className='upload-file__header'>
        <div className='upload-file__name'>{name}</div>
      </div>
      <div className='upload-file__progress-bar'>
        <div
          className='upload-file__upload-bar'
          style={{ width: file.progress + '%' }}
        ></div>
        <div className='upload-file__percent'>{file.progress}%</div>
      </div>
    </div>
  )
}

export default UploadFile
