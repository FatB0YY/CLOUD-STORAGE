const ApiError = require('./ApiError')
const logger = require('../logger/index')

function apiErrorHandler(err, req, res) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message })
  }

  // Обработка других ошибок
  if (err instanceof SyntaxError) {
    logger.error(err)
    return res.status(400).json({ message: 'Некорректный запрос' })
  }

  if (err instanceof TypeError) {
    logger.error(err)
    return res.status(400).json({ message: 'Некорректные параметры запроса' })
  }

  // запись в журнал
  if (Array.isArray(err) && err.length) {
    err.forEach((error) => {
      logger.error('Непредвиденная ошибка', { error })
    })
  } else {
    logger.error('Непредвиденная ошибка', err)
  }
  return res
    .status(500)
    .json({ message: 'Непредвиденная ошибка, повторите попытку позже.' })
}

module.exports = apiErrorHandler
