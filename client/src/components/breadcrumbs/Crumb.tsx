import { FC } from 'react'
import { Link } from 'react-router-dom'
import { ICrumb } from '../../models/response/ICrumb'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

const Crumb: FC<{
  crumb: ICrumb
  index: number
}> = ({ crumb, index }) => {
  return (
    <span className='breadcrumb__crumb'>
      {index > 0 && (
        <FontAwesomeIcon
          icon={solid('angle-right')}
          className='breadcrumb__icon'
        />
      )}
      <Link className='breadcrumb__link' to={crumb.path}>
        {crumb.name}
      </Link>
    </span>
  )
}

export default Crumb
