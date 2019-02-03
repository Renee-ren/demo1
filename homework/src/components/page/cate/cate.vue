<template>
    <el-card>
        <mybread firstnav="商品管理" lastnav="商品分类" />
        <el-button type="success" plain>添加分类</el-button>
        <el-table :data="model.menus" border max-height="250">
            <el-table-tree-column file-icon="icon icon-file" folder-icon="icon icon-folder" prop="label" label="labelname" width="220"></el-table-tree-column>
            <el-table-column prop="description" label="description"   width="180"></el-table-column>
        </el-table>
    </el-card>
</template>

<script>
export default {
    data () {
        return {
            model: {
                menus:''
            }
        }
    }
}
</script>

<style>
.el-button {
    margin: 15px 0;
}
</style>
