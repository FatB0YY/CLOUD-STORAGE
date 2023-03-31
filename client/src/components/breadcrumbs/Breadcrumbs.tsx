import { useEffect } from 'react'
import { useAppSelector } from '../../hooks/redux'
import { ICrumb } from '../../models/response/ICrumb'
import Crumb from './Crumb'
import './breadcrumbs.scss'

const Breadcrumbs = () => {
  const { breadcrumbStack } = useAppSelector((state) => state.filesReducer)

  useEffect(() => {}, [breadcrumbStack])

  return (
    <nav className='breadcrumb'>
      {breadcrumbStack.map((crumb: ICrumb, index: number, array: ICrumb[]) => (
        <Crumb key={crumb.name} crumb={crumb} index={index} />
      ))}
    </nav>
  )
}

export default Breadcrumbs
