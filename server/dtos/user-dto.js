module.exports = class UserDto {
    email;
    id;
    isActivated;

    constructor(model){
        this.email = model.email
        this.id = model._id
        this.isActivated = model.isActivated
    }
}

// https://habr.com/ru/post/567040/