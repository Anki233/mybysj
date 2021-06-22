//引入express模块
const express = require('express');
//定义路由级中间件
const router = express.Router();
const dateFormat = require('dateformat')
//引入数据模型模块
const Subject = require('../models/Subject')
const SelectSub = require('../models/Select_sub')

let exportObj = {
    getseletsub,
    getsub,
    searchinfo
}

module.exports = exportObj

function getseletsub(req,res) {
    let sqlObj = {}
    if(req.body.role == 0) {
        sqlObj.stuNO = req.body.id
    }
    if(req.body.role == 1) {
        sqlObj.teacherNO = req.body.id
    }
    if(req.body.role == 2) {
        sqlObj.checkflag = req.body.checkflag
    }
    if(req.body.role != 0) {
        let currentPage = parseInt(req.body.currentPage) // 转换前端传入当前页码
        let pageSize = parseInt(req.body.pageSize) // 转换前端传入的每页大小
        let skip = (currentPage-1)*pageSize // 实现分割查询的skip
        // 使用mongoose的skip,limit两个api对数据进行跳跃查询并返回查询结果
        let seleList = SelectSub.find(sqlObj).skip(skip).limit(pageSize)
        SelectSub.find(sqlObj,function(err,ress){
            if(err) return res.json({code:404,msg:'请求失败'})
            let count = ress.length
            seleList.exec((err, doc) => {
                if (err) {
                    res.json({
                        code: 404,
                        msg: '数据库发生错误！'
                    })
                } else {
                    res.json({
                        code: 200,
                        msg: '查询成功',
                        data: [doc,count]
                    })
                }
            })
        })
    }else {
        SelectSub.find(sqlObj,function(err,data){
            if(err) {
                res.json({
                    code: 404,
                    msg: '数据库发生错误！'
                })
            }else {
                res.json({
                    code: 200,
                    msg: '查询成功',
                    data: data
                })
            }
        })
    }
}

function getsub(req,res) {
    let sqlObj = {}
    if(req.body.status === 2) {
        sqlObj.status = 2
    }
    if(req.body.role == 1) {
        sqlObj.teacherNO = req.body.id
    }
    if(req.body.role == 0) {
        sqlObj.status = 1
    }
    if(req.body.role == 2) {
        if(req.body.status&&req.body.status !==0) sqlObj = {}
        else sqlObj.status = 0
    }
    let currentPage = parseInt(req.body.currentPage) // 转换前端传入当前页码
    let pageSize = parseInt(req.body.pageSize) // 转换前端传入的每页大小
    let skip = (currentPage-1)*pageSize // 实现分割查询的skip
    // 使用mongoose的skip,limit两个api对数据进行跳跃查询并返回查询结果
    let seleList = Subject.find(sqlObj).skip(skip).limit(pageSize)
    Subject.find(sqlObj,function(err,ress){
        if(err) return res.json({code:404,msg:'请求失败'})
        let count = ress.length
        seleList.exec((err, doc) => {
            if (err) {
                res.json({
                    code: 404,
                    msg: '数据库发生错误！'
                })
            } else {
                res.json({
                    code: 200,
                    msg: '查询成功',
                    data: [doc,count]
                })
            }
        })
    })
    
}


function searchinfo(req,res) {
    Subject.find({subNO: req.params.id},function(err,doc) {
        if (err) {
            res.json({
                code:404,
                msg: '数据库发生错误！'
            })
        } else {
            res.json({
                code:200,
                msg: '查询成功',
                data: doc
            })
        }
    })
}