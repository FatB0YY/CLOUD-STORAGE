module.exports = class UserDto {
  email
  id
  diskSpace
  usedSpace
  avatar
  files

  constructor(model) {
    this.email = model.email
    this.id = model.id || model._id
    this.diskSpace = model.diskSpace
    this.usedSpace = model.usedSpace
    this.avatar = model.avatar
    this.files = model.files
  }
}

// https://habr.com/ru/post/567040/
