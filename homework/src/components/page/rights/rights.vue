<template>
  <el-card>
    <mybread firstnav="权限管理" lastnav="权限列表"/>
    <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index"></el-table-column>
      <el-table-column prop="authName" label="权限名称"></el-table-column>
      <el-table-column prop="path" label="路径"></el-table-column>
      <el-table-column prop="level" label="层级">
          <template slot-scope="scope">
            <span v-if="scope.row.level === '0'">一级</span>
            <span v-else-if="scope.row.level=== '1'">二级</span>
            <span v-else>三级</span>
          </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    async getAllRights () {
      var res = await this.$http.request({
        url: 'rights/list',
        method: 'get'
        // headers: {
        //   Authorization: window.localStorage.getItem('token')
        // }
      })
      var {meta, data} = res.data
      if (meta.status === 200) {
        this.tableData = data
      } else {
        this.$message.error(meta.msg)
      }
    }
  },
  mounted () {
    this.getAllRights()
  }
}
</script>

<style>
.el-breadcrumb {
 margin-bottom: 20px;
}
</style>
