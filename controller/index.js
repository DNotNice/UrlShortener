const shortId = require('shortid')
const URL  = require('../models/index.js') 

async function generateShortURL(req ,res){
    const ogurl = req.body.url 
    if(!ogurl) return res.status(400).json({err : 'no url passed'})
    const sid = shortId.generate();
    await URL.create({

        shortId : sid,
        redirectUrl : ogurl ,
        visitedHistory : [],
        createdBy : req.user._id
    })
    const allUrls = await URL.find({ createdBy : req.user._id})

    return res.render("home" ,{
        urls:allUrls
    })
}

async function redirectURL(req ,res){
        const shortId  =  req.params.shortId
          await URL.findOneAndUpdate({
            shortId
        },{ $push: {
            visitedHistory : {
                timeStamps : Date.now(),
            }
        }}) 
        const temp = await URL.findOne({shortId});
        res.redirect(temp.redirectUrl)
}

async function getAnalytics(req, res){
    const shortId = req.params.id
     const result  = await URL.findOne({shortId})
     return res.status(200).json({
        "Clicks" : result.visitedHistory.length ,
        "analytics" : result.visitedHistory
     })
}
module.exports = {generateShortURL  , redirectURL , getAnalytics  }