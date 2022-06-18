const express = require('express');
const router = express.Router();
const {
    getAllUsers,
    getUserById,
    getAdminUsers,
    addUser,
    updateUserOnId,
    deleteUserOnId
} = require('../controller/userController');


// routes for user
router.get('/', getAllUsers);
router.get('/id/:id?', getUserById);
router.get('/admin', getAdminUsers);
router.post('/add', addUser);
router.put('/update/:id?', updateUserOnId);
router.delete('/delete/:id?', deleteUserOnId);

module.exports = router;