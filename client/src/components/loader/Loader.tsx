import { FC } from 'react'
import './loader.scss'

interface propType {
  type: string
}

const Loader: FC<propType> = ({ type }) => {
  switch (type) {
    case 'form':
      return (
        <div className='loader loader__form'>
          <div className='lds-dual-ring'></div>
        </div>
      )

    case 'main':
      return (
        <div className='loader loader__main'>
          <div className='lds-dual-ring'></div>
        </div>
      )
    default:
      return <div>Loading...</div>
  }
}

export default Loader
