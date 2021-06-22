const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    userID: {type: String, unique: true},    //学号
    password: {
        type: String,
        set(val) {
            return require('bcrypt').hashSync(val, 10)
        }
    },   //密码
    username: String,   //姓名
    age: {type: Number, default: 18},    //年龄
    sex: {type: String, default: '男'},    //性别
    usermail: String,   //邮箱
    userphone: String,  //电话
    user_role: Number,  //角色 0代表学生 1代表教师 2代表管理员
    create_time: {type: Date, default: Date.now}  //创建时间
}, {
    collection: 'User'
})

const User = mongoose.model('User', UserSchema)
//User.db.dropCollection('User')
module.exports = User
