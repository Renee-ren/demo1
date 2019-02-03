<template>
    <el-row>
        <el-col :span="8"><div class="grid-content bg-purple-light">
            <img src="../assets/images/logo.png" alt="">
            </div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple-light mylogo">
                電商後台管理系統
            </div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple-light logout">
                <a @click.prevent="logout">退出</a>
            </div></el-col>
    </el-row>
</template>

<script>
export default {
  methods: {
    logout () {
      this.$confirm('確定退出么?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 清除token值，跳轉到登錄頁面
        window.localStorage.removeItem('token')
        this.$router.push('/login')
        this.$message({
          type: 'success',
          message: '退出成功'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '以取消退出'
        })
      })
    }
  }
}
</script>

<style>
.mylogo{
    text-align: center;
    color:#fff;
    font-size: 24px;
}
.logout{
    text-align: right;
    margin-right: 20px;
}
.logout a{
    text-decoration: none;
    color:#fff;
}
.logout a:hover {
    color:orange;
}
</style>
