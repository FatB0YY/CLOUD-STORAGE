import { FC } from 'react'
import './loader.scss'

export enum TypesLoader {
  FORM = 'form',
  MAIN = 'main',
}

interface IPropLoader {
  type: TypesLoader
}

const Loader: FC<IPropLoader> = ({ type }) => {
  switch (type) {
    case TypesLoader.FORM:
      return (
        <div className='loader loader__form'>
          <div className='lds-dual-ring'></div>
        </div>
      )

    case TypesLoader.MAIN:
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
