const UserModel = require('../models/User')
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid')
const mailService = require('../service/mail-service')
const TokenService = require('../service/token-service')
const UserDto = require('../dtos/user-dto')
const congif = require('config')

class UserService {
  async registration(email, password) {
    const candidate = await UserModel.findOne({ email })

    if (candidate) {
      throw new Error(`Пользователь с почтовым адресом ${email} уже существует`)
    }

    const saltRounds = 10
    const hashPassword = await bcrypt.hash(password, saltRounds)
    const activationLink = uuidv4()

    const user = await UserModel.create({
      email,
      password: hashPassword,
      activationLink,
    })
    await mailService.sendActivationMail(
      email,
      `${congif.get('API_URL')}/api/activate/${activationLink}`
    )

    const userDto = new UserDto(user) // email, id, isActivated
    const tokens = TokenService.generateTokens({ ...userDto })

    await TokenService.saveToken(userDto.id, tokens.refreshToken)

    return {
      ...tokens,
      user: userDto,
    }
  }
}

module.exports = new UserService()
