const { body } = require('express-validator')

const authSchema = [
  body('email')
    .trim()
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage('Обязательное поле!')
    .isLowercase()
    .isEmail()
    .withMessage('Некорректный Email'),
  body('password')
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage('Обязательное поле!')
    .isLength({ min: 8, max: 256 })
    .withMessage('Не менее 8 и не более 256 символов'),
]

module.exports = authSchema
