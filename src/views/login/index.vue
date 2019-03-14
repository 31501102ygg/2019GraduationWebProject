<template>
  <el-container
    v-loading="loading"
    class='login-container'
    style="height:100%"
  >
    <el-header style="height:0%">
    </el-header>
    <el-container
      class="form-container"
      style="height:85%"
    >
      <el-main style="margin-top:5%;height:100%">
        <el-row style="height:100%">
          <el-col :span='12'>
            <el-card
              class="box-card"
              style="float:right"
            >
              <el-form
                ref="form"
                :model="form"
                label-width="80px"
              >
                <el-form-item class="form-item">
                  <span style="font-size:30px">电影影评网站后台管理</span>
                </el-form-item>
                <el-form-item class="form-item">
                  <icon
                    style="float:left;"
                    name="user"
                    split=""
                    :w="40"
                    :h="40"
                  ></icon>
                  <el-input
                    style="width:80%"
                    v-model="form.name"
                  ></el-input>
                </el-form-item>
                <el-form-item class="form-item">
                  <icon
                    style="float:left;"
                    name="password"
                    split=""
                    :w="40"
                    :h="40"
                  ></icon>
                  <el-input
                    style="width:80%"
                    v-model="form.password"
                    type="password"
                  ></el-input>
                </el-form-item>
                <el-form-item class="form-item">
                  <el-button
                    style="width:80%"
                    type="primary"
                    @click.native.prevent="login"
                  >
                    登录
                  </el-button>
                </el-form-item>
              </el-form>
            </el-card>
          </el-col>
          <el-col
            :span='12'
            style="height:100%"
          ><img
              style="height:80%;"
              src="@/assets/login-p1.png"
              alt="阿甘正传"
            ></el-col>
        </el-row>
      </el-main>
    </el-container>
    <div
      class="footer"
      style="background-color:#DCDFE6;height:10%"
    >
      <el-row style="height:100%">
        <el-col
          :span="11"
          style="height:100%"
        >
          <img
            src="@/assets/footer-logo.png"
            style="line-height:10vh;width:12vh;float:right;height:100%"
          />
        </el-col>
        <el-col
          :span="13"
          style="height:100%"
        >
          <p style="float:left;height:100%;line-height:10vh;margin:0px">Copyright &copy; 31501102_叶港归</p>
        </el-col>
      </el-row>
    </div>
  </el-container>
</template>

<script>
import Icon from "vue2-svg-icon/Icon.vue";
import qs from "qs";

export default {
  name: "Login",

  data() {
    return {
      loading: false,
      form: {
        name: "ygg",
        password: "123456"
      }
    };
  },
  methods: {
    login() {
      this.loading = true;
      var data = qs.stringify({
        username: this.form.name,
        password: this.form.password
      });
      this.$axios
        .post("/login", data)
        .then(res => {
          this.loading = false;
          return Promise.resolve(res.data);
        })
        .then(json => {
          if (json.code == "ACK") {
            if (json.data.role === "admin") {
              sessionStorage.setItem("JWT", json.data.token);
              sessionStorage.setItem("username", this.form.name);
              this.$router.push("/admin/page/manage/user");
            } else this.$message("你不是管理员，登录失败");
          } else {
            this.$message.error(json.message);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
      console.log("login");
    }
  },
  components: {
    Icon
  }
};
</script>

<style lang="scss" scoped>
.login-container {
  margin: 0%;
}
// .form-container {
//   background-image: url(../../assets/login-bg.jpg);
// }
.form-item {
  margin: 10%;
  margin-left: 0px;
}
.box-card {
  background-color: #dcdfe6;
  text-align: center;
  width: 80%;
  height: 500px;
}
</style>
