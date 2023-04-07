import { FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
// import { removeIFileDirAfterIndex } from '../../redux/reducers/FilesSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { ICrumb } from '../../models/response/IFile'
import {
  removeBreadcrumbsAfterIndex,
  removeICrumbAfterIndex,
  setCurrentDir,
} from '../../redux/reducers/FilesSlice'

interface IPropsCrumb {
  crumb: ICrumb
  index: number
}

const Crumb: FC<IPropsCrumb> = ({ crumb, index }) => {
  const { currentDir } = useAppSelector((state) => state.filesReducer)
  const dispatch = useAppDispatch()

  const clickCrumbHandler = () => {
    if (crumb.dirId !== currentDir.dirId) {
      dispatch(setCurrentDir(crumb))
      dispatch(removeICrumbAfterIndex(crumb))
      dispatch(removeBreadcrumbsAfterIndex(crumb))
    }
  }

  return (
    <span
      className={
        crumb.dirId === currentDir.dirId
          ? 'breadcrumb__crumb active'
          : 'breadcrumb__crumb'
      }
      onClick={clickCrumbHandler}
    >
      {index > 0 && (
        <FontAwesomeIcon
          icon={solid('angle-right')}
          className='breadcrumb__icon'
        />
      )}
      <span className='breadcrumb__link'>{crumb.name}</span>
    </span>
  )
}

export default Crumb
