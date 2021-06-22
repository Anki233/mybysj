const Token = require('../../controllers/token')
const Constant = require('../../constant/constant')

const exportObj = {
    verifyToken
}

module.exports = exportObj

function verifyToken(req,res,next) {
    if (req.path === '/login' || req.path === '/register') return next()
    let token = req.headers.token
    //let token = req.body.token || req.query.token || req.headers['x-access-token']
    let tokenVerifyObj = Token.decrypt(token)
    if(tokenVerifyObj.token) {
        next()
    }else {
        res.json(Constant.TOKEN_ERROR)
    }
}