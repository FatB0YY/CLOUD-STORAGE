const fileService = require('../service/file-service')
const User = require('../models/User')
const File = require('../models/File')
const config = require('config')
const fs = require('fs')

class FileController {
  async createDir(req, res) {
    try {
      const { name, type, parent } = req.body
      const file = new File({ name, type, parent, user: req.user.id })
      const parentFile = await File.findOne({ _id: parent })
      if (!parentFile) {
        file.path = name
        await fileService.createDir(file)
      } else {
        file.path = `${parentFile.path}\\${file.name}`
        await fileService.createDir(file)
        parentFile.childs.push(file._id)
        await parentFile.save()
      }
      await file.save()
      return res.json(file)
    } catch (error) {
      console.log(error)
      return res.status(400).json(error)
    }
  }

  async getFiles(req, res) {
    try {
      const files = await File.find({
        user: req.user.id,
        parent: req.query.parent,
      })
      return res.json(files)
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Не удалось получить список файлов' })
    }
  }

  async uploadFile(req, res) {
    try {
      const file = req.files.file

      const parent = await File.findOne({
        user: req.user.id,
        _id: req.body.parent,
      })
      const user = await User.findOne({ _id: req.user.id })

      if (user.usedSpace + file.size > user.diskSpace) {
        return res.status(400).json({ message: 'Недостаточно места на диске' })
      }

      user.usedSpace = user.usedSpace + file.size

      let path
      if (parent) {
        path = `${config.get('FILEPATH')}\\${user._id}\\${parent.path}\\${
          file.name
        }`
      } else {
        path = `${config.get('FILEPATH')}\\${user._id}\\${file.name}`
      }

      if (fs.existsSync(path)) {
        return res.status(400).json({ message: 'Файл уже существует' })
      }

      file.mv(path)

      const type = file.name.split('.').pop()
      let filePath = file.name
      if (parent) {
        filePath = `${parent.file}\\${file.name}`
      }
      const dbFile = new File({
        name: file.name,
        type,
        size: file.size,
        path: filePath,
        parent: parent?._id,
        user: user._id,
      })

      await dbFile.save()
      await user.save()

      return res.json(dbFile)
    } catch (error) {
      console.log(error)
      return res.status(500).json('На диске нет места')
    }
  }

  async downloadFile(req, res) {
    try {
      const file = await File.findOne({ _id: req.query.id, user: req.user.id })
      const path = `${config.get('FILEPATH')}\\${req.user.id}\\${file.path}`
      if (fs.existsSync(path)) {
        return res.download(path, file.name)
      }
      return res.status(400).json({ message: 'Ошибка при скачивании' })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'Ошибка при скачивании' })
    }
  }

  async deleteFile(req, res) {
    try {
      const file = await File.findOne({ _id: req.query.id, user: req.user.id })
      if (!file) {
        return res.status(400).json({ message: 'Файл не найден' })
      }
      fileService.deleteFile(file)
      await file.remove()
      return res.json({ message: 'Файл удален' })
    } catch (error) {
      console.log(error)
      return res.status(400).json({message: "Папка не пуста"})
    }
  }
}

module.exports = new FileController()
