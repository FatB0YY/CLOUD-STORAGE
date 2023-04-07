import { FC, useState } from 'react'
import ItemAccordion from './ItemAccordion'
import { PropsAccordion } from '../../assets/dataQuestion/data'
import './accordion.scss'

const Accordion: FC<PropsAccordion> = ({ data }) => {
  const [selected, setSelected] = useState<null | number>(null)

  const toggle = (idx: number) => {
    if (selected === idx) {
      setSelected(null)
      return
    }

    setSelected(idx)
  }

  return (
    <div className='accordion'>
      {data.map((item, idx) => (
        <ItemAccordion
          key={`${idx}${item.question}`}
          answer={item.answer}
          question={item.question}
          toggle={() => toggle(idx)}
          selected={selected}
          idx={idx}
        />
      ))}
    </div>
  )
}

export default Accordion
