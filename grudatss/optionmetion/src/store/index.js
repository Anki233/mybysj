import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: {},
        token: false,
        role: []
    },
    mutations: {
        initUser(state) {
            let user = window.sessionStorage.getItem('user')
            if (user) {
                state.user = JSON.parse(user)
                state.token = state.user.token
                state.role = state.user.role
            }
        },
        // 登录
        login(state,user) {
            // 保存登录状态
            state.user = user
            state.token = user.token
            state.role = user.role
            // 存储到本地存储中
            window.sessionStorage.setItem('user',JSON.stringify(state.user))
            window.sessionStorage.setItem('token',state.token)
            window.sessionStorage.setItem('role',state.role)
        },
        // 退出登录
        logout(state) {
            // 清除状态
            state.user = {}
            state.token = false
            state.role = []
            // 清除本地存储
            window.sessionStorage.clear()
        }
    },
    actions: {},
    modules: {}
})
