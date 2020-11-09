import Cookies from "js-cookie";
import userList from "@/api/userApi";

const user = {
  state: {
    account: "",
    userId: "",
    isLogin: false,
    organId: ""
  },
  mutations: {
    SET_NAME: (state, account) => {
      state.account = account;
    },
    SET_USERID: (state, userId) => {
      state.userId = userId;
    },
    SET_ISLOGIN: state => {
      state.isLogin = true;
    },
    SET_ORGANID: (state, organId) => {
      state.organId = organId;
    }
  },
  actions: {
    // 账户登录
    login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        userList
          .getBaseUserLogin(userInfo)
          .then(res => {
            //console.log(res);
            if (res.data.userId) {
              //commit('SET_TOKEN', data.token) // 登录时保存token到vuex
              //setToken(data.token) // 同时也保存到cookie
              commit("SET_NAME", res.data.account); //保存account到vuex
              commit("SET_USERID", res.data.userId); //保存userId到vuex
              commit("SET_ISLOGIN"); //保存userId到vuex
              commit("SET_ORGANID", res.data.organizeId); //保存organId到vuex
              Cookies.set("account", res.data.account); // 保存用户名到cookie
              Cookies.set("userId", res.data.userId); // 保存userId到cookie
              Cookies.set("isLogin", true); //保存islogin到cookie
              Cookies.set("organId", res.data.organizeId); // 保存userId到cookie
              resolve(res);
            } else {
              resolve(res);
            }
          })
          .catch(err => {
            reject(err);
          });
      });
    },

    // 登出
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        Cookies.remove("account");
        Cookies.remove("userId");
        Cookies.remove("isLogin");
        sessionStorage.clear();
        resolve();
      }).catch(error => {
        reject(error);
      });
    }
  }
};

export default user;
