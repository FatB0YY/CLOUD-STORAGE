import { FC, useEffect } from 'react'
import { IFile } from '../../../../models/response/IFile'
import fileLogo from '../../../../assets/img/file.png'
import dirLogo from '../../../../assets/img/dir.png'
import './file.scss'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux'
import { pushToStack, setCurrentDir } from '../../../../redux/reducers/FilesSlice'

interface Props {
  file: IFile
  key: string
}

const File: FC<Props> = ({ file }) => {
  const { currentDir } = useAppSelector((state) => state.filesReducer)
  const dispatch = useAppDispatch()

  const openDirHandler = () => {
    if (file.type === 'dir') {
      dispatch(pushToStack(currentDir))
      dispatch(setCurrentDir(file._id))
    }
  }

  return (
    <div className='file' onClick={() => openDirHandler()}>
      <img
        src={file.type === 'dir' ? dirLogo : fileLogo}
        alt={file.type === 'dir' ? 'dir logo' : 'file logo'}
        className='file__img'
      />
      <div className='file__name'>{file.name}</div>
      <div className='file__date'>{file.date.slice(0, 10)}</div>
      <div className='file__size'>{file.size}</div>
    </div>
  )
}

export default File
