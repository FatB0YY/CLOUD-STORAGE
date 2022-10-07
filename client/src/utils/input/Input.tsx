import { FC } from 'react'
import './input.scss'

interface InputType {
  type: string
  placeholder: string
  value: string
  setValue: Function
  id: string
  name: string
}

const Input: FC<InputType> = (props) => {
  return <input onChange={(event) => props.setValue(event.target.value)} value={props.value} type={props.type} placeholder={props.placeholder} id={props.id} name={props.name}/>
}

export default Input
