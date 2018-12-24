<template>
  <div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
      >
      </el-table-column>
      <el-table-column
        prop="releaseTimeString"
        label="日期"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="电影名"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="makeState"
        label="国家"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="language"
        label="语言"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="type"
        label="种类"
        width="180"
      >
      </el-table-column>
      <el-table-column
        label="操作"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button>
          <!-- <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val);
    },
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      this.form = row;
    }
  }
};
</script>

<style scoped>
</style>
