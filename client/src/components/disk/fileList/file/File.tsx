import { FC, memo } from 'react'
import { getExtensionIcon, IFile, TypeFile } from '../../../../models/response/IFile'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux'
import {
  pushToDirStack,
  setCurrentDir,
} from '../../../../redux/reducers/FilesSlice'
import { downloadFile } from '../../../../redux/reducers/ActionCreators'
import sizeFormat from '../../../../utils/sizeFormat'
import { useDeleteFileMutation } from '../../../../service/FilesAPI'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

import './file.scss'

interface Props {
  file: IFile
}

const File: FC<Props> = ({ file }) => {
  const [
    deleteTrigger,
    {
      isError: isErrorDelete,
      isLoading: isLoadingDelete,
      isUninitialized: isUninitializedDelete,
      error: errorDelete,
    },
  ] = useDeleteFileMutation()

  const { currentDir } = useAppSelector((state) => state.filesReducer)
  const dispatch = useAppDispatch()

  const openDirHandler = (file: IFile) => {
    if (file.type === TypeFile.DIR) {
      dispatch(pushToDirStack(currentDir))
      dispatch(setCurrentDir(file._id))
    }
  }

  const downloadClickHandler = (event: any) => {
    event.stopPropagation()
    dispatch(downloadFile(file))
  }

  const deleteClickHandler = async (event: any) => {
    event.stopPropagation()
    await deleteTrigger(file).unwrap()
  }

  if (isErrorDelete) {
    if (Array.isArray((errorDelete as any).data.error)) {
      ;(errorDelete as any).data.error.forEach((el: any) =>
        toast.error(el.message, {
          position: 'top-right',
        })
      )
    } else {
      toast.error((errorDelete as any).data.message, {
        position: 'top-right',
      })
    }
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
              onClick={(event) => downloadClickHandler(event)}
              className='file__btn file__download'
            >
              <FontAwesomeIcon icon={solid('download')} className='icon' />
            </button>
          ) : (
            <div className='file__btn file__btn_none'></div>
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
