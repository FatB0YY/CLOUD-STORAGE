const { Schema, model, ObjectId } = require('mongoose')

const TokenSchema = new Schema({
    refreshToken: {type: String, required: true},
    user: {type: ObjectId, ref: 'User'} 
})

module.exports = model('Token', TokenSchema);