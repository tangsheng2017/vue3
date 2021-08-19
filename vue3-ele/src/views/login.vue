<template>
  <div class="login">
    <el-image class="logo_icon" :src="logoIcon" lazy></el-image>
    <div class="login_con">
      <div class="login_title">UniSOS登录</div>
      <div class="login_input">
        <div class="login_input_txt">账号</div>
        <input type="text" v-model="formData.username" />
      </div>
      <div class="login_input">
        <div class="login_input_txt">密码</div>
        <input type="password" v-model="formData.password" />
      </div>
      <div class="login_input">
        <div class="login_input_txt">你是</div>
        <el-radio-group
          v-model="formData.radio"
          class="flex-spc-x"
          style="display: flex"
          fill="#D62329"
        >
          <el-radio
            v-for="(list, index) in radioList"
            :key="index"
            :label="list.label"
            >{{ list.name }}</el-radio
          >
        </el-radio-group>
      </div>
      <div class="login_btn" :style="{ opacity: isBtn ? '1' : '0.4' }">
        登录
      </div>
      <el-link
        class="login_link"
        :underline="false"
        href="https://iot.u-road.com/unisos/#/trialApplication"
        target="_blank"
      >
        <span>免费试用</span>
        <img src="../assets/login/logo_free_icon.png" />
      </el-link>
    </div>
    <div class="login_bottom">
      <el-divider>广州优路加信息科技有限公司</el-divider>
    </div>
  </div>
</template>

<script>
import md5 from "js-md5";
import { getNewsList } from "@/api/advisory.js";
export default {
  data() {
    return {
      logoIcon: require("@/assets/login/login_logo_icon.png"),
      radioList: [
        {
          name: "路段级",
          label: "1",
        },
        {
          name: "省级",
          label: "2",
        },
        {
          name: "国家级",
          label: "3",
        },
      ],
      formData: {
        username: "",
        password: "",
        radio: "1",
      },
    };
  },
  computed: {
    isBtn() {
      if (
        this.formData.username.length > 0 &&
        this.formData.password.length > 0
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    async getNewsList() {
      try {
        const vdata = await getNewsList(this.pullObj);
        console.log(vdata, "vdata");
        // this.handleResultList(result.data, type);
      } catch (error) {}
    },
    jmPasswork(pw) {
      return md5(pw);
    },
    //登录
    loginIn() {
      if (this.ifLoading) {
        return;
      }

      //this.$router.push('/index')
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
      this.$Post(
        "Admin/Sys/User/login",
        { data: postObj },
        (res) => {
          var vdata = res.data;
          this.$notifyMsg("提示", "登录成功");
          this.$common.setlocalStorage("userdata", JSON.stringify(vdata));
          this.$common.setlocalStorage("clientID", vdata.clientID);
          //登录成功
          setTimeout(() => {
            this.ifLoading = false;
            this.$router.replace("/index/home/index");
          }, 1500);
        },
        (err) => {
          setTimeout(() => {
            this.ifLoading = false;
          }, 1500);
          this.$alertShow(err.msg);
        },
        true
      );
    },
  },
};
</script>

<style lang="scss">
.login {
  width: 100%;
  height: 100%;
  background: #fafafa;
  .logo_icon {
    width: 108px;
    height: 48px;
    margin: 24px 0 0 38px;
  }
  .login_con {
    width: 420px;
    box-shadow: 0px 1px 18px 0px rgba(175, 0, 0, 0.14);
    border-radius: 10px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 0 40px;
    .login_title {
      font-size: 30px;
      font-weight: bold;
      color: #d62329;
      margin-top: 50px;
      text-align: center;
    }
    .login_input_txt {
      margin: 35px 0 20px 0;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.45);
    }
    input {
      width: 100%;
      padding-bottom: 6px;
      font-size: 14px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.25);
    }
    .login_btn {
      width: 420px;
      line-height: 60px;
      text-align: center;
      letter-spacing: 4px;
      background: #d62329;
      border-radius: 8px;
      opacity: 0.4;
      font-size: 18px;
      color: #fff;
      margin-top: 70px;
    }
    .login_link {
      margin: 30px 0 70px 0;
      color: #e7575c;
      // text-align: center;
      display: flex;
      justify-content: center;
      // align-items: center;
      img {
        width: 15px;
        margin-left: 4px;
      }
    }
  }
  .login_bottom {
    width: 500px;
    position: absolute;
    left: 50%;
    bottom: 6px;
    transform: translate(-50%);
  }
  .el-radio__input.is-checked + .el-radio__label {
    color: rgba(0, 0, 0, 0.65) !important;
  }
  .el-radio__input.is-checked .el-radio__inner {
    background: #d62329 !important;
    border-color: #d62329 !important;
  }
  .el-divider {
    background-color: #d62329;
  }
  .el-divider__text {
    background-color: #fafafa;
    color: #e7575c;
  }
  .el-link--inner {
    display: flex;
    align-items: center;
  }
}
</style>
