<template>
    <el-container style="width:100%;height:100%">
    <el-row class="tac" style="width:100%;height:100%">
      <el-container id="navBar" :style="{width:navBarWidth+'vw'}">
      <el-menu id="navbar"
      default-active="1-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      @select="handleSelect"
      background-color="#3f51b5"
      text-color="#fff"
      active-text-color="#ffd04b"
      :style="{width:navBarWidth+'vw'}">
      <el-submenu index="1">
        <template slot="title">
          <icon style = "float:left;height:3vh;margin:1.5vh;" name="user-admin" split="" ></icon>
          <span>用户管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1" @click.native.prevent="breadCrumbAdd">网站用户</el-menu-item>
          <el-menu-item index="1-2">后台管理员</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
        <el-submenu index="2">
        <template slot="title">
          <icon style = "float:left;height:3vh;margin:1.5vh;" name="movie" split="" ></icon>
          <span>电影信息</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1">电影上传</el-menu-item>
          <el-menu-item index="2-2">后台管理员</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <icon style = "float:left;height:3vh;margin:1.5vh;" name="paper" split="" ></icon>
          <span>影评信息</span>
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
          <icon style = "float:left;height:5vh" name="bread-logo" split="" ></icon>
          <el-breadcrumb-item style="color=white" v-for="nav in navBarName" :key="nav.id">{{nav.name}}</el-breadcrumb-item>
          <img src="@/assets/admin-head.png" alt="头像" style="float:right;height:5vh">
        <el-dropdown style="float:right;line-height:5vh;padding-right:1vw">
          <span class="el-dropdown-link" style="color:#303133">
            {{adminName}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>注册</el-dropdown-item>
            <el-dropdown-item disabled>双皮奶</el-dropdown-item>
            <el-dropdown-item divided>退出</el-dropdown-item>
          </el-dropdown-menu>
      </el-dropdown>
        </el-breadcrumb>
      </el-header>
      <el-main style="width:100%;height:90%">
        <router-view ></router-view>
      </el-main>
    </el-container>
</el-row>
</el-container>
</template>

<script>
import Icon from "vue2-svg-icon/Icon.vue";

var navbar = [
  {
    name:'用户管理',
    children:[
      {
        name:'网站用户',
        path:'/admin/page/manage/user'
      },
      {
        name:'后台管理员',
        path:'/admin/page/manage/admin'
      }
    ]
  },
  {
    name:'电影信息',
    children:[
        {
          name:'电影上传'
        },
        {
          name:'后台管理员'
        }
      ]
  },
  {
    name:'影评信息',
    children:[
      {
        name:'电影影评'
      },
      {
        name:'后台管理员'
      }
    ]
  }
];
export default {
  name: "admin_layout",
  data() {
    return {
        adminName: "ygg",
        isCollapse:true,
        navBarWidth: 15,
        breadcrumb:{},
        navBarName:[
          {name:'用户管理'},
          {name:'网站用户'}
          ]
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
    handleSelect(key, keyPath){
      console.log(keyPath)
      var index = keyPath[keyPath.length-1].match(/\d/g)
      var nav=[],temp,path
      for(let i of index){
        if(temp!=null)
          temp = temp.children[i-1]
        else
          temp = navbar[i-1]
        let ob = new Object();
        ob.name = temp.name
        nav.push(ob)
        if(temp.path!=null)
          path = temp.path
      }
      this.navBarName = nav
      this.$router.push(path)
    },
    breadCrumbAdd(){
      console.log(document.getElementById("navbar"));
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
.el-breadcrumb__inner{
  color: white
}
</style>