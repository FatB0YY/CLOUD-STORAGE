const jwt = require('jsonwebtoken')
const congif = require('config')
const tokenModel = require('../models/Token')

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, congif.get('JWT_ACCESS_SECRET'), {
      expiresIn: '30m',
    })
    const refreshToken = jwt.sign(payload, congif.get('JWT_REFRESH_SECRET'), {
      expiresIn: '30d',
    })
    return {
      accessToken,
      refreshToken,
    }
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await tokenModel.findOne({ user: userId })
    if (tokenData) {
      tokenData.refreshToken = refreshToken
      return tokenData.save()
    }
    const token = await tokenModel.create({ user: userId, refreshToken })
    return token
  }

  async removeToken(refreshToken) {
    const tokenData = await tokenModel.deleteOne({refreshToken})
    return tokenData
  }

  async findToken(refreshToken) {
    const tokenData = await tokenModel.findOne({refreshToken})
    return tokenData
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, congif.get('JWT_ACCESS_SECRET'))
      return userData
    } catch (error) {
      return null
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, congif.get('JWT_REFRESH_SECRET'))
      return userData
    } catch (error) {
      return null
    }
  }


}

module.exports = new TokenService()
