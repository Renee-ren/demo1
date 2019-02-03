<template>
  <el-menu
    :router="true"
    default-active="2"
    class="el-menu-vertical-demo mymenu"
    :unique-opened="true"
  >
    <el-submenu :index="item.path" v-for="item in roledata" :key="item.id">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>{{item.authName}}</span>
      </template>
      <el-menu-item :index="'/'+item1.path" v-for="item1 in item.children" :key="item1.id">
        <i class="el-icon-menu"></i>
        <span>{{ item1.authName }}</span>
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  data () {
    return {
      roledata: {}
    }
  },
  methods: {
    async getRoles () {
      const res = await this.$http.request({
        url: '/menus',
        method: 'get'
      })
      var {meta, data} = res.data
      if (meta.status === 200) {
        this.roledata = data
      } else {
        this.$message.error(meta.msg)
      }
    }
  },
  mounted () {
    this.getRoles()
  }
}
</script>

<style>
.mymenu {
  height: 100%;
}
</style>
