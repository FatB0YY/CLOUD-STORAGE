const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  name: {
    type: String,
  },
  surname: {
    type: String,
  },
  diskSpace: { type: Number, default: 1024 ** 3 * 10 },
  usedSpace: { type: Number, default: 0 },
  avatar: { type: String, default: null },
  files: [{ type: Schema.Types.ObjectId, ref: 'File', default: [] }],
  isActivated: { type: Boolean, default: false },
  activationLink: { type: String },
})

module.exports = model('User', UserSchema)
