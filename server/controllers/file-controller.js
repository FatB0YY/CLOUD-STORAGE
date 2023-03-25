const fileService = require('../service/file-service')
const User = require('../models/User')
const File = require('../models/File')
const fs = require('fs')
const ApiError = require('../error/ApiError')
const UserDto = require('../dtos/user-dto')
const { v4: uuidv4 } = require('uuid')

class FileController {
  async createDir(req, res, next) {
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
      next(error)
    }
  }

  async getFiles(req, res, next) {
    try {
      const { sort } = req.query
      let files

      switch (sort) {
        case 'name':
          files = await File.find({
            user: req.user.id,
            parent: req.query.parent,
          }).sort({ name: 1 })
          break
        case 'type':
          files = await File.find({
            user: req.user.id,
            parent: req.query.parent,
          }).sort({ type: 1 })
          break
        case 'date':
          files = await File.find({
            user: req.user.id,
            parent: req.query.parent,
          }).sort({ date: 1 })
          break

        default:
          files = await File.find({
            user: req.user.id,
            parent: req.query.parent,
          })
      }

      return res.json(files)
    } catch (error) {
      next(error)
    }
  }

  async uploadFile(req, res, next) {
    try {
      const file = req.files.file
      const tempPath = file.path

      const parent = await File.findOne({
        user: req.user.id,
        _id: req.body.parent,
      })
      const user = await User.findOne({ _id: req.user.id })

      if (user.usedSpace + file.size > user.diskSpace) {
        next(ApiError.BadRequest('Недостаточно места на диске'))
        return
      }

      user.usedSpace = user.usedSpace + file.size

      let targetPath
      if (parent) {
        targetPath = `${process.env.FILEPATH}\\${user._id}\\${parent.path}\\${file.name}`
      } else {
        targetPath = `${process.env.FILEPATH}\\${user._id}\\${file.name}`
      }

      if (fs.existsSync(targetPath)) {
        next(ApiError.BadRequest('Файл уже существует'))
        return
      }

      await fs.rename(tempPath, targetPath, (error) => {
        if (error) {
          next(ApiError.internalError(error))
          return
        }
      })

      const type = file.name.split('.').pop()
      let filePath = file.name

      if (parent) {
        filePath = `${parent.path}\\${file.name}`
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

      const userDto = new UserDto(user)

      return res.json({ file: dbFile, user: userDto })
    } catch (error) {
      next(error)
    }
  }

  async downloadFile(req, res, next) {
    try {
      const file = await File.findOne({ _id: req.query.id, user: req.user.id })
      const path = fileService.getPath(file)

      if (fs.existsSync(path)) {
        return res.download(path, file.name)
      }

      return ApiError.BadRequest('Ошибка при скачивании')
    } catch (error) {
      next(error)
    }
  }

  async deleteFile(req, res, next) {
    try {
      const file = await File.findOne({ _id: req.query.id, user: req.user.id })
      const user = await User.findOne({ _id: req.user.id })

      if (!file) {
        next(ApiError.BadRequest('Не найден'))
        return
      }
      fileService.deleteFile(file)
      user.usedSpace = user.usedSpace - file.size

      await user.save()
      await file.remove()

      const userDto = new UserDto(user)

      return res.json({ message: 'Удален', user: userDto })
    } catch (error) {
      next(ApiError.BadRequest('Папка не пуста', error))
    }
  }

  async searchFile(req, res, next) {
    try {
      const searchName = req.query.search

      let files = await File.find({ user: req.user.id })

      if (searchName.trim() == '') {
        return res.json([])
      } else {
        files = files.filter((file) =>
          file.name.toLowerCase().includes(searchName.toLowerCase())
        )
        return res.json(files)
      }
    } catch (error) {
      next(error)
    }
  }

  async uploadAvatar(req, res, next) {
    try {
      const file = req.files.file
      const tempPath = file.path
      const user = await User.findById(req.user.id)
      const avatarName = `avatar${uuidv4()}.jpg`

      const targetPath = process.env.STATICPATH + '\\' + avatarName

      await fs.rename(tempPath, targetPath, (error) => {
        if (error) {
          next(ApiError.internalError(error))
          return
        }
      })
      user.avatar = avatarName
      await user.save()
      const userDto = new UserDto(user)
      return res.json(userDto)
    } catch (error) {
      next(ApiError.BadRequest('Ошибка загрузки аватара', error))
    }
  }

  async deleteAvatar(req, res, next) {
    try {
      const user = await User.findById(req.user.id)
      fs.unlinkSync(process.env.STATICPATH + '\\' + user.avatar)
      user.avatar = null
      await user.save()
      const userDto = new UserDto(user)
      return res.json(userDto)
    } catch (error) {
      next(ApiError.BadRequest('Ошибка удаления аватара', error))
    }
  }
}

module.exports = new FileController()

// рекурсивное удаление
// https://www.mousedc.ru/learning/482-rekursivnyy-obkhod-faylov-nodejs/
// const fs = require("fs");
// const path = require("path");

// function deleteDirectoryRecursive(dir) {
//   if (fs.existsSync(dir)) {
//     fs.readdirSync(dir).forEach(function (file, index) {
//       const curPath = path.join(dir, file);
//       if (fs.lstatSync(curPath).isDirectory()) {
//         // recurse
//         deleteDirectoryRecursive(curPath);
//       } else {
//         // delete file
//         fs.unlinkSync(curPath);
//       }
//     });
//     fs.rmdirSync(dir);
//   }
// }
