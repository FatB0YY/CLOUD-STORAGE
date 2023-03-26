const fs = require('fs')
const ApiError = require('../error/ApiError')
const File = require('../models/File')

class FileService {
  // принимает параметр file, это не физ файл, а
  // объект той модели, которую добавляем в бд
  createDir(file) {
    const filePath = this.getPath(file)
    return new Promise((resolve, reject) => {
      try {
        if (!fs.existsSync(filePath)) {
          fs.mkdirSync(filePath)
          return resolve({ message: 'Файл создан' })
        } else {
          return reject({ message: 'Файл или папка уже существует' })
        }
      } catch (error) {
        return reject({ message: 'Ошибка файла' })
      }
    }).catch((error) => {
      throw ApiError.internalError(error.message, error)
    })
  }

  getPath(file) {
    return `${process.env.FILEPATH}\\${file.user}\\${file.path}`
  }

  async deleteFile(file, user) {
    user.usedSpace = user.usedSpace - file.size
    const path = this.getPath(file)
    await file.remove()
    fs.unlinkSync(path)
  }

  async deleteFolderRecursive(folder, user) {
    if (folder.childs.length === 0) {
      // если папка пустая, удаляем ее из базы данных и с компьютера
      const folderPath = this.getPath(folder)
      await folder.remove()
      fs.rmdirSync(folderPath, { recursive: true })
      return
    }

    for (const childId of folder.childs) {
      const child = await File.findById(childId)
      if (child.type === 'dir') {
        await this.deleteFolderRecursive(child, user)
      } else {
        await this.deleteFile(child, user)
      }
    }

    // после удаления всех файлов и подпапок удаляем саму папку из базы данных и с компьютера
    const folderPath = this.getPath(folder)
    await folder.remove()
    fs.rmdirSync(folderPath, { recursive: true })
  }
}

module.exports = new FileService()
