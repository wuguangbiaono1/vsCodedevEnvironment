import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
	  path: '/',
	  name: "login",
	  component: () => import("../views/login.vue"),
	  meta: { title: "登录" }
	},
	{
	  path: "/register",
	  name: "register",
	  component: () => import("../views/register.vue"),
	  meta: { title: "注册" }
	},
  {
    path: '/index',
    redirect: '/index/echartsView',
		component: () => import("../layout/layout.vue"),
		children: [
      {
        path: 'echartsView',
        name: '/index/echartsView',
        meta: {
          title: '数据大屏',
          icon: 'el-icon-s-marketing',
          roles: ['管理员']
        },
        component: () => import("../views/echartsView/echartsView.vue")
      },
			{
				path: 'userAdmin',
				name: '/index/userAdmin',
				meta: {
					title: '用户管理',
          icon: 'el-icon-user-solid',
          roles: ['管理员']
				},
				component: () => import("../views/userAdmin/userAdmin.vue")
			},

      {
        path: 'news',
        name: '/index/news',
        meta: {
          title: '咨询管理',
          icon: 'el-icon-chat-round',
          roles: ['管理员']
        },
        component: () => import("../views/news/news.vue")
      },
      {
        path: 'cookbook',
        name: '/index/cookbook',
        meta: {
          title: '菜谱广场',
          icon: 'el-icon-burger',
          roles: ['管理员']
        },
        component: () => import("../views/cookbook/cookbook.vue")
      },
      {
        path: 'userInfo',
        name: '/index/userinfo',
        meta: {
          title: '个人中心',
          icon: 'el-icon-burger',
          roles: ['管理员']
        },
        component: () => import("../views/userinfo/User.vue")
      },

			// {
			// 	path: 'roleAdmin',
			// 	name: '/index/roleAdmin',
			// 	meta: {
			// 		title: '权限字典',
   //        icon: 'el-icon-s-check',
			// 		roles: ['管理员','菜谱分享者']
			// 	},
			// 	component: () => import("../views/roleAdmin/roleAdmin.vue")
			// },
    ]
  },
]


const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
	if(to.fullPath == '/register' || to.fullPath == '/') {
		next()
	}

	else if (window.localStorage.getItem('cookbook_UserInfo')) {
			next()
	} else {
			if (to.path === '/') {
					next()
			} else {
					next('/')
			}
	}
})

export default router
