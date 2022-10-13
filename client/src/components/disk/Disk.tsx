import { FC, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { getFiles } from '../../redux/reducers/ActionCreators'
import FileList from './fileList/FileList'

import './disk.scss'

const Disk: FC = () => {
  const dispatch = useAppDispatch()
  const { currentDir } = useAppSelector((state) => state.filesReducer)

  useEffect(() => {
    dispatch(getFiles(currentDir))
  }, [currentDir])

  return (
    <div className='disk'> 
      <div className="disk__btns">
        <button className="disk__back">Назад</button>
        <button className='disk__create'>Создать папку</button>
      </div>
      <FileList />
    </div>
  )
}

export default Disk
