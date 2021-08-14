<template>
  <div class="login-body">
    <!--登录框div-->
    <div class="login-container">
      <!--登录框头部logo部分-->
      <div class="head">
        <img class="logo" src="../assets/wxlogo1.jpg" />
        <div class="name">
          <div class="title">PC商城</div>
          <div class="tips">Vue3.0 后台管理系统</div>
        </div>
      </div>
      <!-- 登录框部分 -->

      <el-form
        label-position="top"
        :rules="rules"
        :model="ruleForm"
        class="login-form"
      >
        <!-- 账号 -->
        <el-form-item label="账号" prop="username">
          <el-input
            type="text"
            v-model.trim="ruleForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model.trim="ruleForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- 条款 -->
        <el-form-item>
          <div style="color: #333">登录表示您已同意<a>《服务条款》</a></div>
          <el-button style="width: 100%" type="primary" @click="submitForm"
            >立即登录</el-button
          >
          <el-checkbox v-model="checked" @change="!checked"
            >下次自动登录</el-checkbox
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from '@/utils/axios'
// 安装 js-md5，密码需要 md5 加密，服务端是解密 md5 的形式
import md5 from 'js-md5'
import { reactive, ref, toRefs } from 'vue'
import { localSet } from '@/utils'
export default {
  name: "Login",
  setup() {
    // el-form 组件接收一个 ref 属性，Vue 3.0 需要这样声明
    const loginForm = ref(null);
    const state = reactive({
      ruleForm: {
        username: "", // 账号
        password: "", // 密码
      },
      checked: true,
      // 表单验证判断。
      rules: {
        username: [
          { required: "true", message: "账户不能为空", trigger: "blur" },
        ],
        password: [
          { required: "true", message: "密码不能为空", trigger: "blur" },
        ],
      },
    });
    //表单提交方法
    const submitForm = (async) => {
      loginForm.value.validate((valid) => {
        //   valid是一个布尔值 表示表单是否通过了上面的rules的规则
        if (valid) {
          // /adminUser/login 登录接口路径
          axios
            .post("/adminUser/login", {
              username: status.ruleForm.userame || "",
              passwordMD5: md5(state.ruleForm.password), // 密码需要 md5 加密
            })
            .then((res) => {
              // 返回的时候会有一个token 这个令牌就是我们后续请求别的接口是需要带上的 证明我们登录成功了 否则无法跳转到别的页面
              // 这里我把他存到localStorage里面
              localSet("token", res);
              // 此处登录完成之后需要刷新页面
              window.location.href = "/";
            })

        }else{
            console.log('error submit!!!!')
            return false;
        }
      })
    }
    // 重制方法
    const resetForm = () => {
      // loginForm能拿到 el-form 的重制方法
      loginForm.value.resetFields();
    }
    return {
      ...toRefs(state),
      loginForm, // 注意，一定要返回 loginForm
      submitForm,
      resetForm
    }
 
  }
}
</script>

<style scoped>
.login-container {
  width: 420px;
  height: 500px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0px 21px 41px 0px rgba(0, 0, 0, 0.2);
}
.head {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px, 0, 20px 0;
}
.head img {
  width: 80px;
  height: 80px;
  margin-right: 20px;
}
.head .title {
  font-size: 28px;
  color: #1baeae;
  font-weight: bold;
}
.head .tips {
  font-size: 12px;
  color: #999;
}
.login-body {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #fff;
}
.login-form {
    width: 70%;
    margin: 0 auto;
  }
  .login-form >>> .el-form--label-top .el-form-item__label {
    padding: 0;
  }
  .login-form >>> .el-form-item {
    margin-bottom: 0;
  }
</style>