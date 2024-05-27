const express = require('express')
const router = express.Router()
const noteController = require('../controllers/noteController')
const authMiddleware = require('../middlewares/authMiddleware')

// Add Note
router.post('/add', authMiddleware.authenticateToken, noteController.addNote)

// Edit Note
router.put('/edit/:noteId', authMiddleware.authenticateToken, noteController.editNote)

// Get All Note
router.get('/get-all', authMiddleware.authenticateToken, noteController.getAllNote)

// Delete Note
router.delete('/delete/:noteId', authMiddleware.authenticateToken, noteController.delNote)

// Update isPinned Value
router.put('/update-pinned/:noteId', authMiddleware.authenticateToken, noteController.updatePinned)

module.exports = router