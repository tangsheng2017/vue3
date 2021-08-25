<template>
  <div class="baseDialog" :class="{ novisibility: !isShow }">
    <div class="dialog-box carInfo">
      <div class="mainBox">
        <div class="firstBox">
          <p>{{ pageData.title }}</p>
          <el-button
            icon="el-icon-close"
            class="firstButton"
            @click="close"
          ></el-button>
        </div>
        <div class="radioBox">
          <el-form
            class="card-info scroolBar"
            label-width="80px"
            :model="formData"
            :rules="rules"
            ref="formData"
          >
            <el-form-item label="旧密码" prop="oldpassword">
              <el-input
                v-model="formData.oldpassword"
                clearable
                placeholder="旧密码"
              ></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="password">
              <el-input
                v-model="formData.password"
                clearable
                placeholder="新密码"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="thirdBox flex-x-end">
          <el-row class="choice">
            <el-button class="choiceButton" @click="close()">取消</el-button>
            <el-button class="choiceButton" type="primary" @click="sendData()"
              >保存</el-button
            >
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import md5 from 'js-md5';
export default {
  props: {
    isShow: {
      type: [Boolean],
      default: false
    },
    pageData:{

    }
  },
  methods: {
    // 关闭弹窗
    close(data){
      let obj = {
        type:'passWordInfo',
        popType:'hide',
      }
      if(data){
        obj.data = data
      }
      this.closeDialog(obj)
    },
    jmPasswork(pw){
      return md5(pw)
    },
    //保存数据
    sendData() {
      this.$refs["formData"].validate((valid) => {
        if (valid) {
          var postObj = this.$common.deepCopy(this.formData)
          postObj.oldpassword = this.jmPasswork(postObj.oldpassword)
          postObj.password = this.jmPasswork(postObj.password)

          this.$Post("Api/App/User/saveUserPwd",{data:postObj},
            (res) => {
              var vdata = res.data;
              this.$notifyMsg('提示','修改密码成功')
              this.$common.removelocalStorage('userdata')
              //修改密码成功
              setTimeout(()=>{
                this.ifLoading = true
                this.$router.replace('/login')
              },1500)
            },
            (err) => {
              setTimeout(()=>{
                this.ifLoading = false
              },1500)
              this.$alertShow(err.msg)
            },true);
        } else {
          this.$notifyMsg('提示','请填写所有必填项','error')
          return false;
        }
      });
    },
  },
  inject:['closeDialog','reloadPage'],
  data () {
    return {
      formData:{
        oldpassword: '',
        password: '',
      },
      rules:{
        oldpassword:[{ required: true, message: '请输入旧密码', trigger: 'blur' }],
        password:[{ required: true, message: '请输入新密码', trigger: 'blur' }],
      },
    }
  }
}
</script>
<style scoped>
/*@import '../../style/element-variables.scss';*/
.baseDialog {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  transition: all 0.3s;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
}
.dialog-box {
  width: 500px;
  transition: all 0.3s;
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  z-index: 100;
}
.mainBox {
  position: relative;
  width: 100%;
  height: 100%;
}

.firstBox {
  width: 100%;
  height: 45px;
  position: relative;
  top: 0;
  color: #333;
  border: 1px solid rgba(228, 231, 237, 1);
  border-radius: 10px 10px 0 0;
}
.firstBox p {
  float: left;
  padding: 9px 0 0 15px;
  font-size: 18px;
}
.thirdBox {
  padding: 0 30px;
  height: 66px;
  width: 100%;
  border-radius: 0 0 10px 10px;
}
.firstButton {
  float: right;
  border: none;
  height: 100%;
}

.novisibility .dialog-box {
  top: -100%;
}

.radioBox {
  padding: 15px 30px 0 30px;
}
.main_line {
  height: 20%;
  padding: 10px 0 0 50px;
}

.info-item {
  margin-bottom: 20px;
  font-size: 16px;
}
.item-desc {
  word-break: keep-all;
}

.input-item-x {
  width: 50%;
}
.form-unit {
  margin: -25px 0 0 5px;
}
.carInfo >>> .el-checkbox {
  margin-right: 20px;
}
.el-checkbox.is-bordered + .el-checkbox.is-bordered {
  margin-left: 0;
}
</style>
<style></style>
