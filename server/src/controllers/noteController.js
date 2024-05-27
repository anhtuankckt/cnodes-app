const noteModel = require('../models/noteModel')

exports.addNote = async (req, res) => {
  try {
    const { title, content, tags } = req.body
    const { id } = req.user
    if (!title || !content) return res.status(400).json({ msg: 'Fields required' })

    const note = new noteModel({
      title,
      content,
      tags: tags || [],
      userId: id
    })

    await note.save()

    return res.status(201).json({
      msg: 'Note added successfully',
      note
    })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}

exports.editNote = async (req, res) => {
  try {
    const { noteId } = req.params
    const { title, content, tags, isPinned } = req.body
    const { id } = req.user

    if (!title && !content && !tags) return res.status(400).json({ msg: 'No changes provided' })

    const note = await noteModel.findOne({ _id: noteId, userId: id })

    if (!note) return res.status(404).json({ msg: 'Note not found' })

    if (title) note.title = title
    if (content) note.content = content
    if (tags) note.tags = tags
    if (isPinned) note.isPinned = isPinned

    await note.save()

    return res.status(200).json({
      msg: 'Note update successfully',
      note
    })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}

exports.getAllNote = async (req, res) => {
  try {
    const { id } = req.user
    const notes = await noteModel.find({ userId: id })
      .sort({ isPinned: -1 })

    return res.status(200).json({
      msg: 'All notes retrieved successfully',
      notes
    })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}

exports.delNote = async (req, res) => {
  try {
    const { noteId } = req.params
    const { id } = req.user

    const note = await noteModel.findOne({ _id: noteId, userId: id })
    if (!note) return res.status(404).json({ msg: 'Note not found' })

    await noteModel.deleteOne({ _id: noteId, userId: id })
    return res.status(200).json({ msg: 'Note deleted successfully' })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}

exports.updatePinned = async (req, res) => {
  try {
    const { noteId } = req.params
    const { id } = req.user
    const { isPinned } = req.body

    const note = await noteModel.findOne({ _id: noteId, userId: id })
    if (!note) return res.status(404).json({ msg: 'Note not found' })

    note.isPinned = isPinned || false
    await note.save()

    return res.status(200).json({
      msg: 'Note updated successfully',
      note
    })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}