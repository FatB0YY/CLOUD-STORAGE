const fs = require('fs')
const ApiError = require('../error/ApiError')
const File = require('../models/File')

class FileService {
  // принимает параметр file, это не физ файл, а
  // объект той модели, которую добавляем в бд
  createDir(file, user) {
    const filePath = this.getPath(file)
    try {
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath)

        user.files.push(file._id)

        return { message: 'Папка создана' }
      } else {
        throw ApiError.BadRequest('Файл или папка уже существует.')
      }
    } catch (error) {
      throw ApiError.internalError(error.message, error)
    }
  }

  getPath(file) {
    return `${process.env.FILEPATH}\\${file.user}\\${file.path}`
  }

  async deleteFile(file, user) {
    user.usedSpace = user.usedSpace - file.size
    user.files = user.files.filter((id) => !file._id.equals(id))

    const parent = await File.findOne({
      _id: file.parent,
    })

    if (parent) {
      parent.childs = parent.childs.filter((childId) => !file._id.equals(childId))
      await parent.save()
    }

    const path = this.getPath(file)
    await file.remove()
    fs.unlinkSync(path)
  }

  async deleteFolderRecursive(folder, user) {
    if (folder.childs.length === 0) {
      // если папка пустая, удаляем ее из базы данных и с компьютера
      const folderPath = this.getPath(folder)
      user.files = user.files.filter((id) => !folder._id.equals(id))
      await folder.remove()
      await user.save()
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
    user.files = user.files.filter((id) => !folder._id.equals(id))
    await user.save()
    await folder.remove()
    fs.rmdirSync(folderPath, { recursive: true })
  }

  async getFiles(sort, parent, userId) {
    let files = null

    switch (sort) {
      case 'name':
        files = await File.find({
          user: userId,
          parent: parent,
        }).sort({ name: 1 })
        break
      case 'type':
        files = await File.find({
          user: userId,
          parent: parent,
        }).sort({ type: 1 })
        break
      case 'date':
        files = await File.find({
          user: userId,
          parent: parent,
        }).sort({ date: 1 })
        break

      default:
        files = await File.find({
          user: userId,
          parent: parent,
        })
    }

    return files
  }
}

module.exports = new FileService()
