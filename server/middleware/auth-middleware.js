const pkg = require('jsonwebtoken')
const ApiError = require('../error/ApiError')
const tokenService = require('../service/token-service')
const UserDto = require('../dtos/user-dto')

module.exports = function authCheckMiddleware(req, res, next) {
  if (req.method === 'OPTIONS') {
    next()
  }

  try {
    // получаем Header Authorization
    const authorizationHeader = req.headers.authorization
    if (!authorizationHeader) {
      return next(ApiError.unauthorized())
    }

    // проверяем тип токена
    const bearer = authorizationHeader.split(' ')[0]
    if (bearer !== 'Bearer') {
      return next(ApiError.forbiddenError())
    }

    // проверяем есть ли там токен
    const accessToken = authorizationHeader.split(' ')[1]
    if (!accessToken) {
      return next(ApiError.jsonWebTokenError())
    }

    // получаем данные из токена
    const userTokenData = tokenService.validateAccessToken(accessToken)

    // проверяем есть ли данные
    if (!userTokenData) {
      return next(ApiError.forbiddenError())
    }

    // проверяем токен
    if (userTokenData instanceof pkg.JsonWebTokenError) {
      return next(ApiError.jsonWebTokenError())
    }

    const userDto = new UserDto(userTokenData)
    req.user = userDto
    next()
  } catch (error) {
    return next(ApiError.internalError(error))
  }
}
