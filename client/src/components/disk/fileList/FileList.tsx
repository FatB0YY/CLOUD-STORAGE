import { useAppSelector } from '../../../hooks/redux'
import { IFile } from '../../../models/response/IFile'
import File from './file/File'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import './fileList.scss'

const FileList = () => {
  const { files } = useAppSelector((state) => state.filesReducer)

  return (
    <div className='fileList'>
      <div className='fileList__header'>
        <div className='fileList__name'>Название</div>
        <div className='fileList__date'>Дата</div>
        <div className='fileList__size'>Размер</div>
      </div>

      <TransitionGroup>
        {files.map((file: IFile) => (
          <CSSTransition
            key={file._id}
            timeout={500}
            classNames={'file'}
            exit={false}
          >
            <File file={file} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  )
}

export default FileList
