<template>
  <el-card class="index-container">
    <el-table
      :load="loading"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
    >
      <el-table-column prop="configName" label="商品名称"> </el-table-column>
      <el-table-column label="跳转链接">
        <template #default="scope">
          <a target="_blank" :href="scope.row.redirectUrl">{{
            scope.row.redirectUrl
          }}</a>
        </template>
      </el-table-column>
      <el-table-column prop="configRank" label="排序值" width="120">
      </el-table-column>
      <el-table-column prop="goodsId" label="商品编号" width="200">
      </el-table-column>
      <el-table-column prop="createTime" label="添加时间" width="200">
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="scope">
          <a
            style="cursor: pointer; margin-right: 10px"
            @click="handleEdit(scope.row.configId)"
            >修改</a
          >
          <el-popconfirm
            title="确定删除吗？"
            confirmButtonText="确定"
            cancelButtonText="取消"
            @confirm="handleDeleteOne(scope.row.configId)"
          >
            <template #reference>
              <a style="cursor: pointer">删除</a>
            </template>
          </el-popconfirm>
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
   <DialogAddGood ref='addGood' :reload="getIndexConfig" :type="type" :configType="configType" />
</template>
<script>
import { onUnmounted, reactive, ref, toRefs } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "@/utils/axios";
import { ElMessage } from 'element-plus'
import DialogAddGood from '@/components/DialogAddGood.vue'
// 首页配置类型参数
const configTypeMap = {
  hot: 3,
  new: 4,
  recommend: 5,
};

export default {
  name: "IndexConfig",
  setup() {
    const router = useRouter();
    const route = useRoute()
      const state = reactive({
        loading: false,
        tableData: [], // 数据列表
        total: 0, // 总条数
        currentPage: 1, // 当前页
        pageSize: 10, // 分页大小
        type: 'add', // 操作类型
        configType: 3 ,// 3-(首页)热销商品 4-(首页)新品上线 5-(首页)为你推荐
         multipleSelection: [], // 选中项
      })
    // 监听路由变化
    const unWatch = router.beforeEach((to) => {
       if (['hot', 'new', 'recommend'].includes(to.name)) {
          // 通过 to.name 去匹配不同路径下，configType 参数也随之变化。
          state.configType = configTypeMap[to.name]
          state.currentPage = 1
          getIndexConfig()
        }
      })
      // 初始化
      onMounted(() => {
        state.configType = configTypeMap[route.name]
        getIndexConfig()
    });
     // 首页热销商品列表
      const getIndexConfig = () => {
        state.loading = true
        axios.get('/indexConfigs', {
          params: {
            pageNumber: state.currentPage,
            pageSize: state.pageSize,
            configType: state.configType
          }
        }).then(res => {
          state.tableData = res.list
          state.total = res.totalCount
          state.currentPage = res.currPage
          state.loading = false
        })
      }
      const changePage = (val) => {
        state.currentPage = val
        getIndexConfig()
      }
    onUnmounted(() => {
      unWatch();
    });
    // 首页配置类型参数
const configTypeMap = {
  hot: 3, // 热销
  new: 4, // 新品
  recommend: 5, // 推荐
}
     return {
        ...toRefs(state),
        getIndexConfig,
        changePage
      }
  },
};
</script>
