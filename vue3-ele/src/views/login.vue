<template>
  <div
    class="login flex-cen-xy"
    :style="{
      'background-image': configInfo.yzlogobgimg
        ? `url(${configInfo.yzlogobgimg})`
        : `url(${loginBg})`,
    }"
  >
    <div class="login-info flex-spc-x">
      <div class="login-left flex-cen-xy">
        <img
          class="login-left-img"
          :src="configInfo.yzxcimg ? configInfo.yzxcimg : `${loginBannerBg}`"
          alt=""
        />
      </div>
      <div class="login-right">
        <div class="login-title flexc-cen-x">
          <img :src="configInfo.yzlogo" class="login-logo" alt="logo" />
          <span :style="{ color: configInfo.ptmccolor }">{{
            configInfo.yzplatformname ? configInfo.yzplatformname : "救援平台"
          }}</span>
        </div>
        <el-form :model="loginObj">
          <el-form-item label="">
            <div class="flexc-cen-x">
              <span class="iconfont icon-yonghuming form-img login-icon"></span>
              <el-input
                v-model="loginObj.username"
                placeholder="请输入用户名"
                clearable
                @keyup.enter="loginIn"
              ></el-input>
            </div>
          </el-form-item>
          <el-form-item label="">
            <div class="flexc-cen-x">
              <span class="iconfont icon-mima form-img login-icon"></span>
              <el-input
                v-model="loginObj.password"
                type="password"
                placeholder="请输入密码"
                clearable
                @keyup.enter="loginIn"
              ></el-input>
            </div>
          </el-form-item>
          <el-button
            class="foot-btn"
            type="primary"
            @click="loginIn"
            :loading="ifLoading"
            >登录</el-button
          >
        </el-form>
      </div>
    </div>
    <div class="login-foot" :style="{ color: configInfo.pagefontcolor }">
      {{ configInfo.yzlogofont }}
    </div>
  </div>
</template>

<script>
import md5 from "js-md5";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { loginIn } from "@/api/login.js";
export default {
  data() {
    return {
      labelPosition: "left",
      ifLoading: false, //是否登陆中
      loginObj: {
        username: "",
        password: "",
      },
      loginBg: require("../assets/login/bg.png"),
      loginBannerBg: require("../assets/login/icon1.png"),
    };
  },
  computed: {
    ...mapState({
      // 获取数据
      configInfo: (state) => state.configInfo, //页面配置
      routerData: (state) => state.routerData, //菜单
    }),
  },
  methods: {
    //登录
    async loginIn() {
      if (this.ifLoading) {
        return;
      }
      let postObj = this.$common.deepCopy(this.loginObj);
      if (!postObj.username) {
        this.$notifyMsg("提示", "用户名不能为空", "error");
        return;
      }
      if (!postObj.password) {
        this.$notifyMsg("提示", "密码不能为空", "error");
        return;
      }
      this.$common.removelocalStorage("userdata");
      this.setDataByName({ key: "routerData", val: "" }); //菜单
      postObj.password = this.jmPasswork(postObj.password);
      this.ifLoading = true;
      const vdata = await loginIn(postObj);
      try {
        this.$notifyMsg("提示", "登录成功");
        this.$common.setlocalStorage("userdata", JSON.stringify(vdata));
        //登录成功
        setTimeout(() => {
          this.ifLoading = false;
          this.$router.replace("/index/home/index");
        }, 1500);
      } catch (error) {
        this.ifLoading = false;
      }
    },
    ...mapMutations({
      setDataByName: "setDataByName",
    }),
    jmPasswork(pw) {
      return md5(pw);
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  background: url("../assets/login/bg.png");
  background-size: 100% 100%;
}
.login-info {
  width: 925px;
  height: 592px;
  background: #fff;
  border-radius: 10px;
  padding: 100px;
}
.login-left {
  width: 367px;
}
.login-left-img {
  width: 100%;
}
.login-right {
  padding: 0 50px 59px 60px;
}
.login-title {
  font-size: 30px;
  text-align: center;
  font-weight: bold;
  margin: 56px 0;
  word-break: keep-all;
}
.login-logo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}
.foot-btn {
  margin-top: 31px;
}
.form-img {
  font-size: 28px;
  margin-right: 10px;
}
.login-foot {
  position: fixed;
  bottom: 30px;
  text-align: center;
  font-size: 15px;
  color: #fff;
}
</style>
