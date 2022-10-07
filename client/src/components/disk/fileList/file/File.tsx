import { FC } from 'react'
import { IFile } from '../../../../models/response/IFile'
import fileLogo from '../../../../assets/img/file.png'
import dirLogo from '../../../../assets/img/dir.png'
import './file.scss'

interface Props {
  file: IFile
  key: string
}

const File: FC<Props> = ({ file }) => {
  return (
    <div className='file'>
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
