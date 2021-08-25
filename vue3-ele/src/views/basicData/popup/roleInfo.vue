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
          <el-row :span="24">
            <el-form ref="form" :model="form" :rules="rules" label-width="90px">
              <el-col :span="12">
                <el-form-item label="驻点" prop="pointname">
                  <el-input
                    v-model="form.pointname"
                    placeholder="请输入驻点"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="经度" prop="longitude">
                  <el-input
                    v-model="form.longitude"
                    placeholder="请输入经度"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="所属公司" prop="departid">
                  <el-select
                    v-model="form.departid"
                    placeholder="请选择所属公司"
                    @change="departChange"
                  >
                    <el-option
                      :label="item.CompName"
                      :value="item.ID"
                      v-for="item in companyDataList"
                      :key="item.ID"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="纬度" prop="latitude">
                  <el-input
                    v-model="form.latitude"
                    placeholder="请输入纬度"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="所属队伍" prop="teamid">
                  <el-select v-model="form.teamid" placeholder="请选择所属队伍">
                    <el-option
                      :label="item.teamname"
                      :value="item.ID"
                      v-for="item in teamDataList"
                      :key="item.ID"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-form>
          </el-row>
        </div>
        <div class="thirdBox flex-x-end">
          <el-row class="choice">
            <el-button class="choiceButton" @click="close">取消</el-button>
            <el-button class="choiceButton" type="primary" @click="sendData"
              >保存</el-button
            >
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    isShow: {
      type: [Boolean],
      default: false
    },
    pageData:{

    }
  },
  components: {

  },
  mounted() {
    if( this.pageData.data ){
      if( !!this.pageData.data && !!this.pageData.data.ID ){
        let itemData = this.$common.deepCopy(this.pageData.data)
        // delete itemData.primary
        // this.form = itemData
        this.getPointInfo(itemData.ID)
      }
    }else{
      this.$getCompanyData((res)=>{
        this.companyDataList = res
      })
      this.$getTeamData('',(res)=>{
        this.teamDataList = res
      })
      this.$getPointData('','',(res)=>{
        this.pointDataList = res
      })
    }


  },
  methods: {
    departChange(){
      this.$getTeamData(this.form.departid,(res)=>{
        this.teamDataList = res
        this.$set(this.form,'teamid','')
      })
    },
    close(data){
      let obj = {
        type:'roleInfo',
        popType:'hide',
      }
      if(data){
        obj.data = data
      }
      this.closeDialog(obj)
    },
    //保存数据
    sendData() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          var postObj = this.$common.deepCopy(this.form)
          postObj.username = postObj.EmplName
          this.$Post("Admin/Resource/Point/savePointData",{data:postObj},
            (res) => {
              var vdata = res.data
              postObj.ID = vdata
              this.$notifyMsg('提示','操作成功')
              this.close(postObj)
            },
            (err) => {
              this.$alertShow(err.msg)
            },
            true);
        } else {
          this.$notifyMsg('提示','请填写所有必填项','error')
          return false;
        }
      });
    },
    //获取详情
    getPointInfo(id) {
      var postObj = {ID:id}
      this.$Post("Admin/Resource/Point/getPointInfo",{data:postObj},
        (res) => {
          var vdata = res.data
          this.form = vdata
          // this.form.teamid = vdata.ID

          this.$getCompanyData((res)=>{
            this.companyDataList = res
          })
          this.$getTeamData('',(res)=>{
            this.teamDataList = res
          })
          this.$getPointData('','',(res)=>{
            this.pointDataList = res
          })

        },
        (err) => {
          this.$alertShow(err.msg)
        },
        true);
    },
  },
  inject:['closeDialog'],
  data () {
    return {
      companyDataList:[],
      teamDataList:[],
      pointDataList:[],
      userdata : this.$route.params.userdata,//客服信息
      form: {
        // RoleName: '',
        // Remark: '',
        ID:0,//新增传0 更新传id
        // PlatfromID:'',//	是	string	平台id

      },
      rules: {
        pointname: [
          { required: true, message: '请填写驻点', trigger: 'blur' },
        ],
        longitude: [
          { required: true, message: '请填写经度', trigger: 'blur' },
        ],
        departid: [
          { required: true, message: '请选择所属公司', trigger: 'blur' },
        ],
        latitude: [
          { required: true, message: '请填写纬度', trigger: 'blur' },
        ],
        teamid: [
          { required: true, message: '请选择所属队伍', trigger: 'blur' },
        ],
      },


    }
  }
}
</script>
<style scoped>
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
  width: 820px;
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
</style>
<style>
.radioBox .el-select {
  width: 100%;
}
</style>
