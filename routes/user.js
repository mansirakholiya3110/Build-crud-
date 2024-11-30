const express = require('express');
const router = express.Router();
const {registerUser,getAllUsers,deleteUser,updateUser,searchUsers, paginateUsers,deleteMultipleUsers} = require('../controllers/controllers');

// Register User
router.post('/register', registerUser);
router.get('/', getAllUsers);
router.delete('/:id', deleteUser);
router.put('/:id',updateUser);
router.get('/search', searchUsers);
router.get('/paginate', paginateUsers);
router.delete('/multiple', deleteMultipleUsers);

module.exports = router;
