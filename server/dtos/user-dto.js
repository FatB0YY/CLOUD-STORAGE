module.exports = class UserDto {
  email
  id
  name
  surname
  diskSpace
  usedSpace
  avatar
  files

  constructor(model) {
    this.email = model.email
    this.id = model.id || model._id
    this.name = model.name
    this.surname = model.surname
    this.diskSpace = model.diskSpace
    this.usedSpace = model.usedSpace
    this.avatar = model.avatar
    this.files = model.files
  }
}

// https://habr.com/ru/post/567040/
