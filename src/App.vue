<template>
  <div class="layout">
    <el-container class="container">
      <!-- 侧边栏布局 -->
      <el-aside class="aside">
        <!--系统名称+logo-->
        <div class="head">
          <div>
            <img src="./assets/mainLogo.jpg" alt="logo" />
            <span>PC电商管理</span>
          </div>
        </div>
        <!--一条为了美观的线条-->
        <div class="line" />
        <el-menu background-color="#222832" text-color="#fff" :router="true">
          <!--一级栏目-->
          <el-submenu index="1">
            <template #title>
              <span>首页</span>
            </template>
            <!--二级栏目-->
            <el-menu-item-group>
              <el-menu-item index="/"
                ><i class="el-icon-data-line" />首页</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右边布局 -->
      <!--右边内容布局-->
      <el-container class="content">
        <Header />
        <div class="main">
          <!--将 <router-view></router-view> 移到这里，并且用单标签-->
          <router-view />
        </div>
        <Footer />
      </el-container>
    </el-container>
  </div>
  <router-view></router-view>
</template>

<script>
export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
};
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
</script>

<style scoped>
/* 侧边栏布局 */
.layout {
  min-height: 100vh;
  background-color: #ffffff;
}
.container {
  height: 100vh;
}
.aside {
  width: 200px !important;
  background-color: #222832;
}
.head {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
}
.head > div {
  display: flex;
  align-items: center;
}

.head img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}
.head span {
  font-size: 20px;
  color: #ffffff;
}
.line {
  border-top: 1px solid hsla(0, 0%, 100%, 0.05);
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}
</style>

<style>
body {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.el-menu {
  border-right: none !important;
}
.el-submenu {
  border-top: 1px solid hsla(0, 0%, 100%, 0.05);
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}
.el-submenu:first-child {
  border-top: none;
}
.el-submenu [class^="el-icon-"] {
  vertical-align: -1px !important;
}
a {
  color: #409eff;
  text-decoration: none;
}
.el-pagination {
  text-align: center;
  margin-top: 20px;
}
.el-popper__arrow {
  display: none;
}
/* 侧边栏布局结束 */
/* 右边布局开始 */
.content {
  display: flex;
  flex-direction: column;
  max-height: 100vh;
  overflow: hidden;
}
.main {
  height: 100vh;
  overflow: auto;
  padding: 10px;
  height: 100vh;
  height: calc(100vh - 100px);
}
/* 右边布局结束 */
</style>