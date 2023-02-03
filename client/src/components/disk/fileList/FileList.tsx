import { FC } from 'react'
import { useAppSelector } from '../../../hooks/redux'
import { IFile } from '../../../models/response/IFile'
import File from './file/File'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { useGetAllFilesQuery } from '../../../service/FilesAPI'
import './fileList.scss'
import Loader from '../../loader/Loader'

const FileList: FC = () => {
  const { currentDir } = useAppSelector((state) => state.filesReducer)
  const {
    data: files = [],
    isLoading: isLoadingFiles,
    isFetching: isFetchingFiles,
  } = useGetAllFilesQuery(currentDir)

  return (
    <div className='fileList'>
      <div className='fileList__header'>
        <div className='fileList__name'>Название</div>
        <div className='fileList__date'>Дата</div>
        <div className='fileList__size'>Размер</div>
      </div>

      {
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
      }

      {isLoadingFiles || isFetchingFiles ? <Loader type='main' /> : null}
      {files.length === 0 && !isLoadingFiles && !isFetchingFiles ? (
        <div>Файлов нет</div>
      ) : null}
    </div>
  )
}

export default FileList
