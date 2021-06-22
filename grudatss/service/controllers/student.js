//引入express模块
const express = require('express');
//定义路由级中间件
const router = express.Router();
const dateFormat = require('dateformat')
//引入数据模型模块
const SelectSub = require('../models/Select_sub');

let exportObj = {
    topsele
}

module.exports = exportObj

function topsele(req,res) {
    const { flag } =  req.body
    if(flag) {
        SelectSub.find({
            $or: [
                {subNO: req.body.subNO},
                {stuNO: req.body.stuNO}
                ]
        }).then(result => {
            console.log(result)
            if(result != 0) {
                res.json({
                    code: 401,
                    msg: '每个人只能选择一个题目！或者该题目已被选择！'
                })
            }else {
                SelectSub.create({
                    selectNO: req.body.subNO,
                    subNO: req.body.subNO,
                    teacherNO: req.body.teacherNO,
                    stuNO: req.body.stuNO,
                    create_time: dateFormat(new Date(),'yyyy-mm-dd HH:MM:ss')
                },function(err,docs){
                    if(err) {
                        return res.json({
                            code:404,
                            error: err
                        })
                    }
                    res.json({
                        code:200,
                        msg: '选课成功！'
                    })
                })
            }
        })
    }else {
        SelectSub.findOne({stuNO: req.body.stuNO},function(err,data){
            if(data) {
                SelectSub.findOneAndRemove({
                    stuNO: req.body.stuNO
                }).then(() => res.json({
                    code:200,
                    msg: "退选成功"
                })).catch(err => res.json({
                    code:404,
                    msg: "退选失败"
                }))
            }else {
                res.json({
                    code:404,
                    msg: "数据库错误！"
                })
            }
        })
    }
}
