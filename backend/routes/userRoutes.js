const express = require('express');
const router = express.Router();

const { registerUser, loginUser, updateUser } = require('../controllers/userController');

router.post('/register', registerUser);

router.post('/login', loginUser);

router.put('/user/update/:id', updateUser);

module.exports = router;