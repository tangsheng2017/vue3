<template>
  <div class="head-info flex-spc-x">
    <div class="head-img" @click="changeMemuHold">
      <img
        src="../../assets/home/fold.png"
        alt="折叠按钮"
        :class="isCollapse_menu ? 'open-icon' : 'hold-icon'"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  computed: {
    ...mapState({
      // 获取数据
      isCollapse_menu: (state) => state.isCollapse_menu, //导航栏是否折叠
    }),
  },

  methods: {
    ...mapMutations({
      setDataByName: "setDataByName",
    }),
    changeMemuHold() {
      this.setDataByName({
        key: "isCollapse_menu",
        val: !this.isCollapse_menu,
      });
    },
  },
};
</script>
<style scoped>
.head-info {
  width: 100%;
  height: 64px;
  background: #fff;
  padding: 0 20px;
}
.head-img > img {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
.hold-icon {
  transform: rotate(0deg);
}
.open-icon {
  transform: rotate(180deg);
}

.user {
  font-size: 14px;
  color: #28323d;
  position: relative;
}
.user-icon {
  width: 36px;
  height: 36px;
  margin: 0 10px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  box-shadow: 0 0 8px 0px rgba(0, 0, 0, 0.16);
}
.user-icon > img {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  position: absolute;
}
.down-icon {
  width: 10px;
}

.notice {
  position: relative;
  z-index: 99;
}
.notice_img {
  width: 16px;
  margin-right: 24px;
  margin-top: 6px;
  cursor: pointer;
}
.notice_img img {
  width: 100%;
}
.notice_con {
  width: 360px;
}
.title-clear {
  font-size: 12px;
  color: #666;
}
.notice_con .title {
  font-size: 15px;
  height: 40px;
  line-height: 40px;
  background-color: rgba(247, 247, 247, 0.5);
  margin-top: -10px;
  padding: 0 20px;
}
.list {
  padding: 0 20px;
  font-size: 14px;
  max-height: 650px;
  overflow: auto;
}
.arrow {
  width: 10px;
  height: 10px;
  border-top: 2px solid #ccc;
  border-left: 2px solid #ccc;
  transform: rotate(45deg);
}
.arrow-up {
  transform: rotate(225deg);
}
.list-item {
  border-bottom: 1px solid #f5f5f5;
  padding: 15px 0;
}
.list-item:last-child {
  border: none;
}
.list_title {
  font-weight: bold;
}
.list_title .icon {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}
.notice_list {
  width: 360px;
  max-height: 700px;
  overflow-y: scroll;
  padding: 0 10px;
}
.order {
  margin-left: 40px;
}
.order_list {
  line-height: 20px;
  margin-top: 10px;
}
.order_list .number {
  color: #666;
}
.order_list .time {
  color: #999;
  font-size: 12px;
}
.order .right {
  color: #159975;
  cursor: pointer;
}
</style>

<style>
.notice .el-dropdown-menu {
  padding: 0 0 !important;
}
</style>
