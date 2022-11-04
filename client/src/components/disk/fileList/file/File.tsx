import { FC, useEffect } from 'react'
import { IFile } from '../../../../models/response/IFile'
import fileLogo from '../../../../assets/img/file.png'
import dirLogo from '../../../../assets/img/dir.png'
import './file.scss'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux'
import {
  pushToStack,
  setCurrentDir,
} from '../../../../redux/reducers/FilesSlice'
import {
  deleteFile,
  downloadFile,
} from '../../../../redux/reducers/ActionCreators'
import Swal from 'sweetalert2'
import sizeFormat from '../../../../utils/sizeFormat'

interface Props {
  file: IFile
}

const File: FC<Props> = ({ file }) => {
  const { currentDir } = useAppSelector((state) => state.filesReducer)
  const dispatch = useAppDispatch()

  const openDirHandler = (file: any) => {
    if (file.type === 'dir') {
      dispatch(pushToStack(currentDir))
      dispatch(setCurrentDir(file._id))
    }
  }

  const downloadClickHandler = (event: any) => {
    event.stopPropagation()
    dispatch(downloadFile(file))
  }

  const deleteClickHandler = (event: any) => {
    event.stopPropagation()
    Swal.fire('Файл удален', '', 'success')
    dispatch(deleteFile(file))
  }

  return (
    <div className='file' onClick={() => openDirHandler(file)}>
      <img
        src={file.type === 'dir' ? dirLogo : fileLogo}
        alt={file.type === 'dir' ? 'dir logo' : 'file logo'}
        className='file__img'
      />
      <div className='file__name'>{file.name}</div>
      <div className='file__date'>{file.date.slice(0, 10)}</div>
      <div className='file__size'>
        {file.size === 0 ? '-' : sizeFormat(file.size)}
      </div>

      {file.type !== 'dir' && (
        <button
          onClick={(event) => downloadClickHandler(event)}
          className='file__btn file__download'
        >
          Скачать
        </button>
      )}
      <button
        onClick={(event) => deleteClickHandler(event)}
        className='file__btn file__delete'
      >
        Удалить
      </button>
    </div>
  )
}

export default File
