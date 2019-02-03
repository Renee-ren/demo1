<template>
<el-card>
    <mybread firstnav="商品管理" lastnav="添加商品" />
    <!-- 消息提示 -->
      <el-alert title="添加商品信息" type="info" center show-icon></el-alert>
    <!-- 步骤条 -->
    <el-steps :active="num" align-center finish-status="success">
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
    </el-steps>
    <!-- tab切换 -->
    <el-tabs tab-position="left" @tab-click="tabclick">
        <el-tab-pane label="基本信息">
            <el-form :model="prodName" label-position="top" label-width="100px">
                <el-form-item label="商品名称">
                    <el-input v-model="prodName.goods_name"></el-input>
                </el-form-item>
                <el-form-item label="商品价格">
                    <el-input v-model="prodName.goods_price"></el-input>
                </el-form-item>
                <el-form-item label="商品重量">
                    <el-input v-model="prodName.goods_weight"></el-input>
                </el-form-item>
                <el-form-item label="商品数量">
                    <el-input v-model="prodName.goods_number"></el-input>
                </el-form-item>
                <el-form-item label="商品分类">
                    <el-cascader expand-trigger="hover" :props="props" :options="cateList" v-model="checkList">
                    </el-cascader>
                </el-form-item>
            </el-form>
        </el-tab-pane>
        <el-tab-pane label="商品参数">
           <div v-for="item in parmasMany" :key="item.attr_id">
             <p>{{ item.attr_name }}</p>
            <el-checkbox v-for="(item2,index) in item.attr_vals.split(',')" :key="index" v-model="add" :label="item2" border></el-checkbox>
          </div>
        </el-tab-pane>
        <el-tab-pane label="商品属性">
          <el-form label-position="top" label-width="80px">
            <el-form-item :label="item.attr_name" v-for="item in parmasOnly" :key="item.attr_id">
              <el-input v-model="item.attr_vals"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="商品图片">
          <el-upload class="upload-demo" action="http://localhost:8888/api/private/v1/upload" :headers="headers"
           :on-preview="handlePreview" :on-remove="handleRemove" :on-success="success"
            list-type="picture">
            {{this.photoList}}
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-tab-pane>
        <el-tab-pane label="商品内容">
            <el-button type="primary" @click="addProduct">添加商品</el-button>
             <quill-editor v-model="content">
              </quill-editor>
        </el-tab-pane>
  </el-tabs>
  <!-- 控制面板 -->
  <el-dialog :visible.sync="dialogTableVisible">
      <img ref="myref" style="width:100%" src="#" alt="">
  </el-dialog>
</el-card>

</template>

<script>
export default {
  data () {
    return {
      num: 0,
      prodName: {
        goods_name:'',
        goods_cat:'',
        goods_price:'',
        goods_number:'',
        goods_weight:'',
        goods_introduce: '',
        pics: [],
        attrs:''
      },
      cateList: [],
      props: {
        value: 'cat_id',
        label: 'cat_name'
      },
      // 选择后的数据列表
      checkList: [],
      parmasMany: [],
      parmasOnly: [],
      add:true,
      headers:{
        'Authorization':window.localStorage.getItem('token')
      },
      photoList:[],
      dialogTableVisible:false,
      content: '',
    }
  },
  methods: {
     tabclick (tab) {
      this.num = Number(tab.index)
      if(this.num === 1) {
        this.getParmas('many')
      } else if(this.num === 2){
         this.getParmas('only')
      }
    },
    async getParmas(sel) {
         if(this.checkList.length === 0) {
          this.$message.error('请选择商品分类参数')
          return
        } else {
          var id = Number(this.checkList[this.checkList.length -1])
          const res = await this.$http.request({
            url:`categories/${id}/attributes?sel=${sel}`
          })
          var {meta, data} =res.data
          if(meta.status === 200) {
            if(this.num === 1) {
              this.parmasMany = data
            } else if(this.num ===2) {
              this.parmasOnly = data
              console.log(this.parmasOnly)
            }
          } else {
            this.$message.error(meta.msg)
          }
        }
    },
    async getAllCate () {
      const res = await this.$http.request({
        url: `categories?type=3`,
        methood: 'get'
      })
      var {meta, data} = res.data
      if (meta.status === 200) {
        this.cateList = data
      } else {
        this.$message.error(meta.msg)
      }
    },
    success (response, file, fileList) {
      if(response.meta.status === 200) {
        this.photoList.push(response.data.tmp_path)
      }
    },
    handlePreview (file) {
      this.dialogTableVisible = true
      // 生命周期的dom渲染快于事件绑定内的函数操作，所以第一次点击没有修改数据，使用$nextTick会重新刷新执行
      // 函数内的操作，替换图片的src，不会报错
      this.$nextTick(() => {
        this.$refs.myref.src = file.response.data.url
      })
    },
    handleRemove (file, fileList) {
      if(file.response.meta.status === 200) {
        for(var i =0 ;i<this.photoList.length ;i++) {
          if(this.photoList[i] === file.response.data.tmp_path) {
            this.photoList.splice(i,1)
            break
          }
        }
      }
    },
    // 添加商品
    async addProduct() {
      this.prodName.goods_cat = this.checkList.join(',')
      // const res = await this.$http.request({
      //   url:'/goods',
      //   methood:'post',
      //   data:this.prodName
      // })
      // var {meta} = res.data 
      // console.log(this.prodName)
      // if(meta.status === 201) {
      //   this.$message({
      //     message: meta.msg,
      //     type:'success'
      //   })
      // } else {
      //   this.$message.error(meta.msg)
      // }
       var res = await this.$http.post('/goods', this.prodName)
          var {meta} = res.data
          if (meta.status === 201) {
              this.$message({
                  message: meta.msg,
                  type: 'success'
              })
              this.$router.push('/goods')
          } else {
              this.$message.error(meta.msg)
        }
    }
  },
  mounted () {
    this.getAllCate()
  }
}
</script>

<style>
.el-alert {
    margin: 15px 0;
}
.el-step__title{
    font-size: 12px;
}
.el-tabs__content {
  height: 547px;
}

.quill-editor {
    height: 400px;
}
</style>
