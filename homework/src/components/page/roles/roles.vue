<template>
  <el-card>
    <mybread firstnav="权限管理" lastnav="角色列表"/>
    <el-button>添加角色</el-button>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-row v-for="item in scope.row.children" :key="item.id">
            <el-col :span="5">
              <el-tag closable @close="close(scope.row.id,item.id,scope.row)">{{item.authName}}</el-tag><i class="el-icon-arrow-right"></i>
            </el-col>
            <el-col :span="19">
              <el-row v-for="item1 in item.children" :key="item1.id">
                <el-col :span="5"><el-tag closable @close="close(scope.row.id,item1.id,scope.row)">{{item1.authName}}</el-tag><i class="el-icon-arrow-right"></i></el-col>
                <el-col :span="19" >
                    <el-tag v-for="item2 in item1.children" :key="item2.id" closable @close="close(scope.row.id,item2.id,scope.row)">{{item2.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="index" ></el-table-column>
      <el-table-column prop="roleName" label="角色名称"></el-table-column>
      <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <div>
            <el-button size="mini" type="primary" icon="el-icon-edit" plain></el-button>
            <el-button size="mini" type="success" @click="openRole(scope.row.children,scope.row.id)" icon="el-icon-check" plain></el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete" plain></el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加面板 -->
    <el-dialog title="收货地址" :visible.sync="roleOpen">
      <el-tree
        ref="mytree"
        :data="roleList"
        show-checkbox
        node-key="id"
        :default-checked-keys="keyList"
        :default-expand-all="true"
        :props="defaultProps">
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="roleOpen = false">取 消</el-button>
        <el-button type="primary" @click="updataRole">确 定</el-button>
      </div>
    </el-dialog>

  </el-card>
</template>

<script>
export default {
  data () {
    return {
      tableData: [],
      roleOpen: false,
      roleList: [],
      defaultProps: {
        label: 'authName',
        children: 'children'
      },
      keyList: [],
      roleId: ''
    }
  },
  methods: {
    async getAllRoles () {
      var res = await this.$http.request({
        url: 'roles',
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
    },
    async close (roleId, rightId, scopeRow) {
      var res = await this.$http.request({
        url: `roles/${roleId}/rights/${rightId}`,
        method: 'delete'
        // headers: {
        //   Authorization: window.localStorage.getItem('token')
        // }
      })
      var {meta, data} = res.data
      if (meta.status === 200) {
        scopeRow.children = data
        this.$message({
          type: 'success',
          message: meta.msg
        })
      } else {
        this.$message.error(meta.msg)
      }
    },
    openRole (roleList, roleId) {
      console.log(roleList)
      this.getAllRights()
      this.keyList = []
      this.roleId = roleId
      this.roleOpen = true
      roleList.forEach(item1 => {
        item1.children.forEach(item2 => {
          item2.children.forEach(item3 => {
            this.keyList.push(item3.id)
          })
        })
      })
    },
    // 得到所有的数据
    async getAllRights () {
      var res = await this.$http.request({
        url: `rights/tree`,
        method: 'get'
        // headers: {
        //   Authorization: window.localStorage.getItem('token')
        // }
      })
      var {meta, data} = res.data
      if (meta.status === 200) {
        this.roleList = data
      } else {
        this.$message.error(meta.msg)
      }
    },
    async updataRole () {
      var all = this.$refs.mytree.getCheckedKeys()
      var half = this.$refs.mytree.getHalfCheckedKeys()
      console.log(half)
      var newArr = all.concat(half)
      console.log(newArr)
      var str = newArr.join(',')
      var res = await this.$http.request({
        url: `roles/${this.roleId}/rights`,
        method: 'post',
        data: {
          rids: str
        }
        // headers: {
        //   Authorization: window.localStorage.getItem('token')
        // }
      })
      var {meta} = res.data
      if (meta.status === 200) {
        this.$message({
          type: 'success',
          message: meta.msg
        })
        this.roleOpen = false
        this.getAllRoles()
      } else {
        this.$message.error(meta.msg)
      }
    }
  },
  mounted () {
    this.getAllRoles()
  }
}
</script>

<style>
.el-button {
  margin: 10px 0;
}
.el-row{
  margin-bottom: 10px;
  margin-right: 10px;
}
.el-tag{
  margin-right: 10px;
  margin-bottom: 10px;
}

</style>
