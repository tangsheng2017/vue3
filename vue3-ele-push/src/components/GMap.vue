<template>
  <div class="map">
    <div id="container" />
  </div>
</template>

<script>
import AMap from "AMap"; //引入高德地图AMap
export default {
  name: "GMap",
  props: {}, //添加变量，方便组件复用
  methods: {
    //初始化地图
    initMap() {
      let self = this;
      let map = new AMap.Map("container", {
        center: [116.397428, 39.90923],
        resizeEnable: true,
        zoom: 10,
        mapStyle: "amap://styles/a7da7365e32e4626b0484f64417c23ec",
      });
      self.map = map;
    },
  },
  //在mounted阶段调用（mounted可以操作DOM）
  mounted() {
    this.initMap();
  },
};
</script>

<style lang="scss" scoped>
.map,
#container {
  width: 100%;
  height: 100%;
}
</style>
