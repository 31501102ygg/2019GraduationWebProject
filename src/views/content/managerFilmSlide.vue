<template>
  <div>
    <el-button
      type="primary"
      @click="AddFormVisible=true"
    >添加幻灯片</el-button>

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
        width="50%"
        title="图片上传"
        :visible.sync="imgUploadVisible"
        append-to-body
      >
        <el-upload
          class="avatar-uploader"
          ref="upload_slide"
          action="http://localhost:8090/upload/img/slide"
          :show-file-list="false"
          :multiple="false"
          :headers="upload_header"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :on-change="changeUploadImgURL"
          :auto-upload="false"
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
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button
            type="primary"
            @click="submitUpload"
            style="float:right"
          >确认上传</el-button>
          <el-button
            @click="imgUploadVisible = false"
            style="float:right"
          >取 消</el-button>
        </div>
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
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="EditFormVisible = false"
          style="float:right"
        >确认修改</el-button>
        <el-button
          @click="EditFormVisible = false"
          style="float:right"
        >取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="幻灯片添加"
      :visible.sync="AddFormVisible"
    >
      <el-form
        label-position="left"
        label-width="50px"
        :model="slide_add_item"
      >
        <el-form-item label="名称">
          <el-input v-model="slide_add_item.title"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input v-model="slide_add_item.content"></el-input>
        </el-form-item>
        <el-form-item label="图片">
          <el-upload
            class="avatar-uploader"
            ref="add_upload_slide"
            action="http://localhost:8090/upload/img/slide"
            :show-file-list="false"
            :multiple="false"
            :headers="upload_header"
            :on-success="handleAddSlideSuccess"
            :before-upload="beforeAvatarUpload"
            :on-change="changeUploadImgURL"
            :auto-upload="false"
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
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="submitAdd"
          style="float:right"
        >确认添加</el-button>
        <el-button
          @click="AddFormVisible = false"
          style="float:right"
        >取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "film_slide",
  inject: ["reload"],
  created(){
    this.$options.methods.getShowSlideList.bind(this)()
    this.$options.methods.searchSlideList.bind(this)()
  },
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
    //上传图片之前先检查图片信息
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
    },
    changeUploadImgURL(file) {
      console.log(file);
      this.upload_img = URL.createObjectURL(file.raw);
    },
    submitUpload() {
      this.$refs.upload_slide.submit();
    },
    //幻灯片图片更换成功调用的函数
    handleAvatarSuccess(res, file) {
      console.log(res);
      console.log(file);
    },
    //幻灯片添加成功调用的函数
    handleAddSlideSuccess(res, file) {
      if (res.code === "ACK") {
        this.slide_add_item.img = res.data;
        this.$options.methods.submitSlideAddForm.bind(this)();
      } else {
        this.$message({
          message: res.message,
          type: "warning"
        });
      }
    },
    submitAdd() {
      this.$refs.add_upload_slide.submit();
    },
    submitSlideAddForm() {
      this.$axios
        .post("slide/add", this.slide_add_item)
        .then(res => {
          return Promise.resolve(res);
        })
        .then(json => {
          json = json.data;
          if (json.code === "ACK") {
            this.$message({
              message: json.message,
              type: "success"
            });
          } else {
            this.$message({
              message: json.message,
              type: "warning"
            });
          }
          this.AddFormVisible = false;
        })
        .catch(error => {
          this.AddFormVisible = false;
          console.log(error);
        });
    },
    getShowSlideList(){
      this.$axios.get("slide/list")
      .then(res=>{return Promise.resolve(res)})
      .then(json=>{
        json=json.data
        if(json.code==='ACK'){
          this.showSlides=json.data
        }else{
          this.$message({
            message:json.message,
            type:"warning"
          })
        }
      })
      .catch(error=>{console.log(error)})
    },
    searchSlideList(){
      this.$axios.post("slide/search",this.searchSlideForm)
      .then(res=>{return Promise.resolve(res)})
      .then(json=>{
        json=json.data
        if(json.code === 'ACK'){
          this.notShowSlides=json.data
          this.$options.methods.addSlideList.bind(this)()
        }else{
           this.$message({
            message:json.message,
            type:'warning'
          })
        }
      })
      .catch(error=>console.log(error))
    },
    addSlideList(){
      this.tableData=this.showSlides.concat(this.notShowSlides)
    }
  },
  data() {
    return {
      EditFormVisible: false,
      AddFormVisible: false,
      imgUploadVisible: false,
      searchSlideForm:{
        pageNum:1,
        pageSize:7,
        title:''
      },
      slide_item: {},
      slide_add_item: {},
      upload_img: "",
      upload_header: { Authorization: sessionStorage.getItem("JWT") },
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
      ],
      showSlides:[],
      notShowSlides:[]
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
.avatar-uploader {
  text-align: center;
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
  height: 300px;
  line-height: 300px;
  text-align: center;
}
.avatar {
  width: 500px;
  height: 300px;
  display: block;
}
.dialog-footer {
  height: 40px;
}
</style>