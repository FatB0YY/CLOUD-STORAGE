const { Schema, model, ObjectId } = require('mongoose')

const FileSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  accessLink: { type: String },
  size: { type: Number, default: 0 },
  date: {type: String, default: Date.now()},
  path: { type: String, default: '' },
  user: { type: ObjectId, ref: 'User' },
  parent: { type: ObjectId, ref: 'File' },
  childs: [{ type: ObjectId, ref: 'File' }],
})

module.exports = model('File', FileSchema)
