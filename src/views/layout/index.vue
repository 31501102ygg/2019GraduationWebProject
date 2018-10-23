<template>
    <el-container style="width:100%;height:100%">
    <el-row class="tac" style="width:100%;height:100%">
      <el-container id="navBar" :style="{width:navBarWidth+'vw'}">
        <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#3f51b5"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse="isCollapse"
      :style="{width:navBarWidth+'vw'}">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>用户管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">网站用户</el-menu-item>
          <el-menu-item index="1-2">后台管理员</el-menu-item>
        </el-menu-item-group>
        <!-- <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu> -->
      </el-submenu>
        <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>电影信息</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1">电影上传</el-menu-item>
          <el-menu-item index="2-2">后台管理员</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>电影影评信息</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="3-1">电影影评</el-menu-item>
          <el-menu-item index="3-2">后台管理员</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
      </el-container>
    <el-container style="height:100%;display：inline-block;">
      <el-header style="height:5%;padding:0;background-color:#9fa8da">
        <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height:5vh;">
          <icon style = "float:left;height:5vh" name="ham-toolbar" split="" @click.native.prevent="navBarChange"></icon>
          <el-breadcrumb-item >首页</el-breadcrumb-item>
          <el-breadcrumb-item>活动管理</el-breadcrumb-item>
          <el-breadcrumb-item>活动列表</el-breadcrumb-item>
          <el-breadcrumb-item>活动详情</el-breadcrumb-item>
          <img src="@/assets/admin-head.png" alt="头像" style="float:right;height:5vh">
        <el-dropdown style="float:right;line-height:5vh;padding-right:1vw">
          <span class="el-dropdown-link" style="color:#303133">
            {{adminName}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item disabled>双皮奶</el-dropdown-item>
            <el-dropdown-item divided>退出</el-dropdown-item>
          </el-dropdown-menu>
      </el-dropdown>
        </el-breadcrumb>
      </el-header>
      <el-main style="height:90%">
        <router-view class="admin_page_main"></router-view>
      </el-main>
    </el-container>
</el-row>
</el-container>
</template>

<script>
import Icon from "vue2-svg-icon/Icon.vue";

export default {
  name: "admin_layout",
  data() {
    return {
        adminName: "ygg",
        isCollapse:false,
        navBarWidth: 15,
        breadcrumb:{}
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      this.adminName = "123"
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      this.adminName = "ygg"
      console.log(key, keyPath);
    },
    navBarChange(){
      var width = this.navBarWidth;
      if(this.isCollapse===true){
        this.isCollapse = false;
        this.navBarWidth = 15;
      }else{
        this.navBarWidth = 4;
        this.isCollapse = true;
      }
    }
  },
  components: {
    Icon
  }
};

</script>

<style>
.el-submenu{
  text-align: left
}
.el-menu-item{
  text-align: left
}
.el-menu{
  height:100%;
  border:0
}
#navBar{
  height:100%;
  float: left;
}
</style>