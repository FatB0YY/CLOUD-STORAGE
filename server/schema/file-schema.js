const { body } = require('express-validator')

const fileSchema = [
  body('name')
    .trim()
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage('Некорректное название'),
]

module.exports = fileSchema
