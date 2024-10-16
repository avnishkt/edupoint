
const express = require('express');
const { createUser, deleteUser } = require('../controllers/user'); 
const router = express.Router();

// POST route to create a user
router.post('/create', createUser); 
router.delete('/del',deleteUser)

module.exports = router;
