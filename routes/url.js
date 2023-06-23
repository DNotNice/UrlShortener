const express = require('express')
const{generateShortURL ,redirectURL , getAnalytics} = require('../controller/index.js')

const router = express.Router();
router.post('/' , generateShortURL)
router.get('/:shortId' , redirectURL)
router.get('/analytics/:id' , getAnalytics)
module.exports = router