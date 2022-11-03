import { FC } from 'react'
import { ThreeDots, Triangle } from 'react-loader-spinner'
import './loader.scss'

interface propType {
  type: string
}

const Loader: FC<propType> = ({ type }) => {
  switch (type) {
    case 'form':
      return (
        <ThreeDots
          height='80'
          width='80'
          radius='9'
          color='rgb(121, 121, 255)'
          ariaLabel='three-dots-loading'
          wrapperStyle={{}}
          wrapperClass='loader-form'
          visible={true}
        />
      )

    case 'main':
      return (
        <Triangle
          height='150'
          width='150'
          color='rgb(121, 121, 255)'
          ariaLabel='triangle-loading'
          wrapperStyle={{}}
          wrapperClass='loader-main'
          visible={true}
        />
      )
    default:
      return <div>Загрузка...</div>
  }
}

export default Loader
