const fs = require('fs')
const config = require('config')
const File = require('../models/File')

class FileService {
  // создание папки
  // принимает параметр file, это не физ файл, а
  // объект той модели, которую добавляем в бд
  createDir(file) {
    const filePath = `${config.get('FILEPATH')}\\${file.user}\\${file.path}`
    return new Promise((resolve, reject) => {
      try {
        if (!fs.existsSync(filePath)) {
          fs.mkdirSync(filePath)
          return resolve({ message: 'File was created' })
        } else {
          return reject({ message: 'File already exist' })
        }
      } catch (error) {
        console.log(error)
        return reject({ message: 'File error' })
      }
    })
  }
}

module.exports = new FileService()
