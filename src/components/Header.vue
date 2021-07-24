<template>
  <div class="header">
    <div class="left">
      <!-- 路由监听点击左边菜单栏的时候 右边的页面也跟着变化 -->
      <span style="font-size: 20px">{{ name }}</span>
    </div>
    <div class="right">右</div>
  </div>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped>
  .header {
    height: 50px;
    border-bottom: 1px solid #e9e9e9;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
  }
</style>