import { FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

const ItemAccordion: FC<any> = ({
  answer,
  question,
  toggle,
  selected,
  idx,
}) => {
  return (
    <div className='itemAccordion'>
      <div className='itemAccordion__title' onClick={toggle}>
        <h4>{question}</h4>
        <div className='itemAccordion__containerIcon'>
          <FontAwesomeIcon
            icon={solid('chevron-up')}
            className={
              selected === idx
                ? 'itemAccordion__icon icon itemAccordion__icon-up'
                : 'itemAccordion__icon icon itemAccordion__icon-down'
            }
          />
        </div>
      </div>
      <div
        className={
          selected === idx
            ? 'itemAccordion__contentShow'
            : 'itemAccordion__content'
        }
      >
        {answer}
      </div>
    </div>
  )
}

export default ItemAccordion
