//引入express模块
const express = require('express');
//定义路由级中间件
const router = express.Router();
const dateFormat = require('dateformat')
//引入数据模型模块
const Users = require('../models/User');
const Constant = require('../constant/constant')

let exportObj = {
    updateprofile,
    profile,
    modifypass
}

module.exports = exportObj

function updateprofile(req,res) {
    let sql = {}
    if(req.body.userphone) {
        sql.userphone = req.body.userphone
    }
    if(req.body.usermail) {
        sql.usermail = req.body.usermail
    }
    if(req.body.age) {
        sql.age = req.body.age
    }
    if(req.body.sex) {
        sql.sex = req.body.sex
    }
    Users.findOneAndUpdate({userID: req.body.userID},{
        $set: sql
    },{},function(err,data) {
        if(err) {
            return res.json({
                code: 404,
                msg: '数据库发生错误！'
            })
        }else if(data) {
            res.json({
                code: '200',
                msg: '更新成功！'
            })
        }
    })
}

function profile(req,res) {
    Users.find({userID: req.params.id},function(err, result) {
        if(err) {
            return res.json({
                code: 404,
                msg: '数据库发生错误！'
            })
        }else if (result) {
            let data = {
                userID:result[0].userID,
                username:result[0].username,
                age:result[0].age,
                sex:result[0].sex,
                usermail:result[0].usermail,
                user_role:result[0].user_role,
                userphone: result[0].userphone,
                create_time:result[0].create_time,
                id: result[0]._id
            }
            return res.json({
                code: '200',
                msg: '查询成功！',
                data: data
            })
        }
    })
}

function modifypass(req,res) {
    let { new_password } = req.body
    Users.find({userID:req.body.userID},function(err, data) {
        if(err) {
            return res.json({
                code: 404,
                msg: '数据库发生错误！'
            })
        }else if (data) {
            const isPasswordValid = require('bcrypt').compareSync(
                req.body.old_password,
                data[0].password
            )
            if(!isPasswordValid) {
                return res.json({
                    code: 422,
                    msg: '输入的旧密码错误'
                })
            }
            Users.updateOne({userID:req.body.userID},{password: new_password }, function(err, data) {
                if(err){
                    return res.json({
                        code: 404,
                        msg: '出现未知错误！'
                    })
                }else if (data) {
                    res.json({
                        code: '200',
                        msg: '修改成功！'
                    })
                }
            })
        }
    })
}
