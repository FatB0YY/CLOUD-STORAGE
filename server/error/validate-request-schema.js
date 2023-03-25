const ApiError = require('./ApiError')
const { validationResult } = require('express-validator')

function validateRequestSchema(req, res, next) {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    next(ApiError.badValidation(errors.array()))
    return
  }

  next()
}

module.exports = validateRequestSchema
