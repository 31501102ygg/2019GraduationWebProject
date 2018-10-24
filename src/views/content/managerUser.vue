<template>
    <div style="width:100%">
        <div style="width:100%">
        <el-form :inline="true" :model="formInline" class="demo-form-inline" style="float:left;margin-left:2vw">
            <el-form-item label="用户名">
                <el-input v-model="formInline.user" placeholder="username"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
        </div>
        <div >
        <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
            type="selection"
            width="55">
            </el-table-column>
            <el-table-column
            prop="date"
            label="日期"
            width="120">
            </el-table-column>
            <el-table-column
            prop="username"
            label="账号"
            width="120">
            </el-table-column>
            <el-table-column
            prop="address"
            label="地址"
            width="120">
            </el-table-column>
             <el-table-column
            prop="username"
            label="姓名"
            show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        </div>
    </div>
</template>

<script>
import qs from "qs";

export default {
    name:"managerUser",
    data() {
      return {
        formInline: {
          user: '',
          region: ''
        },
        tableData: [],
        multipleSelection: []
      }
    },
    methods: {
      onSubmit() {
        var data = qs.stringify({
            username: this.formInline.user
        });
        console.log(data);
        //设置请求头
        this.$axios.defaults.headers.common['Authorization'] = sessionStorage.getItem('JWT');
        this.$axios
        .post("/user/list", data)
        .then(function(res) {
            console.log(res)
          return Promise.resolve(res.data);
        })
        .then((json) => {
            this.tableData = json.data;
          console.log(json.data);
        })
        .catch(function(error) {
          console.log(error);
        });
      },
       toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(val)
      },
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    }
}
</script>

