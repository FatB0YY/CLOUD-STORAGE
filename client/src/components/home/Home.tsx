import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import dazzleTeamCelebratingSuccessOfAWorkProject from '../../assets/img/dazzle-team-celebrating-success-of-a-work-project.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import Cloudstoragelogo from '../../assets/img/cloudstorage-logo.png'
import Accordion from '../accordion/Accordion'
import { data } from '../../assets/dataQuestion/data'
import mainphoto1 from '../../assets/img/mainphoto1.png'
import mainphoto2 from '../../assets/img/mainphoto2.png'
import mainphoto3 from '../../assets/img/mainphoto3.png'
import mainphoto4 from '../../assets/img/mainphoto4.png'
import mainphoto5 from '../../assets/img/mainphoto5.png'
import './home.scss'

const Home: FC = () => {
  return (
    <div className='container'>
      <div className='home'>
        <div className='home-titleblock'>
          <div className='home-titleblock-greeting'>
            <h1 className='home-titleblock-greeting__title'>
              CLOUD STORAGE
              <br />
              <span>все файлы в облаке</span>
            </h1>
            <p className='home-titleblock-greeting__description'>
              На Диске ваши файлы в безопасности — используйте их в любое время
              на любом устройстве.
            </p>
            <NavLink
              className='home-titleblock-greeting__registration'
              to={'/registration'}
            >
              Начать пользоваться
            </NavLink>
          </div>
          <div className='home__titleblock-img'>
            <img
              src={dazzleTeamCelebratingSuccessOfAWorkProject}
              alt='cs picture'
            />
          </div>
        </div>

        <div className='home-sizeblock'>
          <div className='home-sizeblock-img'>
            <img
              src={mainphoto5}
              alt='size picture'
              className='home-sizeblock__img home-sizeblock__img_5'
            />
            <img
              src={mainphoto1}
              alt='size picture'
              className='home-sizeblock__img home-sizeblock__img_1'
            />
            <img
              src={mainphoto2}
              alt='size picture'
              className='home-sizeblock__img home-sizeblock__img_2'
            />
          </div>
          <div className='home-sizeblock-desc'>
            <h2 className='home-sizeblock-desc__title'>
              Бесплатно до 10 гб <br /> на Диске
            </h2>
            <p className='home-sizeblock-desc__description'>
              Ещё больше места будет, когда я реализую такой функционал. Все
              файлы сохраняются в исходном качестве.
            </p>
          </div>
        </div>

        <div className='home-sharedblock'>
          <div className='home-sharedblock-img'>
            <img
              src={mainphoto4}
              alt='size picture'
              className='home-sizeblock__img home-sizeblock__img_4'
            />
            <img
              src={mainphoto3}
              alt='shared picture'
              className='home-sizeblock__img home-sizeblock__img_3'
            />
          </div>
          <div className='home-sharedblock-desc'>
            <h2 className='home-sharedblock-desc__title'>
              Открывайте совместный доступ
            </h2>
            <p className='home-sharedblock-desc__description'>
              Делитесь с друзьями файлами и папками, редактируйте документы
              вместе с коллегами.
            </p>
          </div>
        </div>

        <div className='home-card'>
          <div className='home-card-desc'>
            <h3 className='home-card-desc__title'>Диск</h3>
            <ul className='home-card-desc-list'>
              <li className='home-card-desc-list-pointListItem'>
                <div className='home-card-desc-list-pointListItem__containerIcon'>
                  <FontAwesomeIcon icon={solid('cloud')} className='icon' />
                </div>
                <span className='home-card-desc-list-pointListItem__text'>
                  Диск доступен всегда и везде — на компьютере, телефоне или
                  планшете.
                </span>
              </li>
              <li className='home-card-desc-list-pointListItem'>
                <div className='home-card-desc-list-pointListItem__containerIcon'>
                  <FontAwesomeIcon icon={solid('link')} className='icon' />
                </div>
                <span className='home-card-desc-list-pointListItem__text'>
                  Храните важные файлы на Диске. Ими легко делиться с близкими —
                  просто отправьте ссылку.
                </span>
              </li>
              <li className='home-card-desc-list-pointListItem'>
                <div className='home-card-desc-list-pointListItem__containerIcon'>
                  <FontAwesomeIcon icon={solid('lock')} className='icon' />
                </div>
                <span className='home-card-desc-list-pointListItem__text'>
                  Ваши файлы в безопасности.
                </span>
              </li>
            </ul>
          </div>
          <div className='home-card-img'>
            <img
              src={dazzleTeamCelebratingSuccessOfAWorkProject}
              alt='card picture'
            />
          </div>
        </div>

        <div className='home-cloudstorage'>
          <div className='home-cloudstorage__logoblock'>
            <img
              className='home-cloudstorage__logo'
              src={Cloudstoragelogo}
              alt='CLOUD STORAGE'
            />
            <div className='home-cloudstorage__title'>CLOUD STORAGE</div>
          </div>
        </div>

        <div className='home-questionblock'>
          <h4 className='home-questionblock__title'>Остались вопросы?</h4>
          <Accordion data={data} />
        </div>

        <div className='home-auth'>
          <NavLink className='home-auth__login' to={'/login'}>
            Войти
          </NavLink>
          <NavLink className='home-auth__registration' to={'/registration'}>
            Создать аккаунт
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default Home
