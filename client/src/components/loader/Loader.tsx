import { FC } from 'react'
import './loader.scss'

interface propType {
  type: string
}

const Loader: FC<propType> = ({ type }) => {
  switch (type) {
    case 'form':
      return (
        <div>Loading...</div>
      )

    case 'main':
      return (
        <div>Loading...</div>
      )
    default:
      return <div>Loading...</div>
  }
}

export default Loader
