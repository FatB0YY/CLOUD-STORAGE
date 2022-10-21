import { useAppSelector } from '../../../hooks/redux'
import { IFile } from '../../../models/response/IFile'
import File from './file/File'
import './fileList.scss'

const FileList = () => {
  const { files } = useAppSelector((state) => state.filesReducer)

  const fileList = files.map((file: IFile) => <File file={file} key={file._id}/>)
  
  return (
    <div className='fileList'>
      <div className='fileList__header'>
        <div className='fileList__name'>Название</div>
        <div className='fileList__date'>Дата</div>
        <div className='fileList__size'>Размер</div>
      </div>
      {fileList}
    </div>
  )
}

export default FileList
