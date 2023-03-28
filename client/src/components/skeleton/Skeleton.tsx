import './skeleton.scss'

const Skeleton = () => {
  return (
    <div className='skeleton'>
      <div className='skeleton__file-list'>
        <div className='skeleton__file-item skeleton__skeleton-animation'>
          <div className='skeleton__header'>
            <div className='skeleton__icon'></div>
            <div className='skeleton__name'></div>
          </div>
          <div className='skeleton__footer'>
            <div className='skeleton__date'></div>
            <div className='skeleton__btn'></div>
            <div className='skeleton__btn'></div>
          </div>
        </div>
        <div className='skeleton__file-item skeleton__skeleton-animation'>
          <div className='skeleton__header'>
            <div className='skeleton__icon'></div>
            <div className='skeleton__name'></div>
          </div>
          <div className='skeleton__footer'>
            <div className='skeleton__date'></div>
            <div className='skeleton__btn'></div>
            <div className='skeleton__btn'></div>
          </div>
        </div>
        <div className='skeleton__file-item skeleton__skeleton-animation'>
          <div className='skeleton__header'>
            <div className='skeleton__icon'></div>
            <div className='skeleton__name'></div>
          </div>
          <div className='skeleton__footer'>
            <div className='skeleton__date'></div>
            <div className='skeleton__btn'></div>
            <div className='skeleton__btn'></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Skeleton
