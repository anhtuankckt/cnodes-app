const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
    default: []
  },
  isPinned: {
    type: Boolean,
    default: false
  },
  userId: {
    type: String,
    required: true
  }
}, { timestamps: true, versionKey: false })

module.exports = mongoose.model('Note', noteSchema)