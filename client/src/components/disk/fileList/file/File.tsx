import { FC, memo } from 'react'
import {
  getExtensionIcon,
  IFile,
  TypeFile,
} from '../../../../models/response/IFile'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux'
import {
  pushToBreadcrumbsStack,
  pushToDirStack,
  setCurrentDir,
} from '../../../../redux/reducers/FilesSlice'
import {
  downloadFile,
  downloadFolder,
} from '../../../../redux/reducers/ActionCreators'
import sizeFormat from '../../../../utils/sizeFormat'
import { useDeleteFileMutation } from '../../../../service/FilesAPI'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

import './file.scss'

interface IFileProps {
  file: IFile
}

const File: FC<IFileProps> = ({ file }) => {
  const [
    deleteTrigger,
    {
      isError: isErrorDelete,
      isLoading: isLoadingDelete,
      isUninitialized: isUninitializedDelete,
    },
  ] = useDeleteFileMutation()

  const { currentDir } = useAppSelector((state) => state.filesReducer)
  const dispatch = useAppDispatch()

  const openDirHandler = (file: IFile) => {
    if (file.type === TypeFile.DIR) {
      dispatch(pushToDirStack(currentDir))

      dispatch(
        pushToBreadcrumbsStack({
          dirId: file._id,
          name: file.name,
          path: file.path,
        })
      )

      dispatch(
        setCurrentDir({
          dirId: file._id,
          name: file.name,
          path: file.path,
        })
      )
    }
  }

  const downloadFileClickHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()
    event.stopPropagation()
    dispatch(downloadFile(file))
  }

  const downloadFolderClickHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()
    event.stopPropagation()
    dispatch(downloadFolder(file))
  }

  const deleteClickHandler = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()
    event.stopPropagation()
    await deleteTrigger(file).unwrap()
  }

  return (
    <div className='file' onClick={() => openDirHandler(file)}>
      <div className='file__icon'>
        <img
          src={getExtensionIcon(file.type)}
          alt={file.type}
          className='file__img'
        />
      </div>

      <div className='file__info'>
        <div className='file__title'>
          <span className='file__name'>{file.name}</span>
        </div>
        <div className='file__date'>{file.date.slice(0, 10)}</div>
        <div className='file__size'>
          {file.size === 0 ? '-' : sizeFormat(file.size)}
        </div>

        <div className='file__btns'>
          {file.type !== TypeFile.DIR ? (
            <button
              onClick={(event) => downloadFileClickHandler(event)}
              className='file__btn file__download'
            >
              <FontAwesomeIcon icon={solid('download')} className='icon' />
            </button>
          ) : (
            <button
              onClick={(event) => downloadFolderClickHandler(event)}
              className='file__btn file__download'
            >
              <FontAwesomeIcon icon={solid('download')} className='icon' />
            </button>
          )}

          {(isLoadingDelete || !isUninitializedDelete) && !isErrorDelete ? (
            <FontAwesomeIcon
              icon={solid('spinner')}
              className='icon icon-spinner'
            />
          ) : (
            <button
              disabled={isLoadingDelete}
              onClick={(event) => deleteClickHandler(event)}
              className='file__btn file__delete'
            >
              <FontAwesomeIcon icon={solid('trash')} className='icon' />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default memo(File)
