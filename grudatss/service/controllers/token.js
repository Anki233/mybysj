const jwt = require('jsonwebtoken')
const tokenKey = 'Rng@uzi#and$jkl'   //密钥，用来加密和解密Token

const Token = {
    //加密方法
    encrypt: function(data,time) {
        return jwt.sign(data,tokenKey,{expiresIn: time})
    },
    //解密方法
    decrypt: function(token) {
        try{
            let data = jwt.verify(token,tokenKey)
            return {
                token: true,
                data: data
            }
        }catch(error) {
            return {
                token: false,
                data: error
            }
        }
    }
}

module.exports = Token