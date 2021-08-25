<template>
  <router-view />
</template>
<script>
export default {};
</script>
<style lang="scss">
@import "@/common/style/base";
.scroolBar::-webkit-scrollbar,
.el-table__body-wrapper::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  background-color: rgba(0, 0, 0, 0);
}
/*定义滚动条的轨道，内阴影及圆角*/
.scroolBar::-webkit-scrollbar-track,
.el-table__body-wrapper::-webkit-scrollbar-track {
  /*-webkit-box-shadow: inset 10px 10px 6px rgba(0,0,0,0);*/
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0);
}
/*定义滑块，内阴影及圆角*/
.scroolBar::-webkit-scrollbar-thumb {
  width: 10px;
  height: 20px;
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
  background-color: rgba(255, 255, 255, 0);
}
.el-table__body-wrapper::-webkit-scrollbar-thumb {
  width: 10px;
  height: 20px;
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
  background-color: rgba(0, 0, 0, 0.1);
}
.scroolBar:hover::-webkit-scrollbar-thumb,
.el-table__body-wrapper:hover::-webkit-scrollbar-thumb {
  /*-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);*/
  background-color: rgba(0, 0, 0, 0.1);
}
/*table滚动条修改*/
.el-table--scrollable-y .el-table__body-wrapper::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  background-color: rgba(0, 0, 0, 0);
  position: absolute;
  left: 30px;
}
/*定义滚动条的轨道，内阴影及圆角*/
.el-table--scrollable-y .el-table__body-wrapper::-webkit-scrollbar-track {
  /*-webkit-box-shadow: inset 10px 10px 6px rgba(0,0,0,0);*/
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0);
}
/*定义滑块，内阴影及圆角*/
.el-table--scrollable-y .el-table__body-wrapper::-webkit-scrollbar-thumb {
  width: 10px;
  height: 20px;
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
  background-color: rgba(255, 255, 255, 0);
}
.el-table--scrollable-y .el-table__body-wrapper:hover::-webkit-scrollbar-thumb {
  /*-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);*/
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
