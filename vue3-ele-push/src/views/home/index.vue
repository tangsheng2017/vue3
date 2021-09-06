<template>
  <div class="orderList contentbox">
    <div class="content-info flex-xy">
      <div class="index-info" v-if="infoList.length > 0">
        <div class="card-progress" v-for="(info, key) in infoList" :key="key">
          <div class="item-top theme-bg-color flex-spc-x">
            <div class="flex-spc-x">
              <span>工单编号：{{ info.rescueno }}</span>
              <span
                >位置：{{ info.roadname }} ｜ 往{{ info.directionname }}方向 ｜
                {{ info.miles }}</span
              >
              <span>建单时间：{{ info.callhelptime }}</span>
            </div>
            <span class="cursor-p" @click="toOrder(info)">查看详情</span>
          </div>
          <div v-for="(item, index) in info.dispatch" :key="index">
            <div
              v-if="item.flow"
              class="progress-title flexc-cen-x theme-color"
            >
              <span class="iconfont icon-jiuyuanche"></span>
              <div>救援车：{{ item.dispatchvehicleplate }}</div>
            </div>
            <transverse-progress
              v-if="item.flow"
              :stepInfo="item"
              pageFrom="index"
            ></transverse-progress>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import transverseProgress from "../../components/content/transverseProgress"; //横向进度条
import { getHomeRescueData } from "@/api/index.js";
export default {
  components: {
    transverseProgress,
  },
  computed: {
    ...mapState({
      // 获取数据
      topTabClick: (state) => state.topTabClick, //顶部导航栏点击
    }),
  },
  activated() {
    if (!this.topTabClick) {
      this.getLoadData();
    } else {
      this.refresh();
    }
  },
  deactivated() {
    clearInterval(this.refreshTime);
    this.refreshTime = null;
  },
  mounted() {
    // this.getLoadData();
    this.getHomeRescueData();
  },
  methods: {
    //登录
    async getHomeRescueData() {
      const vdata = await getHomeRescueData({});
      try {
        vdata.forEach((item) => {
          item.from = "index";
        });
        this.infoList = vdata;
      } catch (error) {}
    },
    getLoadData() {
      this.getHomeRescueData();
      this.refresh();
    },
    //打开弹窗
    openDialog(data) {
      //type,ifshow,data
      data.title = data.title || "";
      this.dialogdata = data;
      this.indexPageDialog = data.ifshow;
    },
    //弹窗关闭触发
    closeDialog(data) {
      let dialogdata = this.$common.deepCopy(this.dialogdata); // 当前弹窗数据
      let popData = data; // 弹窗关闭前回调数据

      if (popData.type == "classesInfo") {
        if (!!popData.data && !!popData.data.departID) {
          this.getHomeRescueData();
        }
      }

      //恢复初始化
      this.dialogdata = {};
      this.indexPageDialog = false;
    },
    //跳转详情
    toOrder(info) {
      this.$router.push(`/index/order/orderDetail/${info.rescueid}`);
    },
    //定时刷新
    refresh() {
      if (this.refreshTime) {
        clearInterval(this.refreshTime);
        this.refreshTime = null;
      }
      this.refreshTime = setInterval(() => {
        this.getHomeRescueData();
      }, 1000 * 10);
    },
  },
  provide() {
    return {
      openDialog: this.openDialog,
      closeDialog: this.closeDialog,
    };
  },
  data() {
    return {
      indexPageDialog: false, //是否显示弹窗
      dialogdata: {}, //弹窗数据
      infoList: [],
      refreshTime: null,
    };
  },
};
</script>

<style scoped>
.card-info {
  width: 100%;
}
.index-info {
  width: 100%;
}
.card-progress {
  background: #fff;
  margin-bottom: 20px;
  padding-bottom: 10px;
}
.item-top {
  height: 40px;
  font-size: 14px;
  color: #fff;
  padding: 0 30px;
}
.item-top > div > span {
  margin-right: 30px;
}
.progress-title {
  font-size: 14px;
  padding: 10px 30px;
}
.progress-title > div {
  margin-left: 5px;
}
</style>
<style>
.orderList .el-icon-date {
  display: none;
}
</style>
