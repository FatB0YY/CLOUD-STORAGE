class ApiError extends Error {
  status
  errors
  name

  constructor(status, message, errors = []) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.errors = errors
  }

  static BadRequest(message) {
    return new ApiError(400, 'Некорректный запрос', [{ message }])
  }

  static badValidation(errors = []) {
    return new ApiError(422, 'Ошибка при валидации', errors)
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

  static internalError(message, errors) {
    return new ApiError(500, message, errors)
  }
}

module.exports = ApiError
