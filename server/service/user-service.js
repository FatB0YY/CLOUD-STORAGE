const UserModel = require('../models/User')
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid')
const mailService = require('../service/mail-service')
const UserDto = require('../dtos/user-dto')
const ApiError = require('../error/ApiError')
const tokenService = require('../service/token-service')

class UserService {
  async registration(email, password) {
    const candidate = await UserModel.findOne({ email })

    if (candidate) {
      throw ApiError.BadRequest(
        `Пользователь с почтовым адресом ${email} уже существует`
      )
    }

    const salt = await bcrypt.genSalt()
    const hashPassword = await bcrypt.hash(password, salt)
    const activationLink = uuidv4()

    const user = await UserModel.create({
      email,
      password: hashPassword,
      activationLink,
    })

    // await mailService.sendActivationMail(
    //   email,
    //   `${process.env.API_URL}/api/auth/activate/${activationLink}`
    // )

    const userDto = new UserDto(user) // email, id, isActivated

    const tokens = tokenService.generateTokens({
      ...userDto,
    })
    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return {
      ...tokens,
      user: userDto,
    }
  }

  async activate(activationLink) {
    const user = await UserModel.findOne({ activationLink })
    if (!user) {
      throw ApiError.BadRequest('Неккоректная ссылка для активации')
    }
    user.isActivated = true
    await user.save()
  }

  async login(email, password) {
    const user = await UserModel.findOne({ email })
    if (!user) {
      throw ApiError.BadRequest('Пользователь с таким Email не найден')
    }
    const isPassEquals = await bcrypt.compare(password, user.password)
    if (!isPassEquals) {
      throw ApiError.BadRequest('Неверный пароль')
    }
    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({ ...userDto })
    await tokenService.saveToken(userDto.id, tokens.refreshToken)
    return {
      ...tokens,
      user: userDto,
    }
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken)
    return token
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError()
    }
    const userData = tokenService.validateRefreshToken(refreshToken)
    const tokenFromDb = await tokenService.findToken(refreshToken)

    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError()
    }

    const user = await UserModel.findById(userData.id)
    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({ ...userDto })
    await tokenService.saveToken(userDto.id, tokens.refreshToken)
    return {
      ...tokens,
      user: userDto,
    }
  }

  async getAllUsers() {
    try {
      const users = await UserModel.find()
      const dtoUsers = users.map((user) => new UserDto(user))
      return dtoUsers
    } catch (error) {
      throw ApiError.internal('Не удалось получить список пользователей', error)
    }
  }
}

module.exports = new UserService()
