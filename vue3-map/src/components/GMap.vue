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
  data() {
    return {
      map: null,
    };
  },
  methods: {
    // 插点
    addMark() {
      // 获取已经添加的覆盖物
      this.map.getAllOverlays();
      // 同时移除点标记和矢量圆形
      // this.map.remove([marker, circle]);
      // 使用clearMap方法删除所有覆盖物
      this.map.clearMap();

      var marker = new AMap.Marker({
        icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
        position: [116.405467, 39.907761],
        anchor: "bottom-center", //通过 anchor 可以方便的设置锚点方位
      });
      this.map.add(marker);
    },
    //区域掩模初始化地图
    initDistricTMap() {
      var opts = {
        subdistrict: 0,
        extensions: "all",
        level: "province",
      };
      //利用行政区查询获取边界构建mask路径
      //也可以直接通过经纬度构建mask路径
      var district = new AMap.DistrictSearch(opts);
      district.search("辽宁", function (status, result) {
        var bounds = result.districtList[0].boundaries;
        var mask = [];
        for (var i = 0; i < bounds.length; i += 1) {
          mask.push([bounds[i]]);
        }
        var map = new AMap.Map("container", {
          mask: mask,
          center: [122.679588, 40.902067],
          viewMode: "3D",
          showLabel: true, //是否显示地区
          pitch: 40, //经度旋转角度
          zoom: 7.8,
          rotation: 4, //纬度旋转角度
          zooms: [7.2, 22],
          mapStyle: "amap://styles/a7da7365e32e4626b0484f64417c23ec",
        });

        //添加高度面（2.0不支持）
        // var object3Dlayer = new AMap.Object3DLayer({ zIndex: 1 });
        // map.add(object3Dlayer);
        // var height = -300000;
        // var color = "#000"; //rgba
        // var wall = new AMap.Object3D.Wall({
        //   path: bounds,
        //   height: height,
        //   color: color,
        // });
        // wall.transparent = true;
        // object3Dlayer.add(wall);
        //添加描边
        for (var j = 0; j < bounds.length; j += 1) {
          new AMap.Polyline({
            path: bounds[j],
            strokeColor: "#45688a",
            strokeWeight: 6,
            map: map,
          });
        }
        var trafficLayer = new AMap.TileLayer.Traffic({
          zIndex: 10,
        });
        trafficLayer.setMap(map);
        map.on("complete", () => {
          // 地图图块加载完成后触发
          console.log(1234);
        });
      });
    },
    //初始化地图
    initMap() {
      const self = this;
      let map = new AMap.Map("container", {
        center: [116.397428, 39.90923],
        resizeEnable: true,
        zoom: 10,
        mapStyle: "amap://styles/a7da7365e32e4626b0484f64417c23ec",
        // showIndoorMap: false, // 是否在有矢量底图的时候自动展示室内地图，PC默认true,移动端默认false
        // dragEnable: false, // 地图是否可通过鼠标拖拽平移，默认为true
        // keyboardEnable: false, //地图是否可通过键盘控制，默认为true
        // doubleClickZoom: false, // 地图是否可通过双击鼠标放大地图，默认为true
        // zoomEnable: false, //地图是否可缩放，默认值为true
        // rotateEnable: false, // 地图是否可旋转，3D视图默认为true，2D视图默认false
      });
      self.map = map;
    },
    // 地图销毁
    destroyMap() {
      this.map && this.map.destroy();
    },
  },
  //在mounted阶段调用（mounted可以操作DOM）
  mounted() {
    // const self = this;
    this.initDistricTMap();
    // this.map.on("complete", function () {
    //   self.addMark(); //插点
    // });
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
