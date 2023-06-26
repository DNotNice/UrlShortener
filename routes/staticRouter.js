const URL = require('../models/index')
const express =require('express')
const router = express.Router();
router.get('/' , async (req,res)=>{
    if(!req.user) return res.redirect('/login')
    const allUrls = await URL.find({ createdBy : req.user._id})
    return res.render("home" ,{
        urls:allUrls
    })
})
router.get('/forgotPassword' , async(req ,res)=>{
    res.render("forgotpassword")
})
router.get('/success' ,async (req,res)=>{
    const allUrls = await URL.find({ createdBy : req.user._id})
   //  const pre = 'http://localhost:8001/url/'
     res.render(
        "home" , {
            urls : allUrls
        }
     )
})
router.get('/signup' , (req, res)=>{
    res.render('signup')
})
router.get('/login' , (req, res)=>{
    res.render('login')
})
router.get('/signout' , (req,res)=>{
     res.clearCookie('uid')
     res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
     res.setHeader('Pragma', 'no-cache');
     res.setHeader('Expires', '0');
     res.status(200).json({
        message : 'please go to localhost://8001/'
     })
})
module.exports = router