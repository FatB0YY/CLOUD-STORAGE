module.exports = class UserDto {
  email
  id
  diskSpace
  usedSpace
  avatar

  constructor(model) {
    this.email = model.email
    this.id = model.id || model._id
    this.diskSpace = model.diskSpace
    this.usedSpace = model.usedSpace
    this.avatar = model.avatar
  }
}

// https://habr.com/ru/post/567040/
