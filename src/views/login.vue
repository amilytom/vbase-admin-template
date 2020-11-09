<template>
<div class="loginbox">
  <h2>后台管理系统</h2>
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
    <el-form-item prop="account">
      <el-input type="text" v-model="ruleForm.account" placeholder="用户名" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item prop="pwd">
      <el-input type="password" v-model="ruleForm.pwd" placeholder="密码" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item prop="code" class="input_ver">
      <el-input v-model="ruleForm.code" placeholder="请输入验证码" autocomplete="off"></el-input>
      <img class="verimg" :src="verCodeImg" ref="vercode" @click="changeVerifycode" />
    </el-form-item>
    <el-form-item class="loginbut">
      <el-button type="primary" @click="submitForm('ruleForm')" :loading="loginLoading">提交</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import qs from 'qs'
import Cookies from 'js-cookie'
import userList from '@/api/userApi'
import valiadteRule from '@/utils/validateRule' // 表单验证
import axios from 'axios'

export default {
  data() {
    return {
      logosrc: require('../assets/images/logo.png'),
      ruleForm: {
        account: '',
        pwd: '',
        code: '',
      },
      rules: {
        account: [{
            required: true,
            message: '用户账号不能为空',
            trigger: 'blur',
          },
          {
            validator: valiadteRule.validateChinese,
            trigger: 'blur',
          },
          {
            validator: valiadteRule.validateAccountFormat,
            trigger: 'blur',
          },
        ],
        pwd: [{
            required: true,
            message: '用户密码不能为空',
            trigger: 'blur',
          },
          // {
          //     min: 6,
          //     message: '用户账号长度不能少于6个字符',
          //     trigger: 'blur'
          // },
          // {
          //     validator: valiadteRule.validatePassword,
          //     trigger: 'blur'
          // }
        ],
        code: [{
          required: true,
          message: '验证码不能为空',
          trigger: 'blur',
        }, ],
      },
      loginLoading: false,
      verCodeImg: '',
      token: '',
      userUrl: '',
    }
  },
  mounted() {
    this.changeVerifycode()
  },
  created() {
    var _this = this
    document.onkeydown = function (e) {
      let key = window.event.keyCode
      if (key == 13) {
        _this.submitForm('ruleForm')
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loginLoading = true
          let params = {
            account: this.ruleForm.account,
            pwd: this.ruleForm.pwd,
            code: this.ruleForm.code,
          }

          this.$store
            .dispatch('login', params)
            .then((res) => {
              //console.log(res);
              this.loginLoading = false
              if (res.data.userId) {
                this.$message.success('登录成功')
                this.$router.push({
                  path: '/'
                })
                let params = res.data.userId
                userList
                  .updateUserVisitTime(params)
                  .then((res) => {
                    //console.log(res.headers['date'])
                    //this.$message.success('欢迎登陆')
                  })
                  .catch((err) => {
                    console.log(err)
                  })
              } else {
                this.$message.warning(res.data)
              }
            })
            .catch((err) => {
              //console.log(err);
              this.$message.warning('用户名或者密码错误，请重新输入')
              this.loginLoading = true
              this.$router.go(0)
            })

        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    changeVerifycode() {
      let random = Math.floor(Math.random() * 100 + 1)
      const base_url =
        process.env.NODE_ENV === 'development' ?
        process.env.BASE_API :
        process.env.API_ROOT
      let url = base_url + '/code?random=' + random

      //需要axios支持，可以访问请求头和响应头

      axios.defaults.withCredentials = true
      axios
        .get(url, {
          responseType: 'blob'
        })
        .then((res) => {
          this.verCodeImg = window.URL.createObjectURL(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
}
</script>

<style scoped>
.loginbox {
  width: 100%;
  height: 100vh;
  background: url(../assets/images/loginbg.jpg) no-repeat center center transparent;
  background-size: cover;
  overflow: hidden;
}

.loginbox h2 {
  text-align: center;
  font-size: 48px;
  color: #002b36;
  margin-top: 25vh;
  text-shadow: 0px 6px 1px #83acdb;
  letter-spacing: 4px;
}

.loginbox .demo-ruleForm {
  width: 360px;
  margin: 50px auto 0px;
}

.loginbox .demo-ruleForm .el-form-item {
  margin-bottom: 20px;
}

.loginbox .demo-ruleForm .rememrow {
  margin-bottom: 6px;
}

.loginbox .demo-ruleForm .rememrow /deep/ .el-form-item__content {
  line-height: 28px;
}

.loginbox .demo-ruleForm .loginbut {
  margin-bottom: 0px;
}

.loginbox .demo-ruleForm .loginbut .el-button {
  width: 100%;
  line-height: 24px;
}

.loginbox .demo-ruleForm .input_ver /deep/ .el-form-item__content {
  height: 40px;
}

.loginbox .demo-ruleForm .input_ver /deep/ .el-form-item__content .el-input {
  width: 260px;
  margin-right: 5px;
  float: left;
}

.loginbox .demo-ruleForm .input_ver /deep/ .el-form-item__content .verimg {
  height: 38px;
  line-height: 38px;
}
</style>
