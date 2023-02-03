const logger = require('../logger/index')

class ApiError extends Error {
  code
  errors

  constructor(code, message, errors = []) {
    super(message)
    this.code = code
    this.errors = errors
  }

  static BadRequest(msg, errors = []) {
    // запись в журнал
    if (Array.isArray(errors) && errors.length) {
      errors.forEach((error) => {
        logger.error(msg, { error })
      })
    } else {
      logger.error(msg)
    }

    return new ApiError(400, msg, errors)
  }

  static UnauthorizedError() {
    logger.error('Пользователь не авторизован')
    return new ApiError(401, 'Пользователь не авторизован')
  }

  static internal(msg, error) {
    logger.error(msg, error)
    return new ApiError(500, msg)
  }
}

module.exports = ApiError
