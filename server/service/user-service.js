const UserModel = require('../models/User')
const bcrypt = require('bcrypt')
const UserDto = require('../dtos/user-dto')
const ApiError = require('../error/ApiError')
const tokenService = require('../service/token-service')

class UserService {
  async registration(email, password, name, surname) {
    const candidate = await UserModel.findOne({ email })

    if (candidate) {
      throw ApiError.BadRequest(
        `Пользователь с почтовым адресом ${email} уже существует`
      )
    }

    const salt = await bcrypt.genSalt()
    const hashPassword = await bcrypt.hash(password, salt)

    const user = await UserModel.create({
      email,
      password: hashPassword,
      name,
      surname,
    })

    const userDto = new UserDto(user) // email, id, usedSpace, diskSpace...

    const tokens = tokenService.generateTokens({
      ...userDto,
    })
    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return {
      ...tokens,
      user: userDto,
    }
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
      throw ApiError.unauthorized()
    }
    const userData = tokenService.validateRefreshToken(refreshToken)
    const tokenFromDb = await tokenService.findToken(refreshToken)

    if (!userData || !tokenFromDb) {
      throw ApiError.unauthorized()
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
      throw ApiError.internalError(error)
    }
  }
}

module.exports = new UserService()
