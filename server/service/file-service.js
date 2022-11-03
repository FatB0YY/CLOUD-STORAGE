const fs = require('fs')
const config = require('config')
const File = require('../models/File')

class FileService {
  getPath(file){
    return `${config.get('FILEPATH')}\\${file.user}\\${file.path}`
  }


  // создание папки
  // принимает параметр file, это не физ файл, а
  // объект той модели, которую добавляем в бд
  createDir(file) {
    const filePath = `${config.get('FILEPATH')}\\${file.user}\\${file.path}`
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

  deleteFile(file){
    const path = this.getPath(file)
    if(file.type === 'dir'){
      fs.rmdirSync(path)
    } else {
      fs.unlinkSync(path)
    }
  }
}

module.exports = new FileService()
