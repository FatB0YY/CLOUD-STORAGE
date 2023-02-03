import { FC, memo } from 'react'
import { IFile, TypeFile } from '../../../../models/response/IFile'
import fileLogo from '../../../../assets/img/file.png'
import dirLogo from '../../../../assets/img/dir.png'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux'
import {
  pushToDirStack,
  setCurrentDir,
} from '../../../../redux/reducers/FilesSlice'
import { downloadFile } from '../../../../redux/reducers/ActionCreators'
import sizeFormat from '../../../../utils/sizeFormat'
import { useDeleteFileMutation } from '../../../../service/FilesAPI'
import { toast } from 'react-toastify'
import Loader from '../../../loader/Loader'
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
      isSuccess: isSuccessDelete,
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

  if (isSuccessDelete) {
    toast.success(
      `${file.type === TypeFile.DIR ? 'Папка удалена' : 'Файл удален'}`
    )
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
      <img
        src={file.type === TypeFile.DIR ? dirLogo : fileLogo}
        alt={file.type === TypeFile.DIR ? 'dir logo' : 'file logo'}
        className='file__img'
      />
      <div className='file__name'>{file.name}</div>
      <div className='file__date'>{file.date.slice(0, 10)}</div>
      <div className='file__size'>
        {file.size === 0 ? '-' : sizeFormat(file.size)}
      </div>

      {file.type !== TypeFile.DIR && (
        <button
          onClick={(event) => downloadClickHandler(event)}
          className='file__btn file__download'
        >
          Скачать
        </button>
      )}

      {(isLoadingDelete || !isUninitializedDelete) && !isErrorDelete ? (
        <div>Идет удаление...</div>
      ) : (
        <button
          disabled={isLoadingDelete}
          onClick={(event) => deleteClickHandler(event)}
          className='file__btn file__delete'
        >
          Удалить
        </button>
      )}
    </div>
  )
}

export default memo(File)
