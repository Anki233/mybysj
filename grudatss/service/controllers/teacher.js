//引入express模块
const express = require('express');
//定义路由级中间件
const router = express.Router();
const dateFormat = require('dateformat')
//引入数据模型模块
const Subject = require('../models/Subject');
const SelectSub = require('../models/Select_sub')
const Constant = require('../constant/constant')

let exportObj = {
    submitqus,
    updatequs,
    deletequs,
    choosestu
}

module.exports = exportObj

function submitqus(req,res) {
    const {subNO,subTitle,teacherNO} = req.body
    if(subNO == '' || subTitle == '' || teacherNO == '') {
        res.json({
            code: 401,
            msg: '出题失败，请填写完整的表单哦！'
        })
    }else {
        Subject.find({
            subNO
        }).then(result => {
            if(result != 0) {
                res.json({
                    code: 401,
                    msg: '题目编号重复，请更改题目编号哦！'
                })
            }else {
                Subject.create({
                    subNO: subNO,
                    subTitle: subTitle,
                    teacherNO: teacherNO,
                    subDetail: req.body.subDetail,
                    create_time: dateFormat(new Date(),'yyyy-mm-dd HH:MM:ss')
                },function(err,docs){
                    if(err) {
                        return res.json({
                            code: 402,
                            error: err
                        })
                    }
                    res.json({
                        code: 200,
                        msg: '出题成功！'
                    })
                })
            }
        })
    }
}

function updatequs(req,res) {
    Subject.findOneAndUpdate({subNO: req.body.subNO},{
        $set: {
            subTitle: req.body.subTitle,
            subDetail: req.body.subDetail,
            status: 0
        }
    },{},function(err,data) {
        if(err) {
            return res.json({
                code: 404,
                msg: '数据库发生错误！'
            })
        }else if(data) {
            res.json({
                code: 200,
                msg: '更新成功！'
            })
        }
    })
}

function deletequs(req,res) {
    Subject.findOne({subNO: req.params.id},function(err,data){
        if(data) {
            Subject.findOneAndRemove({
                subNO: req.params.id
            }).then(hero => res.json({
                code:200,
                msg: "删除成功"
            })).catch(err => res.json({
                code:401,
                msg: "删除失败"
            }))
        }else {
            res.json({
                code:404,
                msg: "数据库错误！"
            })
        }
    })
}

function choosestu(req,res) {
    let sql = {
        teacherNO:req.body.teacherNO,
        subNO:req.body.subNO
    }
    SelectSub.find(sql).then(result => {
        if(result == 0) {
            res.json({
                code: 400,
                msg: '数据库发生错误！'
            })
        }else {
            SelectSub.findOneAndUpdate({subNO:sql.subNO},{
                $set: {
                    checkflag: req.body.checkflag
                }
            },{},function(err,data) {
                if(err) {
                    return res.json({
                        code: 404,
                        msg: '数据库发生错误！'
                    })
                }else if(data) {
                    res.json({
                        code: 200,
                        msg: '操作成功！'
                    })
                }
            })
        }
    })
}