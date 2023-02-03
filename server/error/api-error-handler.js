const ApiError = require('./ApiError')
const logger = require('../logger/index')

function apiErrorHandler(err, req, res, next) {
  if (err instanceof ApiError) {
    return res
      .status(err.code)
      .json({ message: err.message, errors: err.errors })
  }

  const errorMsg = `Непредвиденная ошибка: ${err}`
  logger.error(errorMsg, err)
  return res.status(500).json({ message: 'Непредвиденная ошибка, повторите попытку позже.' })
}

module.exports = apiErrorHandler
