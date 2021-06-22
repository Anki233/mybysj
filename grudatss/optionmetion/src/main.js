import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'

import {
    Message
} from 'element-ui'


// Add a request interceptor
axios.interceptors.request.use((config) => {
    // 添加header头的token
    let token = window.sessionStorage.getItem('token')
    if (config.token === true) {
        config.headers['token'] = token
    }
    // Do something before request is sent
    return config;
}, (error) => {
    // Do something with request error
    return Promise.reject(error);
});

// 添加相应拦截器
axios.interceptors.response.use((response) => {
    // Do something with response data
    if (response.data.msg == 'Token验证失败') {
        window.sessionStorage.clear()
        window.location.href = '#/login';
    }
    return response;
}, (err) => {
    // 全局错误提示
    if (err.response && err.response.data && err.response.data.errorCode) {
        Message.error(err.response)
    }
    return Promise.reject(err);
});


Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
