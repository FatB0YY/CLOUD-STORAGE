const logger = require('../logger')

class ApiError extends Error {
  status
  errors

  constructor(status, message, errors = []) {
    super(message)
    this.status = status
    this.errors = errors
  }

  static BadRequest(message, errors = []) {
    return new ApiError(400, message)
  }

  static unauthorized() {
    return new ApiError(401, 'Не авторизован')
  }

  static tokenExpiredError() {
    return new ApiError(401, 'Срок действия токена истек')
  }

  static jsonWebTokenError() {
    return new ApiError(401, 'Недействительный токен')
  }

  static forbiddenError() {
    return new ApiError(403, 'Запрещенный')
  }

  static internalError(error) {
    logger.error(error)
    return new ApiError(500, 'Внутренняя ошибка сервера')
  }
}

module.exports = ApiError
