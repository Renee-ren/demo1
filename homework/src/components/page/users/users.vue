<template>
  <el-card>
    <!-- <el-breadcrumb separator-class="el-icon-remove-outline">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用戶管理</el-breadcrumb-item>
      <el-breadcrumb-item>用戶列表</el-breadcrumb-item>
    </el-breadcrumb> -->
    <mybread firstnav="用戶管理" lastnav="用戶列表" />
    <el-row class="myrow">
      <el-col :span="8">
        <el-input placeholder="请输入内容" v-model="search" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="searchs"></el-button>
        </el-input>
      </el-col>&nbsp;&nbsp;
      <el-button type="success" plain @click="addusers">注册用户</el-button>
    </el-row>
    <el-table :data="dataList" border style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="郵箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="電話" width="180"></el-table-column>
      <el-table-column prop="mg_state" label="用戶狀態" width="180">
        <template slot-scope="scope">
          <el-switch
            @change="changeSwitch(scope.row.id,scope.row.mg_state)"
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作" width="200">
        <template slot-scope="scope">
          <div>
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="editOpen(scope.row.id)"
              plain
            ></el-button>
            <el-button
              size="mini"
              type="success"
              icon="el-icon-check"
              @click="roles(scope.row.id)"
              plain
            ></el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="del(scope.row.id)"
              plain
            ></el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[5, 10]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 添加控制面板 -->
    <el-dialog title="新增用户" :visible.sync="isOpen">
      <el-form :model="listObj" :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-form-item label="用户名" label-width="100px" prop="username">
          <el-input v-model="listObj.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="100px" prop="password">
          <el-input v-model="listObj.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="100px">
          <el-input v-model="listObj.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="100px">
          <el-input v-model="listObj.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isOpen=false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑面板 -->
    <el-dialog title="修改用户" :visible.sync="editDialog">
      <el-form :model="editDataObj">
        <el-form-item label="用户名" label-width="100px">
          <el-input :disabled="true" v-model="editDataObj.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="100px">
          <el-input v-model="editDataObj.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="100px">
          <el-input v-model="editDataObj.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialog=false">取 消</el-button>
        <el-button type="primary" @click="edit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配角色 -->
    <el-dialog title="分配角色" :visible.sync="openrole">
      <el-form :model="roleDate">
        <el-form-item label="当前用户" label-width="80px">
          {{roleDate.username}}
        </el-form-item>
        <el-form-item label="分配角色" label-width="100px">
          <el-select v-model="roleDate.rid" placeholder="请选择">
            <el-option :disabled="true" label="请选择角色" :value="-1"></el-option>
            <el-option v-for="item in addRule" :key="item.id" :label="item.roleName" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="openrole=false">取 消</el-button>
        <el-button type="primary" @click="addrol">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      dataList: [],
      currentPage4: 4,
      search: '',
      query: '',
      pagenum: 1,
      pagesize: 5,
      total: 0,
      isOpen: false,
      editDialog: false,
      openrole: false,
      listObj: {
        username: '',
        email: '',
        mobile: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]},
      editDataObj: {},
      roleDate: {
      },
      addRule: []
    }
  },
  methods: {
    // 获取参数，渲染列表
    async getAllList () {
      var res = await this.$http.get(`/users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`, {
        // headers: {
        //   Authorization: window.localStorage.getItem('token')
        // }
      })
      var {meta, data} = res.data
      if (meta.status === 200) {
        this.dataList = data.users
        this.total = data.total
      }
    },
    handleSizeChange (val) {
      this.pagesize = val
      this.getAllList()
    },
    handleCurrentChange (val) {
      this.pagenum = val
      this.getAllList()
    },
    // 用户状态修改
    async changeSwitch (id, type) {
      var res = await this.$http.request({
        url: `users/${id}/state/${type}`,
        method: 'put'
        // headers: {
        //   Authorization: window.localStorage.getItem('token')
        // }
      })
      var {meta} = res.data
      if (meta.status === 200) {
        this.$message({
          message: meta.msg,
          type: 'success'
        })
      } else {
        this.$message.error(meta.msg)
      }
    },
    searchs () {
      this.query = this.search
      this.getAllList()
    },
    addusers () {
      this.isOpen = true
    },
    // 验证
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    // 清空数据
    clearObj (obj) {
      for (var item in obj) {
        obj[item] = ''
      }
    },
    async add () {
      var res = await this.$http.request({
        url: '/users',
        method: 'post',
        data: {
          username: this.listObj.username,
          password: this.listObj.password,
          email: this.listObj.email,
          mobile: this.listObj.mobile
        }
        // headers: {
        //   Authorization: window.localStorage.getItem('token')
        // }
      })
      var { meta } = res.data
      if (meta.status === 201) {
        this.isOpen = false
        this.clearObj(this.listObj)
        this.getAllList()
      }
    },
    // 编辑数据获取
    async editOpen (id) {
      this.editDialog = true
      // 发送请求
      var res = await this.$http.request({
        url: `users/${id}`,
        method: 'get'
        // headers: {
        //   Authorization: window.localStorage.getItem('token')
        // }
      })
      var {meta, data} = res.data
      if (meta.status === 200) {
        this.editDataObj = data
      }
    },
    // 编辑数据提交
    async edit () {
      var id = this.editDataObj.id
      var res = await this.$http.request({
        url: `users/${id}`,
        method: 'put',
        data: {
          email: this.editDataObj.email,
          mobile: this.editDataObj.mobile
        }
        // headers: {
        //   Authorization: window.localStorage.getItem('token')
        // }
      })
      var {meta} = res.data
      if (meta.status === 200) {
        this.editDialog = false
        this.getAllList()
      }
    },
    // 删除功能
    del (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        var res = await this.$http.request({
          url: `users/${id}`,
          method: 'delete'
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
          this.getAllList()
        } else {
          this.$message.error(meta.msg)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    async roles (id) {
      this.openrole = true
      // 根据id获取当前的用户信息
      var res = await this.$http.request({
        url: `users/${id}`,
        method: 'get'
        // headers: {
        //   Authorization: window.localStorage.getItem('token')
        // }
      })
      var {meta, data} = res.data
      if (meta.status === 200) {
        this.roleDate = data
      }
      this.drowDown()
    },
    async drowDown () {
      var res = await this.$http.request({
        url: 'roles',
        method: 'get'
        // headers: {
        //   Authorization: window.localStorage.getItem('token')
        // }
      })
      var {meta, data} = res.data
      if (meta.status === 200) {
        this.addRule = data
      }
      console.log(this.addRule)
    },
    // 提交角色修改
    async addrol () {
      var id = this.roleDate.id
      var rid = this.roleDate.rid
      console.log(id, rid)
      var res = await this.$http.request({
        url: `users/${id}/role`,
        method: 'put',
        data: {
          rid: rid
        }
        // headers: {
        //   Authorization: window.localStorage.getItem('token')
        // }
      })
      var {meta} = res.data
      if (meta.status === 200) {
        this.openrole = false
      }
    }
  },
  mounted () {
    this.getAllList()
  }
}
</script>

<style>
.myrow {
  margin-top: 20px;
}
</style>
