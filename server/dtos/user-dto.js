module.exports = class UserDto {
    email;
    id;
    isActivated;
    // diskSpace;
    // usedSpace;
    // avatar;

    constructor(model){
        this.email = model.email
        this.id = model._id
        this.isActivated = model.isActivated
        // this.diskSpace = model.diskSpace
        // this.usedSpace = model.usedSpace
        // this.avatar = model.avatar
    }
}

// https://habr.com/ru/post/567040/