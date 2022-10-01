const ApiError = require('../exeptions/api-error')
const tokenService = require('../service/token-service')

module.exports = function (req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization
    console.log('authorizationHeader', authorizationHeader);
    if (!authorizationHeader) {
      return next(ApiError.UnauthorizedError())
    }

    const accessToken = authorizationHeader.split(' ')[1]
    console.log('accessToken', accessToken);
    if (!accessToken) {
      return next(ApiError.UnauthorizedError())
    }
    const userData = tokenService.validateAccessToken(accessToken)
    if (!userData) {
      return next(ApiError.UnauthorizedError())
    }

    console.log('userData', userData);

    req.user = userData
    next()
  } catch (error) {
    return next(ApiError.UnauthorizedError())
  }
}
