import request from "@/utils/request";

const userList = {
  //获取用户信息
  getBaseUserList(param = {}) {
    return request({
      url: "/baseuser/queryUser",
      method: "get",
      params: param
    });
  },

  //新增用户信息
  addBaseUserList(param = {}) {
    return request({
      url: "/baseuser/insertUser",
      method: "post",
      data: param
    });
  },

  //修改用户信息
  updateBaseUserList(param = {}) {
    return request({
      url: "/baseuser/updateUser",
      method: "post",
      data: param
    });
  },

  //删除用户信息
  deleteBaseUserList(param = {}) {
    return request({
      url: "/baseuser/deleteUser",
      method: "post",
      data: param
    });
  },

  //修改用户密码
  editBaseUserPassword(param = {}) {
    return request({
      url: "/baseuser/updateUserPwd",
      method: "post",
      data: param
    });
  },

  //更新用户登录时间
  updateUserVisitTime(param = {}) {
    return request({
      url: "/baseuser/updateUserVisit",
      method: "post",
      data: param
    });
  },

  //用户登录
  getBaseUserLogin(param = {}) {
    return request({
      url: "/baseuser/selectLogin",
      method: "post",
      data: param
    });
  }
};

export default userList;
