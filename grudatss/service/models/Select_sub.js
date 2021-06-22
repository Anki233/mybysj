const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const SelectSubSchema = new Schema({
    selectNO: {type:String,unique:true},   //选题编号
    subNO: String, //题目编号
    teacherNO: String, //教师编号
    stuNO: String, //学生编号
    checkflag: {type:Number,default:0},  //教师审核标志 0代表未审核 1代表通过 2代表未通过
    createTime: { type: Date, default: Date.now }  //创建时间
},{
    collection: 'SelectSub'
})

const SelectSub = mongoose.model('SelectSub',SelectSubSchema)
module.exports = SelectSub