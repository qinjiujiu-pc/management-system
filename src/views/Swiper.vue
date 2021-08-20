<!--Swiper.vue-->

<template #header>
  >
  <el-card class="swiper-container">
    <div class="header">
      <el-button
        type="primary"
        size="small"
        icon="el-icon-plus"
        @click="handleAdd"
        >增加</el-button
      >
      <el-popconfirm
        title="确定删除吗？"
        confirmButtonText="确定"
        cancelButtonText="取消"
        @confirm="handleDelete"
      >
        <template #reference>
          <el-button type="danger" size="small" icon="el-icon-delete"
            >批量删除</el-button
          >
        </template>
      </el-popconfirm>
    </div>
    <!-- load这个属性用来等待加载动画 -->
    <el-table
      :load="loading"
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column label="轮播图" width="200">
        <template #default="scope">
          <!-- el-table-column 提供具名插槽，并且可以通过 #default="scope"，拿到每一项的单独数据对象，可以在模板中进行使用，如 scope.row.carouselUrl。 -->
          <img
            style="width: 150px; height: 150px"
            :src="scope.row.carouselUrl"
            alt="轮播图"
          />
        </template>
      </el-table-column>
      <el-table-column label="跳转链接">
        <template #default="scope">
          <a target="_blank" :href="scope.row.redirectUrl">{{
            scope.row.redirectUrl
          }}</a>
        </template>
      </el-table-column>
      <el-table-column prop="carouselRank" label="排序值" width="120">
      </el-table-column>
      <el-table-column prop="createTime" label="添加时间" width="200">
      </el-table-column>
    </el-table>
    <!-- 这个组件是分页组件el-pagination -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="pageSize"
      :current-page="currentPage"
      @current-change="changePage"
    />
  </el-card>
  <DialogAddSwiper ref="addSwiper" :reload="getCarousels" :type="type" />
</template>
<script>
import { onMounted, reactive, ref, toRefs } from "vue";
import axios from "@/utils/axios";
import DialogAddSwiper from "@/components/DialogAddSwiper.vue";
import { ElMessage } from "element-plus";
export default {
  name: "Swiper",
  components: {
    DialogAddSwiper,
  },
  setup() {
    const addSwiper = ref(null);
    const state = reactive({
      loading: false, // 控制加载动画
      tableData: [], // 数据列表
      currentPage: 1, // 当前页数
      pageSize: 10, // 每页请求数
      type: "add", // 操作类型
      multipleSelection: [], // 选中项
      total: 0, // 总条数
    });

    // 添加轮播项
    const handleAdd = () => {
      state.type = "add";
      addSwiper.value.open();
    };
    // 修改轮播图
    const handleEdit = (id) => {
      state.type = "edit";
      addSwiper.value.open(id);
    };
    onMounted(() => {
      getCarousels();
    });
    // 获取轮播图列表
    const getCarousels = () => {
      state.loading = true;
      axios
        .get("/carousels", {
          params: {
            pageNumber: state.currentPage,
            pageSize: state.pageSize,
          },
        })
        .then((res) => {
          state.tableData = res.list;
          state.loading = false;
          state.currentPage = res.currPage;
          state.loading = false;
        });
    };
    const changePage = (val) => {
      state.currentPage = val;
      getCarousels();
    };
    // 选中之后的change方法，一旦选项有变化，就会触发该方法。
    const handleSelectionChange = (val) => {
      state.multipleSelection = val;
    };
    const handleDelete = () => {
      if (!state.multipleSelection.length) {
        ElMessage.error("请选择项");
        return;
      }
      axios
        .delete("/carousels", {
          data: {
            ids: state.multipleSelection.map((i) => i.carouselId),
          },
        })
        .then(() => {
          ElMessage.success("删除成功");
          getCarousels();
        });
    };

    return {
      ...toRefs(state),
      addSwiper,
      handleAdd,
      handleEdit,
      getCarousels, // 这里将获取轮播图列表的接口返回，因为弹窗内部添加后，需要刷新列表
      handleSelectionChange,
      handleDelete,
    };
  },
};
</script>
