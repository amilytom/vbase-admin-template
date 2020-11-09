<template>
<div class="sys-header">
  <div class="logo">
    <p>{{logoName}}</p>
  </div>
  <div class="userInfo">
    <ul>
      <li>
        <el-dropdown @command="userOperation">
          <span class="user">
            {{username}}
            <i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="editPaw">修改密码</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </li>
    </ul>
  </div>

  <!-- 修改密码弹窗 -->
  <pass-dialog ref="passDialog"></pass-dialog>
</div>
</template>

<script>
import qs from 'qs'
import passDialog from '@/dialog/passDialog'
import Cookies from 'js-cookie'

export default {
  components: {
    passDialog,
  },
  data() {
    return {
      logoName: 'AIS后台管理系统',
      rowData: {},
    }
  },
  computed: {
    username: {
      get() {
        return this.$store.state.user.account || Cookies.get('account')
      },
      set(val) {
        this.$store.commit('user/SET_NAME', val)
      },
    },
  },
  methods: {
    userOperation(command) {
      switch (command) {
        case 'logout':
          this.logout()
          break
        case 'editPaw':
          this.editPass()
          break
      }
    },
    logout() {
      this.$store
        .dispatch('logout')
        .then(() => {
          this.$message.success('退出登录')
          this.$router.push({
            path: '/login'
          })
        })
        .catch((err) => {
          console.log(err)
        })
    },
    editPass() {
      this.rowData.userId = this.$store.state.user.userId
      this.rowData.modifyUserId = this.$store.state.user.userId
      this.$refs.passDialog.open(this.rowData)
    },
  },
}
</script>

<style scoped>
.sys-header {
  width: 100%;
  height: 60px;
  background-color: #2875c5;
  z-index: 500;
}

.sys-header .logo {
  float: left;
  height: 60px;
  line-height: 60px;
  padding-left: 20px;
  color: #fff;
  font-size: 20px;
}

.sys-header .userInfo {
  float: right;
  height: 60px;
}

.sys-header .userInfo li {
  display: inline-block;
  height: 60px;
  line-height: 60px;
  margin-right: 20px;
  color: #fff;
}

.sys-header .userInfo li .el-dropdown {
  display: inline-block;
  position: relative;
  color: #606266;
  font-size: 14px;
}

.sys-header .userInfo li .el-dropdown .user {
  color: #fff;
  cursor: pointer;
}

.sys-header /deep/ .el-dialog__wrapper {
  width: 100%;
}

.sys-header /deep/ .el-dialog__wrapper .el-dialog {
  width: 480px;
}

.sys-header /deep/ .el-dialog__wrapper .el-dialog .textC {
  text-align: center;
}

.sys-header /deep/ .el-dialog__wrapper .el-dialog .textC .el-button {
  width: 100%;
  line-height: 24px;
}
</style>
