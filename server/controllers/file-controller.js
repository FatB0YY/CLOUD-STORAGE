const fileService = require('../service/file-service')
const User = require('../models/User')
const File = require('../models/File')
const fs = require('fs')
const ApiError = require('../error/ApiError')
const UserDto = require('../dtos/user-dto')
const { v4: uuidv4 } = require('uuid')
const archiver = require('archiver')
const path = require('path')
// const multer = require('multer')

class FileController {
  async createDir(req, res, next) {
    try {
      const { name, type, parent } = req.body
      const userId = req.user.id

      const user = await User.findById(userId)

      if (!user) {
        next(ApiError.BadRequest('Пользователь не найден!'))
        return
      }

      const file = new File({ name, type, parent, user: userId })
      const parentFile = await File.findOne({ _id: parent })

      if (!parentFile) {
        file.path = name
        fileService.createDir(file, user)
      } else {
        file.path = `${parentFile.path}\\${file.name}`
        fileService.createDir(file, user)
        parentFile.childs.push(file._id)
        await parentFile.save()
      }

      await file.save()
      await user.save()

      const userDto = new UserDto(user)

      return res.json({ file, user: userDto })
    } catch (error) {
      next(error)
    }
  }

  async getFiles(req, res, next) {
    try {
      const { sort, parent } = req.query
      const userId = req.user.id

      const files = await fileService.getFiles(sort, parent, userId)

      return res.json(files)
    } catch (error) {
      next(error)
    }
  }

  async uploadFile(req, res, next) {
    try {
      const file = req.files.file
      const tempPath = file.path
      const userId = req.user.id

      const parent = await File.findOne({
        user: userId,
        _id: req.body.parent,
      })
      const user = await User.findOne({ _id: userId })

      user.usedSpace = user.usedSpace + file.size

      let targetPath
      if (parent) {
        targetPath = `${process.env.FILEPATH}\\${user._id}\\${parent.path}\\${file.name}`
      } else {
        targetPath = `${process.env.FILEPATH}\\${user._id}\\${file.name}`
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

      user.files.push(dbFile._id)

      await dbFile.save()
      await user.save()

      if (parent) {
        parent.childs.push(dbFile._id)
        await parent.save()
      }

      const userDto = new UserDto(user)
      return res.json({ file: dbFile, user: userDto })
    } catch (error) {
      next(error)
    }
  }

  async downloadFile(req, res, next) {
    try {
      const file = await File.findOne({ _id: req.query.id, user: req.user.id })

      if (!file) {
        next(ApiError.BadRequest('Файл не найден'))
        return
      }

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

      if (!user) {
        next(ApiError.BadRequest('Пользователь не найден'))
        return
      }

      if (!file) {
        next(ApiError.BadRequest('Не найден'))
        return
      }

      if (file.type === 'dir') {
        await fileService.deleteFolderRecursive(file, user)
      } else {
        await fileService.deleteFile(file, user)
      }

      await user.save()

      const userDto = new UserDto(user)

      return res.json({ message: 'Удален', user: userDto })
    } catch (error) {
      next(error)
    }
  }

  async searchFile(req, res, next) {
    try {
      const searchName = req.query.search
      const userId = req.user.id

      if (searchName.trim() === '') {
        return res.json([])
      }

      const searchRegex = new RegExp(
        searchName
          .split(/\s+/)
          .map((word) => `(?=.*${word})`)
          .join('') + '.*',
        'i',
      )

      // Поиск по регулярному выражению
      const files = await File.find({ name: { $regex: searchRegex }, user: userId })

      return res.json(files)
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
          next(ApiError.internalError('Ошибка загрузки аватара', error))
          return
        }
      })
      user.avatar = avatarName
      await user.save()
      const userDto = new UserDto(user)
      return res.json(userDto)
    } catch (error) {
      next(error)
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
      next(error)
    }
  }

  async downloadFolder(req, res, next) {
    try {
      const { folderId } = req.query
      const rootFolder = await File.findById(folderId)
      const archiveName = `${rootFolder.name}.zip`
      const archivePath = path.join(__dirname, '../temp', archiveName)

      const output = fs.createWriteStream(archivePath)
      const archive = archiver('zip', { zlib: { level: 9 } })

      archive.pipe(output)

      const queue = [rootFolder]

      while (queue.length > 0) {
        const currentFolder = queue.shift()

        // Добавление файлов в архив
        for (const fileId of currentFolder.childs) {
          const file = await File.findById(fileId)
          const filePath = fileService.getPath(file)

          archive.file(filePath, { name: file.name })
        }

        // Добавление вложенных папок в очередь
        for (const folderId of currentFolder.childs) {
          const folder = await File.findById(folderId)

          if (folder.type === 'dir') {
            queue.push(folder)

            // Добавление файлов из вложенной папки в архив
            for (const fileId of folder.childs) {
              const file = await File.findById(fileId)
              const filePath = fileService.getPath(file)

              // Добавление файлов в архив, используя его относительный путь во вложенной папке
              const subfolderPath = path.relative(rootFolder.path, folder.path)
              archive.file(filePath, {
                name: path.join(subfolderPath, file.name),
              })
            }
          }
        }
      }

      archive.finalize()

      // Ждем завершения архивирования, прежде чем отправлять ответ и удалять архив
      output.on('close', function () {
        res.download(archivePath, archiveName, () => {
          fs.unlinkSync(archivePath)
        })
      })
    } catch (error) {
      next(error)
    }
  }

  async uploadFolder(req, res, next) {
    try {
    } catch (error) {
      next(error)
    }
  }

  async checkFile(req, res, next) {
    try {
      const { name: nameFile, size: sizeFile, parent: parentFile } = req.body
      const userId = req.user.id

      const parent = await File.findOne({
        user: userId,
        _id: parentFile,
      })
      const user = await User.findOne({ _id: userId })

      if (!user) {
        next(ApiError.BadRequest('Пользователь не найден'))
        return
      }

      if (sizeFile > 1024 ** 3 * 10) {
        next(ApiError.BadRequest('Максимальный размер файла 10ГБ'))
        return
      }

      if (user.usedSpace + sizeFile > user.diskSpace) {
        next(ApiError.BadRequest('Недостаточно места на диске'))
        return
      }

      let targetPath
      if (parent) {
        targetPath = `${process.env.FILEPATH}\\${user._id}\\${parent.path}\\${nameFile}`
      } else {
        targetPath = `${process.env.FILEPATH}\\${user._id}\\${nameFile}`
      }

      if (fs.existsSync(targetPath)) {
        next(ApiError.BadRequest('Файл уже существует'))
        return
      }

      return res.json({ check: true })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new FileController()
