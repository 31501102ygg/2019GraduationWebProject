<template>
  <div>
    <el-button type="primary">添加幻灯片</el-button>

    <el-table
      :data="tableData"
      style="width: 100%"
      :row-class-name="tableRowClassName"
    >
      <el-table-column
        prop="createTimeString"
        label="创建日期"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="updateTimeString"
        label="更新日期"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="state"
        label="状态"
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
          <el-button
            size="mini"
            :disabled="scope.row.state === 1"
            @click="handleExchange(scope.$index, scope.row)"
          >替换</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="幻灯片编辑"
      :visible.sync="EditFormVisible"
    >
      <el-dialog
        width="60%"
        title="图片上传"
        :visible.sync="imgUploadVisible"
        append-to-body
      >
        <el-upload
          class="avatar-uploader"
          action="http://localhost:8090/img/upload/admin"
          :show-file-list="false"
          :headers="upload_header"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="upload_img"
            :src="upload_img"
            class="avatar"
          >
          <i
            v-else
            class="el-icon-plus avatar-uploader-icon"
          ></i>
        </el-upload>
      </el-dialog>
      <el-form
        label-position="left"
        label-width="50px"
        :model="slide_item"
      >
        <el-form-item label="名称">
          <el-input v-model="slide_item.title"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input v-model="slide_item.content"></el-input>
        </el-form-item>
        <el-form-item label="图片">
          <el-card :body-style="{ padding: '0px' }">
            <img
              :src="slide_item.img_url"
              style="width:100%"
            >
            <el-button
              type="text"
              class="button"
              @click="imgUploadVisible=true"
            >更换图片</el-button>
          </el-card>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "film_slide",
  inject: ["reload"],
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex < 3) {
        return "warning-row";
      } else {
        return "success-row";
      }
    },
    handleEdit(index, row) {
      this.EditFormVisible = true;
      this.slide_item = row;
    },
    handleDelete(index, row) {
      this.reload();
    },
    handleExchange(index, row) {
      this.reload();
    },
    handleAvatarSuccess(res, file) {
      this.upload_img = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 10;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 10MB!");
      }
      return isJPG && isLt2M;
    }
  },
  data() {
    return {
      EditFormVisible: false,
      imgUploadVisible: false,
      slide_item: {},
      upload_img:"",
      upload_header:{Authorization:sessionStorage.getItem("JWT")},
      tableData: [
        {
          createTimeString: "2016-05-02 00:00:00",
          updateTimeString: "2016-05-02 00:00:00",
          title: "王小虎",
          content: "123456789",
          img_url:
            "https://ygg-31501102-bucket.oss-cn-shenzhen.aliyuncs.com/movie_slide/p2540362544.jpg",
          state: 1
        },
        {
          createTimeString: "2016-05-04 00:00:00",
          updateTimeString: "2016-05-02 00:00:00",
          title: "王小虎",
          content: "123456789",
          img_url:
            "https://ygg-31501102-bucket.oss-cn-shenzhen.aliyuncs.com/movie_slide/p2540362544.jpg",
          state: 1
        },
        {
          createTimeString: "2016-05-01 00:00:00",
          updateTimeString: "2016-05-02 00:00:00",
          title: "王小虎",
          content: "123456789",
          img_url:
            "https://ygg-31501102-bucket.oss-cn-shenzhen.aliyuncs.com/movie_slide/p2540362544.jpg",
          state: 1
        },
        {
          createTimeString: "2016-05-03 00:00:00",
          updateTimeString: "2016-05-02 00:00:00",
          title: "王小虎",
          content: "123456789",
          img_url:
            "https://ygg-31501102-bucket.oss-cn-shenzhen.aliyuncs.com/movie_slide/p2540362544.jpg",
          state: 0
        }
      ]
    };
  }
};
</script>


<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}

.el-button {
  float: left;
  margin-left: 10px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 500px;
  height: 200px;
  line-height: 200px;
  text-align: center;
}
.avatar {
  width: 500px;
  height: 200px;
  display: block;
}
</style>