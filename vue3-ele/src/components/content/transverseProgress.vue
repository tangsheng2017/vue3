<template>
  <div class="progress-info">
    <div class="info-list flexs-spc-x">
      <div
        class="list-item flex-xy"
        v-for="(item, index) in stepInfo.flow"
        :key="index"
        :style="{ width: `calc(${100 / stepInfo.flow.length}%)` }"
      >
        <div
          class="item-top text-limit-simple"
          :class="{ 'cursor-p': pageFrom != 'index' }"
          v-if="item.istimeout == '1'"
          @click="openOvertimeInfo(stepInfo, item)"
        >
          <span class="list-top">超时{{ item.timeouttime }}min</span>
          <span v-if="pageFrom != 'index'">
            <i class="el-icon-edit-outline" v-if="!item.timeoutreason"></i>
            <span v-else>></span>
          </span>
        </div>
        <div class="item-top flex-xy" v-else></div>
        <div class="step-item flexc-cen-x">
          <div
            class="left-line line-item"
            :class="{ 'theme-bg-color': item.uploadtime }"
          >
            <div class="right-line-time" v-if="item.istimeout == 1">
              {{ item.bztime }}分钟
            </div>
          </div>
          <div
            class="item-dot"
            :class="{ 'theme-color': item.uploadtime, 'big-size': item.last }"
          >
            ●
          </div>
          <div
            class="right-line line-item"
            :class="{ 'theme-bg-color': item.uploadtime && !item.last }"
          >
            <div
              class="right-line-isempty"
              v-if="item.isempty == 1 || item.isempty == 2"
            >
              ({{
                item.isempty == "1"
                  ? "有偿空驶"
                  : item.isempty == "2"
                  ? "无偿空驶"
                  : ""
              }})
            </div>
          </div>
        </div>
        <div class="item-name" :class="{ 'theme-color': item.uploadtime }">
          {{ item.nodename }}
        </div>
        <div
          class="item-time flex-xy"
          :class="{ 'cursor-p': stepInfo.node_time_operation == 1 }"
          @click="openNodetimeInfo(stepInfo, item)"
          v-if="item.uploadtime"
        >
          <div>{{ item.uploadtime.substr(5, 5) }}</div>
          <div>
            {{ item.uploadtime.substr(11, 8)
            }}<i
              v-if="stepInfo.node_time_operation == 1 && !noEdit"
              class="el-icon-edit-outline cursor-p"
            ></i>
          </div>
        </div>
        <div v-else class="item-time"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pageFrom: {
      type: [String],
    },
    stepInfo: {
      type: [Array, Object],
    },
    noEdit: {
      type: [Boolean],
    },
  },

  methods: {
    openOvertimeInfo(data, obj) {
      var cur_data = Object.assign({}, data, obj);
      this.$emit("openOvertimeInfo", cur_data);
    },
    openNodetimeInfo(data, obj) {
      if (this.noEdit) {
        return;
      }
      if (data.node_time_operation == 1) {
        var cur_data = Object.assign({}, data, obj);
        this.$emit("openNodetimeInfo", cur_data);
      }
    },
  },
};
</script>

<style scoped>
.progress-info {
  width: 100%;
}
.list-item {
  width: 33%;
}
.list-top {
  color: #ee615f;
}
.step-item {
  width: 100%;
  height: 20px;
}
.item-top {
  height: 20px;
  font-size: 10px;
  width: 100%;
  text-align: center;
}
.line-item {
  height: 2px;
  width: calc(50% - 5px);
  font-size: 12px;
  background: #dfe9de;
}
.item-name {
  font-size: 16px;
  margin: 8px 0 2px 0;
  color: #666;
}
.item-dot {
  font-size: 24px;
  margin-top: -2px;
  color: #d2e0d2;
}
.big-size {
  font-size: 30px;
}
/* .list-item i{margin-left: 5px;} */
.item-time {
  height: 40px;
}
.list-item:first-child .left-line {
  visibility: hidden;
}
.list-item:last-child .right-line {
  visibility: hidden;
}
.right-line,
.left-line {
  position: relative;
}
.right-line-time {
  position: absolute;
  left: 0;
  width: 60px;
  margin-left: -30px;
  text-align: center;
}
.right-line-isempty {
  color: #ffa400;
  position: absolute;
  right: 0;
  width: 60px;
  top: -16px;
  margin-right: -30px;
  text-align: center;
}
</style>
