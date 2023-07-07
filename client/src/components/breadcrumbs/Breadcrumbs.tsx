import { useEffect } from 'react'
import { useAppSelector } from '../../hooks/redux'
import Crumb from './Crumb'
import './breadcrumbs.scss'
import { ICrumb } from '../../models/response/IFile'

const Breadcrumbs = () => {
  const breadcrumbsStack = useAppSelector((state) => state.files.breadcrumbsStack)

  useEffect(() => {}, [breadcrumbsStack])

  return (
    <nav className='breadcrumb'>
      {breadcrumbsStack.map((crumb: ICrumb, index: number, array: ICrumb[]) => (
        <Crumb
          key={crumb.name}
          crumb={crumb}
          index={index}
        />
      ))}
    </nav>
  )
}

export default Breadcrumbs
