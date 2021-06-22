//引入express模块
const express = require('express');
//定义路由级中间件
const router = express.Router();
const dateFormat = require('dateformat')
//引入数据模型模块
const User = require('../models/User');
const Constant = require('../constant/constant')
const Token = require('./token')
const TOKEN_EXPIRE_TIME = 7200

let exportObj = {
    register,
    login
}

let stuObj = [
    {
        desc:'index',
        rule_id: 1
    },
    {
        desc:'student-choose',
        rule_id: 2
    },
    {
        desc:'student-checked',
        rule_id: 3
    },
    {
        desc:'profile-index',
        rule_id: 4
    },
    {
        desc:'profile-update',
        rule_id: 5
    },
    {
        desc:'profile-safe',
        rule_id: 6
    }
]
let teaObj = [
    {
        desc:'index',
        rule_id: 1
    },
    {
        desc:'teacher-mysub',
        rule_id: 2
    },
    {
        desc:'teacher-addsub',
        rule_id: 3
    },
    {
        desc:'teacher-choose',
        rule_id: 4
    },
    {
        desc:'profile-index',
        rule_id: 5
    },
    {
        desc:'profile-update',
        rule_id: 6
    },
    {
        desc:'profile-safe',
        rule_id: 7
    }
]
let admObj = [
    {
        desc:'index',
        rule_id: 1
    },
    {
        desc:'admin-checksubm',
        rule_id: 2
    },
    {
        desc:'admin-notchoose',
        rule_id: 3
    },
    {
        desc:'profile-index',
        rule_id: 4
    },
    {
        desc:'profile-update',
        rule_id: 5
    },
    {
        desc:'profile-safe',
        rule_id: 6
    }
]

let Student = [
    {
        title: "首页",
        key: "1",
        path: "/index",
        items: []
    },
    {
        title: "课题",
        key: "2",
        path: "/student/choose",
        items: []
    },
    {
        title: "已选课题",
        key: "3",
        path: "/student/checked",
        items: []
    },
    {
        title: "个人信息管理",
        key: "4",
        path: "",
        items: [
            {
                title: "查看个人信息",
                key: "4-1",
                path: "/profile/index"
            },
            {
                title: "账号安全",
                key: "4-2",
                path: "/profile/update"
            }
        ],
    }
]
let Teacher = [
    {
        title: "首页",
        key: "1",
        path: "/index",
        items: []
    },
    {
        title: "课题",
        key: "2",
        path: "",
        items: [
            {
                title: "我的课题",
                key: "2-1",
                path: "/teacher/mysub",
            },
            {
                title: "发布课题",
                key: "2-2",
                path: "/teacher/addsub",
            }
        ]
    },
    {
        title: "选择学生",
        key: "3",
        path: "/teacher/choose",
        items: []
    },
    {
        title: "个人信息管理",
        key: "4",
        path: "/profile",
        items: [
            {
                title: "查看个人信息",
                key: "4-1",
                path: "/profile/index"
            },
            {
                title: "账号安全",
                key: "4-2",
                path: "/profile/update"
            }
        ],
    }
]
let Admin = [
    {
        title: "首页",
        key: "1",
        path: "/index",
        items: []
    },
    {
        title: "管理课题",
        key: "2",
        path: "/admin/checksubm",
        items: []
    },
    {
        title: "管理未通过老师筛选的学生",
        key: "3",
        path: "/admin/notchoose",
        items: []
    },
    {
        title: "个人信息管理",
        key: "4",
        path: "/profile",
        items: [
            {
                title: "查看个人信息",
                key: "4-1",
                path: "/profile/index"
            },
            {
                title: "账号安全",
                key: "4-2",
                path: "/profile/update"
            }
        ],
    }
]

module.exports = exportObj

function register(req,res) {
    let {userID,password} = req.body
    if(userID == '' || password == '') {
        res.json({
            code: 401,
            msg: '注册失败，请填写完整表单！'
        })
    }else {
        User.find({
            userID
        }).then(result => {
            if(result.length != 0) {
                res.json({
                    code: 403,
                    msg: '注册失败，该账号已被注册！'
                })
            }else {
                User.create({
                    userID: userID,
                    password: password,
                    username: req.body.username,
                    usermail: req.body.usermail,
                    userphone: req.body.userphone,
                    user_role: req.body.user_role,
                    create_time: dateFormat(new Date(),'yyyy-mm-dd HH:MM:ss')
                },function(err,docs){
                    if(err) {
                        return res.json({
                            code: 404,
                            error: err
                        })
                    }
                    res.json({
                        code: 200,
                        msg: '注册成功！'
                    })
                })
            }
        })
    }
}

function login(req,res) {
    let { userID, password } = req.body
    if (userID == ''|| password == '') {
        res.json(Constant.LACK)
    }else {
        User.find({
            userID
        }).then(result => {
            if (result.length == 0) {
                return res.json(Constant.LOGIN_ERROR)
            }else {
                const isPasswordValid = require('bcrypt').compareSync(
                    password,
                    result[0].password
                )
                if(!isPasswordValid) {
                    return res.json({
                        code:402,
                        msg: '密码错误!'
                    })
                }
                let adminInfo = {id: result.userID}
                let token = Token.encrypt(adminInfo,TOKEN_EXPIRE_TIME)
                let data = {
                    userID:result[0].userID,
                    username:result[0].username,
                    age:result[0].age,
                    sex:result[0].sex,
                    usermail:result[0].usermail,
                    user_role:result[0].user_role,
                    userphone: result[0].userphone,
                    create_time:result[0].create_time,
                    id: result[0]._id,
                    token: token
                }
                switch(data.user_role){
                    case 0:
                        data.rules = stuObj;
                        data.role = Student
                        break;
                    case 1:
                        data.rules = teaObj;
                        data.role = Teacher
                        break;
                    default:
                        data.rules = admObj
                        data.role = Admin
                        break
                }
                res.json({
                    code: 200,
                    msg: '登录成功！',
                    data: data
                })
            }
        }).catch(err => {
            res.json({
                code: 404,
                msg: "失败!",
                error: err
            });
        })
    }
}
