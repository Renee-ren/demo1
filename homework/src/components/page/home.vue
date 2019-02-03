<template>
  <el-container>
    <el-header>
      <headers/>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <Sidebar/>
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Headers from '@/layout/headers.vue'
import Sidebar from '@/layout/sidebar.vue'
export default {
  // methods: {
  //   loginRequest () {
  //     const ad = window.localStorage.getItem('token')
  //     if (!ad) {
  //       this.$message.error('参数错误，请先登录')
  //       this.$router.push('/login')
  //     }
  //   }
  // },
  // mounted () {
  //   this.loginRequest()
  // },
  components: {
    Headers,
    Sidebar
  }
}
</script>

<style>
.el-container {
  height: 100%;
}

.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
  padding: 0;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  height: 100%;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  height: 100%;
}
</style>
