<template>
  <div class="home">
    <div class="map">
      <GMap></GMap>
    </div>
    <div>{{ moment().format("YYYY.MM.DD HH:00") }}</div>
    <div id="mycharts" :style="{ width: '100%', height: '300px' }" />
    <van-button type="default" @click="debouncedClick()">防抖按钮</van-button>
    <van-button type="default" @click="debouncedClick()">节流按钮</van-button>
  </div>
</template>

<script>
import moment from "moment";
// @ is an alias to /src
import GMap from "@/components/GMap.vue";
import * as echarts from "echarts";
import _ from "lodash";

export default {
  name: "Home",
  components: {
    GMap,
  },
  data() {
    return {
      moment: moment,
    };
  },
  mounted() {
    this.eChart();
    this.debouncedClick = _.debounce(this.submitDebounce, 500); //防抖
    this.throttledClick = _.throttle(this.submitThrottle, 500); //节流
  },
  methods: {
    eChart() {
      const myChart = echarts.init(document.getElementById("mycharts"));
      myChart.setOption({
        title: {
          text: "本月数据统计",
        },
        tooltip: {},
        legend: {
          data: ["任务数量"],
        },
        xAxis: {
          data: ["javascript", "vue", "ts", "react", "nginx"],
        },
        yAxis: {},
        series: [
          {
            name: "任务数量",
            type: "bar",
            data: [5, 20, 36, 10, 10],
          },
        ],
      });
      window.onresize = function () {
        //自适应大小
        myChart.resize();
      };
    },
    //提交--防抖
    submitDebounce() {},
    //提交--节流
    submitThrottle() {},
    // getRemote: _.debounce(function () {//防抖
    //   console.log("此处向后台发起请求:");
    // }, 1000),
  },
  unmounted() {
    // 移除组件时，取消防抖定时器
    this.debouncedClick.cancel();
    // 移除组件时，取消节流定时器
    this.submitThrottle.cancel();
  },
};
</script>
<style lang="scss" scoped>
.map {
  width: 500px;
  height: 300px;
}
</style>
