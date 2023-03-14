const { JsonWebTokenError } = require('jsonwebtoken')
const ApiError = require('../error/ApiError')
const tokenService = require('../service/token-service')
const UserDto = require('../dtos/user-dto')

module.exports = function authCheckMiddleware(req, res, next) {
  if (req.method === 'OPTIONS') {
    next()
  }

  try {
    const authorizationHeader = req.headers.authorization
    if (!authorizationHeader) {
      return next(ApiError.unauthorized())
    }

    const token = authorizationHeader.split(' ')[1]
    if (!token) {
      return next(ApiError.jsonWebTokenError())
    }

    const user = tokenService.validateAccessToken(token)
    if (!user || user instanceof JsonWebTokenError) {
      return next(ApiError.jsonWebTokenError())
    }

    const userDtoData = new UserDto(user)
    req.user = userDtoData
    next()
  } catch (error) {
    return next(ApiError.internalError(error))
  }
}
