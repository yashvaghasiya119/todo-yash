const jwt = require("jsonwebtoken")

function checklogin(req,res,next){
    let cookiecheck = req.cookies?.token
    
    if(!cookiecheck){
        return res.json({msg:"plese first login" , success:false})
    }
    let decode = jwt.verify(cookiecheck,"yash")
    req.user = decode
    next()
}

module.exports ={
    checklogin
}
