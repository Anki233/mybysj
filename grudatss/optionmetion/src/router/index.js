import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    name:'Home',
    redirect: '/index',
    component: () => import('../views/Home'),
    children: [
      {
        path: '/index',
        name: 'index',
        component: () => import('../components/index')
      },
      {
        path: '/profile/index',
        name: 'profile-index',
        component: () => import('../components/Profile/index')
      },
      {
        path: '/profile/update',
        name: 'profile-update',
        component: () => import('../components/Profile/update')
      },
      {
        path: '/profile/safe',
        name: 'profile-safe',
        component: () => import('../components/Profile/safe')
      },
      {
        path: '/student/choose',
        name: 'student-choose',
        component: () => import('../components/Student/choose')
      },
      {
        path: '/student/checked',
        name: 'student-checked',
        component: () => import('../components/Student/checked')
      },
      {
        path: '/teacher/mysub',
        name: 'teacher-mysub',
        component: () => import('../components/Teacher/mysub')
      },
      {
        path: '/teacher/addsub',
        name: 'teacher-addsub',
        component: () => import('../components/Teacher/addsub')
      },
      {
        path: '/teacher/choose',
        name: 'teacher-choose',
        component: () => import('../components/Teacher/choose')
      },
      {
        path: '/admin/checksubm',
        name: 'admin-checksubm',
        component: () => import('../components/Admin/checksubm')
      },
      {
        path: '/admin/notchoose',
        name: 'admin-notchoose',
        component: () => import('../components/Admin/notchoose')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register')
  },
  {
    path: '/error',
    name: 'error',
    component: () => import('../views/error')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

//??????????????????
router.beforeEach((to, from, next) => {
  let token = window.sessionStorage.getItem('token')
  if (token) { //?????????
    // ??????????????????
    if(to.path === '/login') {
      Vue.prototype.$message.error('?????????????????????')
      return next({name:from.name ? from.name : 'Home'})
    }
    // ????????????...
    else if(to.name !== 'error') {
      //??????
      let rules = window.sessionStorage.getItem('rules')
      rules = rules ? JSON.parse(rules) : []
      let index = rules.findIndex(item=> {
        return item.rule_id > 0 && item.desc == to.name
      })
      if(index === -1) {
        Vue.prototype.$message.error('??????????????????')
        console.log(from.name)
        return next({name:from.name ? from.name : 'Home'})
      }
    }
    next()
  } else { // ?????????
    // ???????????????
    if (to.path === '/login'|| to.path === '/register') {
      return next()
    }
    Vue.prototype.$message.error('????????????')
    next({
      path: '/login'
    })
  }
})

export default router
