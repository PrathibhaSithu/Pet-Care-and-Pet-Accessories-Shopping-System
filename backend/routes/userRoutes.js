const express = require('express');
const router = express.Router();
const {protect, admin} = require('../middleware/authMiddleware');

const { authUser, registerUser, getUserProfile, updateUserProfile, getUsers, deleteUser, getUserById, updateUser, getUserStats } = require('../controllers/userController')

router.post('/', registerUser)
router.post('/login', authUser)

router.get('/profile', protect, getUserProfile)
router.put('/profile', protect, updateUserProfile)

router.get('/', protect, admin, getUsers)
router.get('/:id', protect, admin, getUserById)
router.delete('/:id', protect, admin, deleteUser)
router.put('/:id', protect, admin, updateUser)
router.get('/stats', protect, admin, getUserStats)

module.exports = router;