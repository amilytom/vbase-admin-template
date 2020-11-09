<template>
<el-dialog title="修改密码" :close-on-click-modal="false" :visible.sync="passDialogVisible" class="pass-modal">

  <el-form :model="changePassword" :rules="changePasswordRules" ref="changePassword" label-width="80px">
    <el-form-item label="新密码" prop="password">
      <el-input size="small" v-model.trim="changePassword.password" placeholder="请输入新密码" type="password"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="confirmPassword">
      <el-input size="small" v-model.trim="changePassword.confirmPassword" placeholder="请输入确认密码" type="password"></el-input>
    </el-form-item>
  </el-form>

  <div slot="footer" class="dialog-footer">
    <el-button @click="passDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="changePasswordSubmit" :loading="btnLoading">保 存</el-button>
  </div>

</el-dialog>
</template>

<script>
import qs from 'qs'
import userList from '@/api/userApi'
import valiadteRule from '@/utils/validateRule' // 表单验证
//import { hex_md5} from "@/utils/md5"

export default {
  data() {
    return {
      changePassword: {
        password: '',
        confirmPassword: ''
      },
      changePasswordRules: {
        // password: [{
        //     required: true,
        //     trigger: 'blur',
        //     message: '新密码不能为空'
        // }, {
        //     min: 6,
        //     message: '密码不能少于6位',
        //     trigger: 'blur'
        // }],
        // confirmPassword: [{
        //     required: true,
        //     trigger: 'blur',
        //     message: '密码不能少于6位'
        // },
        // {
        //     validator: valiadteRule.validateConfirm(this, 'changePassword'),
        //     trigger: 'blur'
        // },
        //     {
        //     min: 6,
        //     message: '密码不能少于6位',
        //     trigger: 'blur'
        // }]
      },
      passDialogVisible: false,
      btnLoading: false,
      userId: '',
      modifyUserId: ''
    }
  },
  methods: {
    open(rowData) {
      //console.log(rowData)
      this.passDialogVisible = true
      this.userId = rowData.userId
      this.modifyUserId = rowData.modifyUserId
    },
    changePasswordSubmit() {
      this.btnLoading = true
      this.$refs.changePassword.validate((valid) => {
        if (valid) {
          // let params = qs.stringify({
          //     password: hex_md5(this.changePassword.oldPassword),
          //     confirmPassword: hex_md5(this.changePassword.password)
          // })

          let params = {
            modifyUserId: this.modifyUserId,
            pwd: this.changePassword.password,
            userId: this.userId
          }

          //console.log(params)

          userList.editBaseUserPassword(params).then(res => {
            this.$message.success("密码修改成功")
            this.passDialogVisible = false
            // this.$alert('密码已修改，请重新登录', '提示', {
            //     confirmButtonText: '重新登录',
            //     showClose: false,
            //     type: 'warning'
            // }).then(() => {
            //     // this.$store.dispatch('LogOut').then(() => {
            //     //     location.reload() // 为了重新实例化vue-router对象 避免bug
            //     // })
            // })
          })
        } else {
          this.$message.warning('请正确填写表单内容')
          return false
        }
      })
    }
  }
}
</script>
