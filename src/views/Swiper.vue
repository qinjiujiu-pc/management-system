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
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
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
  </el-card>
</template>
<script>
import { onMounted, reactive, ref, toRefs } from "vue";
import axios from "@/utils/axios";
import DialogAddSwiper from "@/components/DialogAddSwiper.vue";
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
      type: 'add', // 操作类型
    });

    onMounted(() => {
      getCarousels();
    });
    // 获取轮播图列表
    const getCarousels = () => {
      state.loading = true;
      //   script 的逻辑也很直观，就是通过 axios.get 获取表格数据，赋值给 tableData 进行数据渲染。
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
        });
    };
     const handleAdd = () => {
        state.type = 'add'
        addSwiper.value.open()
      }
      // 修改轮播图
      const handleEdit = (id) => {
        state.type = 'edit'
        addSwiper.value.open(id)
      }
    return {
      ...toRefs(state),
       addSwiper,
        handleAdd,
        handleEdit,
        getCarousels, // 这里将获取轮播图列表的接口返回，因为弹窗内部添加后，需要刷新列表
    };
  },
};
</script>
