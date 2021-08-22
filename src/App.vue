<template>
  <div class="layout">
    <!-- 登录页面内容 后续加入 -->
    <!-- 这个两个容器是都需要隐藏菜单 -->
    <!-- 如果if展示showmenu的话 就继续展示侧面菜单栏 如果不是的话就直接不展示 -->

    <el-container v-if="showMenu" class="container">
      <el-aside class="aside">
        <!--系统名称+logo-->
        <div class="head">
          <div>
            <img src="//s.weituibao.com/1582958061265/mlogo.png" alt="logo" />
            <span>PC 电商后台</span>
          </div>
        </div>
        <!--一条为了美观的线条-->
        <div class="line" />
        <!-- :router是 启动element-ui的router属性在index跳转path时候使用 -->
        <el-menu
          background-color="#222832"
          text-color="#fff"
          :router="true"
          :default-openeds="defaultOpen"
          :default-active="currentPath"
        >
          <el-submenu index="1">
            <template #title>
              <span>首页</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/"
                ><i class="el-icon-odometer" />首页</el-menu-item
              >
              <el-menu-item index="/add"
                ><i class="el-icon-plus" />添加商品</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template #title>
              <span>首页配置</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/swiper"
                ><i class="el-icon-picture" />轮播图配置</el-menu-item
              >
              <el-menu-item index="/hot"
                ><i class="el-icon-star-on" />热销商品配置</el-menu-item
              >
              <el-menu-item index="/new"
                ><i class="el-icon-sell" />新品上线配置</el-menu-item
              >
              <el-menu-item index="/recommend"
                ><i class="el-icon-thumb" />为你推荐配置</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template #title>
              <span>模块管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/category"
                ><i class="el-icon-menu" />分类管理</el-menu-item
              >
              <el-menu-item index="/good"
                ><i class="el-icon-s-goods" />商品管理</el-menu-item
              >
              <el-menu-item index="/order"
                ><i class="el-icon-s-order" />订单管理</el-menu-item
              >
              <el-menu-item index="/guest"
                ><i class="el-icon-user-solid" />会员管理</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template #title>
              <span>系统管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/account"
                ><i class="el-icon-lock" />修改密码</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
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
    <!-- 上面是显示侧边栏 如果符合else的条件  就使用下面的隐藏侧边栏 -->
    <el-container v-else class="container">
      <router-view />
    </el-container>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import { localGet, pathMap } from "@/utils";
// 判断登录页面是否需要隐藏

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  setup() {
    //不需要菜单的路劲数组、
    const noMenu = ["/login"];
    const router = useRouter();
    const state = reactive({
      showMenu: true, // 是否需要显示菜单
      defaultOpen: ["1", "2", "3","4"],
      currentPath: "/",
    });
    // 监听路由的变化
    //  路由监听 是否打开新页面
    router.beforeEach((to, from, next) => {
      if (to.path == "/login") {
        // 如果路径是 /login 则正常执行
        next();
      } else {
        // 如果不是 /login，判断是否有 token
        if (!localGet("token")) {
          // 如果没有，则跳至登录页面
          next({ path: "/login" });
        } else {
          // 否则继续执行
          next();
        }
      }
      state.showMenu = !noMenu.includes(to.path);
      state.currentPath = to.path;
      document.title = pathMap[to.name];
    });
    return {
      ...toRefs(state),
    };
  },
};
</script>

<style scoped>
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

/* 右边部分的样式 */
.content {
  display: flex;
  flex-direction: column;
  max-height: 100vh;
  overflow: hidden;
}
.main {
  height: calc(100vh - 100px);
  overflow: auto;
  padding: 10px;
}
</style>




<style>
/* // 下面的style是公共样式部分 */
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
</style>