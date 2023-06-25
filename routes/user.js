const express = require('express')
const router = express.Router();
const {handleUserSignUp , login} = require('../controller/user')
router.post('/signup' ,handleUserSignUp ) 
router.post('/login' ,login ) 

module.exports = router;