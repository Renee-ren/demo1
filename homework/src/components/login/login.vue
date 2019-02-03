<template>
  <div class="login">
    <div class="box">
      <h2>用户登录</h2>
      <el-form
        :model="loginObj"
        status-icon
        :rules="myrule"
        ref="myform"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="loginObj.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginObj.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="mybtn" type="primary" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginObj: {
        username: '',
        password: ''
      },
      myrule: {
        username: [
          { required: true, message: '請輸入用戶名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [{ required: true, message: '請輸入密碼', trigger: 'change' }]
      }
    }
  },
  methods: {
    login () {
      this.$refs.myform.validate(async (valid) => {
        if (valid) {
          var res = await this.$http.post('/login', this.loginObj)
          console.log(res.data)
          var { meta, data } = res.data
          if (meta.status === 200) {
            window.localStorage.setItem('token', data.token)
            this.$router.push('/home')
            this.$message({
              message: meta.msg,
              type: 'success'
            })
          } else {
            this.$message.error(meta.msg)
          }
        } else {
          this.$message.error(meta.msg)
        }
      })
    }
  }
}
</script>

<style scoped>
.login {
  background-color: #2c3742;
  width: 100%;
  height: 100%;
  position: relative;
}
.login .box {
  width: 500px;
  padding: 40px;
  background-color: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.login .box h2 {
  margin-bottom: 20px;
}
.login .box .mybtn {
  width: 100%;
}
</style>
