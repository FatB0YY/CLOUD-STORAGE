const ApiError = require('./ApiError')
const logger = require('../logger/index')

function apiErrorHandler(err, req, res, next) {
  // запись в журнал
  if (Array.isArray(err) && err.length) {
    err.forEach((error) => {
      logger.error(error)
    })
  } else {
    logger.error(err)
  }

  if (err instanceof ApiError && err.status !== 500) {
    res.status(err.status).json({ message: err.message, errors: err.errors })
    return
  }

  // Обработка других ошибок
  if (err instanceof SyntaxError) {
    res.status(400).json({ message: 'Некорректный запрос' })
    return
  }

  if (err instanceof TypeError) {
    res.status(400).json({ message: 'Некорректные параметры запроса' })
    return
  }

  res.status(500).json({ message: 'Непредвиденная ошибка, повторите попытку позже.' })
}

module.exports = apiErrorHandler
