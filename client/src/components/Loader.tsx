import {FC} from 'react'
import ballTriangleSvg from '../assets/img/ball-triangle.svg'

const Loader: FC = () => {
  return (
    <div>
      <img src={ballTriangleSvg} width="50" alt="loading..."></img>
    </div>
    
  )
}

export default Loader
