<template>
    <el-container class='login-container' >
        <el-header>
            电影影评网站后台
        </el-header>
        <el-container class="form-container">
            <el-main>
                <el-row>
                    <el-col :span='12'><img style="height:500px" src="@/assets/login-pic.jpg" alt="阿甘正传"></el-col>
                    <el-col :span='12'>
                        <el-card class="box-card">
                            <el-form ref="form" :model="form" label-width="80px">
                                <el-form-item  class="form-item">   
                                    <span style="font-size:30px">电影影评网站后台管理</span>
                                </el-form-item> 
                                <el-form-item  class="form-item">   
                                    <icon style = "float:left;" name="user" split="" :w="40" :h="40"></icon>
                                    <el-input style="width:80%" v-model="form.name"></el-input>
                                </el-form-item> 
                                <el-form-item class="form-item"> 
                                    <icon style = "float:left;" name="password" split="" :w="40" :h="40"></icon>                                    
                                    <el-input style="width:80%" v-model="form.password"></el-input>
                                </el-form-item> 
                                <el-form-item class="form-item"> 
                                    <el-button style="width:80%" type="primary"  @click.native.prevent="login">
                                    登录
                                    </el-button>
                                </el-form-item>
                            </el-form>
                        </el-card>
                    </el-col>
                </el-row>
            </el-main>
        </el-container>
        <el-footer>
            底部
        </el-footer>
    </el-container>
</template>

<script>
import Icon from 'vue2-svg-icon/Icon.vue'
import qs from 'qs';

export default {
  name: "Login",

  data() {
    return {
      form: {
        name: "ygg",
        password: "123456"
      }
    };
  },
  methods:{
      login (){
          var data = qs.stringify({
                  username:this.form.name,
                  password:this.form.password
          })
          this.$axios.post('/login',data)
          .then(function(res){
              return Promise.resolve(res.data);
          }).then(function(json){
              console.log(json.message)
          }).catch(function(error){
              console.log(error)
          })
          console.log("login")
      }
  },
  components: {
    Icon
  }
};
</script>

<style lang="scss" scoped>
    .login-container{
        margin: 0%;
    }
    .form-item{
        margin: 10%;
        margin-left: 0px;
    }
    .box-card{
        background-color:#DCDFE6;
        text-align: center;
        width: 80%; 
        height: 500px;
    }
</style>
