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
    updatesub,
    delselsub
}

module.exports = exportObj

function updatesub(req,res) {
    let sql = {}
    if(req.body.status) {
        sql.status = req.body.status
    }
    if(req.body.note) {
        sql.note = req.body.note
    }
    Subject.findOneAndUpdate({subNO: req.body.subNO},{
        $set: sql
    },{},function(err,data) {
        if(err) {
        return res.json(
        {
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

function delselsub(req,res) {
    SelectSub.findOne({selectNO: req.params.id},function(err,data){
        if(data) {
            SelectSub.findOneAndRemove({
                selectNO: req.params.id
            }).then(hero => res.json({
                code:200,
                msg: "删除成功"
            })).catch(err => res.json({
                code:404,
                msg: "删除失败"
            }))
        }else {
            res.json({
                code:403,
                msg: "数据库错误！"
            })
        }
    })
}