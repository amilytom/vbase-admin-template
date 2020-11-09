import Vue from "vue";
import Router from "vue-router";
import Cookies from "js-cookie";

Vue.use(Router);

const constantRoutes = [
  {
    path: "/",
    name: "Introduce",
    redirect: "/intro"
  },
  {
    path: "/",
    name: "IndexView",
    component: () => import("@/views/index.vue"),
    meta: { title: "系统首页" },
    children: [
      {
        path: "/intro",
        name: "Introduce",
        component: () => import("@/components/introduce.vue"),
        meta: { title: "后台首页" }
      },
      {
        path: "/table",
        name: "Table",
        component: () => import("@/components/table.vue"),
        meta: { title: "表格样式" }
      }
    ]
  },
  {
    path: "/login",
    name: "LoginView",
    component: () => import("@/views/login.vue"),
    meta: { title: "登录页面" }
  },
  {
    path: "/404",
    component: () => import("@/components/error/404"),
    hidden: true
  }
];

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

const router = new Router({
  mode: "history", //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
});

//导航守卫
//使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  if (to.path === "/login") {
    next();
  } else {
    let isLogin =
      router.app.$options.store.state.user.isLogin || Cookies.get("isLogin");

    if (!isLogin) {
      next("/login");
    } else {
      next();
    }
  }
});

export default router;
