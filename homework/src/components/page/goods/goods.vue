<template>
    <el-card>
        <mybread firstnav="商品管理" lastnav="商品列表" />
        <!-- 添加用户 -->
        <el-row class="myrow">
        <el-col :span="8">
            <el-input placeholder="请输入内容" v-model="search" class="input-with-select">
            <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
        </el-col>&nbsp;&nbsp;
        <el-button type="success" @click="add" plain>添加商品</el-button>
        </el-row>
        <!-- table表格 -->
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column type="index"></el-table-column>
            <el-table-column prop="goods_name" label="商品名称" width="400px"></el-table-column>
            <el-table-column prop="goods_price" label="商品价格（元）" width="100px"></el-table-column>
            <el-table-column prop="goods_weight" label="商品重量" width="100px"></el-table-column>
            <el-table-column prop="add_time" label="创建时间" width="200px"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <div>
                        <el-button size="mini" type="primary" icon="el-icon-edit"  plain></el-button>
                        <el-button size="mini" type="danger" icon="el-icon-delete" plain></el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>

<script>
export default {
  data () {
    return {
      search: '',
      tableData: [],
      query: '',
      pagenum: 1,
      pagesize: 10
    }
  },
  methods: {
    async getAllData () {
      const res = await this.$http.request({
        url: `goods?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`,
        method: 'get'
      })
      var {meta, data} = res.data
      if (meta.status === 200) {
        this.tableData = data.goods
      } else {
        this.$message.error(meta.msg)
      }
    },
    add () {
      this.$router.push('/goods/add')
    }
  },
  mounted () {
    this.getAllData()
  }
}
</script>

<style>
.myrow{
    margin: 15px 0;
}
</style>
