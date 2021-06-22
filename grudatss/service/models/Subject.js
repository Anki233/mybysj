const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const SubjectSchema = new Schema({
    subNO: {type:String,unique:true},  //题目编号
    subTitle: String,  //题目标题
    teacherNO: String, //教师编号
    subDetail: String, //题目内容
    status: {type:Number,default:0}, //题目审核标志 0代表未审核 1代表审核通过 2代表审核未通过
    note: {type:String,default:null}, //提示
    createTime: { type: Date, default: Date.now }  //创建时间
},{
    collection: 'Subject'
})

const Subject = mongoose.model('Subject',SubjectSchema)
//Subject.db.dropCollection('Subject')
module.exports = Subject