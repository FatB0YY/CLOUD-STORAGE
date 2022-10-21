const fs = require('fs')
const config = require('config')
const File = require('../models/File')

class FileService {
  // создание папки
  // принимает параметр file, это не физ файл, а
  // объект той модели, которую добавляем в бд
  createDir(file) {
    const filePath = `${config.get('FILEPATH')}\\${file.user}\\${file.path}`
    console.log('1', filePath);
    return new Promise((resolve, reject) => {
      try {
        if (!fs.existsSync(filePath)) {
          fs.mkdirSync(filePath)
          return resolve({ message: 'Файл создан' })
        } else {
          return reject({ message: 'Файл уже существует' })
        }
      } catch (error) {
        console.log(error)
        return reject({ message: 'Ошибка файла' })
      }
    })
  }
}

module.exports = new FileService()
