import { FC, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import {
  dirIdType,
  IFile,
  TypeSortOption,
} from '../../../models/response/IFile'
import File from './file/File'
import { useGetAllFilesQuery } from '../../../service/FilesAPI'
import './fileList.scss'
import iconnotfound from '../../../assets/img/iconnotfound.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import Loader from '../../loader/Loader'
import { popDirStack, setCurrentDir } from '../../../redux/reducers/FilesSlice'

const FileList: FC = () => {
  const [activeClass, setActiveClass] = useState(false)
  const [sortValueTextInSpan, setSortValueTextInSpan] = useState<null | string>(
    null
  )

  const [sortValue, setSort] = useState<TypeSortOption>(TypeSortOption.TYPE)
  const { currentDir: dirId, dirStack } = useAppSelector(
    (state) => state.filesReducer
  )
  const {
    data: files = [],
    isLoading: isLoadingFiles,
    isFetching: isFetchingFiles,
    refetch,
  } = useGetAllFilesQuery({ dirId, sortValue }, { refetchOnFocus: true })
  const dispatch = useAppDispatch()

  const backClickHandler = () => {
    const copy = [...dirStack]
    const backDirId: dirIdType = copy.pop()
    dispatch(setCurrentDir(backDirId))
    dispatch(popDirStack())
  }

  function changeSortValue(e: any) {
    e.preventDefault()
    e.stopPropagation()

    const str =
      e.target.textContent.charAt(0).toLowerCase() +
      e.target.textContent.slice(1)

    setSortValueTextInSpan(str)
    setSort(e.target.getAttribute('data-sort') as TypeSortOption)
    setActiveClass(false)
  }

  useEffect(() => {
    refetch()
  }, [sortValue, refetch])

  useEffect(() => {}, [activeClass, sortValueTextInSpan])

  function renderNotFoundContent() {
    return (
      <div className='fileList__notfound fileList-notfound'>
        <div className='fileList-notfound__icon'>
          <img src={iconnotfound} alt='not found files' />
        </div>
        <h1 className='fileList-notfound__title'>Все файлы</h1>
        <p className='fileList-notfound__desc'>
          Загружайте свои файлы любым удобным способом, можно даже перетащить в
          окно браузера.
        </p>
      </div>
    )
  }

  function renderFiles() {
    return files.map((file: IFile) => <File key={file._id} file={file} />)
  }

  const filesList = renderFiles()
  const notFoundContent =
    files.length === 0 && !isLoadingFiles && !isFetchingFiles
      ? renderNotFoundContent()
      : null
  const spinner =
    isLoadingFiles || isFetchingFiles ? <Loader type='main' /> : null

  return (
    <div className='fileList'>
      <div className='fileList__head fileList-head'>
        <h2 className='fileList-head__title'>
          {dirId ? (
            <button
              disabled={!dirId}
              className='fileList-head__back'
              onClick={() => backClickHandler()}
            >
              <FontAwesomeIcon icon={solid('arrow-left')} className='icon' />
            </button>
          ) : null}
          Все файлы
        </h2>
        <div className='fileList-head__settings'>
          <span className='fileList-head__sort'>
            <button
              type='button'
              className='fileList-head__buttonSort'
              role='listbox'
              onClick={() => setActiveClass((prevClass) => !prevClass)}
            >
              <span className='fileList-head__iconblock'>
                <FontAwesomeIcon
                  icon={solid('bars-staggered')}
                  className='icon'
                />
              </span>
              <span className='fileList-head__buttonText'>
                Сортировка по {sortValueTextInSpan}
              </span>
              <span
                className={
                  activeClass
                    ? 'fileList-head__iconblock fileList-head__iconblock_chevron active'
                    : 'fileList-head__iconblock fileList-head__iconblock_chevron'
                }
              >
                <FontAwesomeIcon
                  icon={solid('chevron-down')}
                  className='icon'
                />
              </span>
            </button>

            <div
              className={
                activeClass
                  ? 'fileList-head-sort__popup active'
                  : 'fileList-head-sort__popup'
              }
            >
              <div
                className='fileList-head-sort__item'
                data-sort={TypeSortOption.NAME}
                onClick={(e) => changeSortValue(e)}
              >
                <span className='fileList-head-sort__text'>Названию</span>
              </div>
              <div
                className='fileList-head-sort__item'
                data-sort={TypeSortOption.TYPE}
                onClick={(e) => changeSortValue(e)}
              >
                <span className='fileList-head-sort__text'>Типу</span>
              </div>
              <div
                className='fileList-head-sort__item'
                data-sort={TypeSortOption.DATE}
                onClick={(e) => changeSortValue(e)}
              >
                <span className='fileList-head-sort__text'>Дате</span>
              </div>
            </div>
          </span>
        </div>
      </div>

      <div
        className={
          files.length
            ? 'fileList__body'
            : 'fileList__body fileList__body_notfound'
        }
      >
        {filesList}
        {notFoundContent}
        {spinner}
      </div>
    </div>
  )
}

export default FileList
