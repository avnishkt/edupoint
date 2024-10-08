
const express = require('express');
const { createUser } = require('../controllers/user'); 
const router = express.Router();

// POST route to create a user
router.post('/create', createUser); 

module.exports = router;
