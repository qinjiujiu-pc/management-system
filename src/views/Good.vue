<template>
  <el-card class="swiper-container">
    <template #header>
      <div class="header">
        <el-button
          type="primary"
          size="small"
          icon="el-icon-plus"
          @click="handleAdd"
          >新增商品</el-button
        >
      </div>
    </template>
    <el-table
      :load="loading"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
    >
      <el-table-column prop="goodsId" label="商品编号"> </el-table-column>
      <el-table-column prop="goodsName" label="商品名"> </el-table-column>
      <el-table-column prop="goodsIntro" label="商品简介"> </el-table-column>
      <el-table-column label="商品图片" width="150px">
        <template #default="scope">
          <!-- 注意商品主图这个地方，返回的是绝对路径 需要在main.js中做注释 -->
          <!-- 其实开发过程中，很多工具都需要全局设置，方便直接在 template 模板内引用。比如上述商品主图， -->
          <!-- 可能会返回一些绝对路径，导致图片加载失败。所以我们需要在 main.js 下，声明一个全局方法 -->

          <img
            style="width: 100px; height: 100px"
            :key="scope.row.goodsId"
            :src="$filters.prefix(scope.row.goodsCoverImg)"
            alt="商品主图"
          />
        </template>
      </el-table-column>
      <el-table-column prop="stockNum" label="商品库存"> </el-table-column>
      <el-table-column prop="sellingPrice" label="商品售价"> </el-table-column>
      <el-table-column label="上架状态">
        <template #default="scope">
          <span style="color: green" v-if="scope.row.goodsSellStatus == 0"
            >销售中</span
          >
          <span style="color: red" v-else>已下架</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="100">
        <template #default="scope">
          <a
            style="cursor: pointer; margin-right: 10px"
            @click="handleEdit(scope.row.goodsId)"
            >修改</a
          >
          <a
            style="cursor: pointer; margin-right: 10px"
            v-if="scope.row.goodsSellStatus == 0"
            @click="handleStatus(scope.row.goodsId, 1)"
            >下架</a
          >
          <a
            style="cursor: pointer; margin-right: 10px"
            v-else
            @click="handleStatus(scope.row.goodsId, 0)"
            >上架</a
          >
        </template>
      </el-table-column>
    </el-table>
    <!--总数超过一页，再展示分页器-->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="pageSize"
      :current-page="currentPage"
      @current-change="changePage"
    />
  </el-card>
</template>
<script>
import { onMounted, reactive, ref, toRefs } from "vue";
import axios from "@/utils/axios";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";

export default {
  name: "Good", //养成好习惯，每次新建页面 都要name进行语义化的编辑 对代码的整洁度很有帮助的
  setup() {
    //  获取路由实例 内含路由相关的各种方法
    const router = useRouter();
    const state = reactive({
      loading: false, //列表数据接口返回的loading
      tableDate: [], //列表数据
      total: 0, //总条数
      currentPage: 1, //当前页
      pageSize: 10, //分页大小
    });
    //初始化钩子函数
    onMounted(() => {
      getGoodList();
    });
    //获取轮播图列表
    const getGoodList = () => {
      state.loading = true;
      axios
        .get("/goods/list", {
          params: {
            pageNumber: state.currentPage, //当前页
            pageSiz: state.pageSize, //每页条数
          },
        })
        .then((res) => {
          state.tableData = res.list; // 列表数据
          state.total = res.totalCount; // 数据总条数
          state.currentPage = res.currPage; // 当前页
          state.loading = false; // 数据成功返回后，将列表 loading 清除
          app.ctx.goTop() //回到顶部
        });
    };
    // 添加商品，跳转到 /add 路径下
    const handleAdd = () => {
      router.push({ path: "/add" });
    };
    // 编辑商品，带 id 跳转 /add 路径
    const handleEdit = (id) => {
      router.push({ path: "/add", query: { id } });
    };
    // 翻页方法
    const changePage = (val) => {
      state.currentPage = val;
      getGoodList();
    };
    // 上下架方法
    const handleStatus = (id, status) => {
      axios
        .put(`/goods/status/${status}`, {
          ids: id ? [id] : [],
        })
        .then(() => {
          ElMessage.success("修改成功");
          getGoodList();
        });
    };
    // template 用到的方法变量，都需要在 setup 函数内 return 出去
    return {
      ...toRefs(state),
      handleAdd,
      handleEdit,
      getGoodList,
      changePage,
      handleStatus,
    };
  },
};
</script>
<style scoped>
  .good-container {
    min-height: 100%;
  }
  .el-card.is-always-shadow {
    min-height: 100%!important;
  }
</style>