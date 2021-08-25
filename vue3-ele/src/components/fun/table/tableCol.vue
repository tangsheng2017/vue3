<template>
  <div class="" v-if="!!item">
    <div v-if="item.type == 'text'">
      <el-tooltip
        placement="top"
        popper-class="myTooltip"
        v-if="item.showTooltip && !!scope.row[item.tooltipTextKey]"
      >
        <div>
          <div v-html="scope.row[item.tooltipTextKey]"></div>
        </div>
        <div class="tb-text">
          <span
            class="table-txt"
            :class="{ 'text-limit': !!item.maxLimit }"
            :style="{
              '-webkit-line-clamp': item.maxLimit,
              color: scope.row[item.colorkey],
            }"
          >
            <img
              class="voice-pic"
              :class="{ cur: !!scope.row[item.juckKey] }"
              v-if="!!scope.row[item.iconKey]"
              :src="scope.row[item.iconKey]"
              :style="{ width: item.iconSize }"
              @click="textIconClick(item, scope.row)"
            />

            <span
              class="circle-text"
              v-if="!!item.circleColor && scope.row[item.circleColor]"
              :style="{ background: scope.row[item.circleColor] }"
            ></span>
            {{ scope.row[item.key] }}
          </span>
        </div>
      </el-tooltip>
      <div class="tb-text" v-else>
        <span
          class="table-txt"
          :class="{ 'text-limit': !!item.maxLimit }"
          :style="{
            '-webkit-line-clamp': item.maxLimit,
            color: scope.row[item.colorkey],
          }"
        >
          <img
            class="voice-pic"
            :class="{ cur: !!scope.row[item.juckKey] }"
            v-if="!!scope.row[item.iconKey]"
            :src="scope.row[item.iconKey]"
            :style="{ width: item.iconSize }"
            @click="textIconClick(item, scope.row)"
          />

          <span
            class="circle-text"
            v-if="!!item.circleColor && scope.row[item.circleColor]"
            :style="{ background: scope.row[item.circleColor] }"
          ></span>
          {{ scope.row[item.key] }}
        </span>
      </div>
    </div>
    <div v-else-if="item.type == 'rich-text'">
      <div class="tb-text">
        <span
          class="table-txt"
          :class="{ 'text-limit': !!item.maxLimit }"
          :style="{ '-webkit-line-clamp': item.maxLimit }"
          v-html="scope.row[item.key]"
        ></span>
      </div>
    </div>
    <div v-else-if="item.type == 'image'">
      <div class="advert-picBox" v-if="item.canClick == 0">
        <img
          v-if="!!scope.row[item.key]"
          class="advert-pic"
          :src="scope.row[item.key]"
          :style="{ width: item.iconSize }"
        />
      </div>
      <viewer class="advert-picBox" v-else>
        <img
          v-if="!!scope.row[item.key]"
          class="advert-pic"
          :src="scope.row[item.key]"
          :style="{ width: item.iconSize }"
        />
      </viewer>
    </div>
    <div v-else-if="item.type == 'imageList'">
      <div
        class="imgListBox"
        v-if="!!scope.row[item.key] && scope.row[item.key].length > 0"
      >
        <viewer :images="scope.row[item.key]">
          <div
            v-for="(imgItem, imgIndex) in scope.row[item.key]"
            :key="imgIndex"
            class="imgListItem"
          >
            <img v-if="!!imgItem" :src="imgItem" />
          </div>
        </viewer>
      </div>
    </div>
    <div v-else-if="item.type == 'status'">
      <div class="tb-text">
        <img
          class="voice-pic"
          v-if="!!checkIdInArr(scope.row[item.judeKey], item.status.data).icon"
          :src="checkIdInArr(scope.row[item.judeKey], item.status.data).icon"
          :style="{
            width: checkIdInArr(scope.row[item.judeKey], item.status.data)
              .iconSize,
          }"
        />
        <span
          v-if="checkIdInArr(scope.row[item.judeKey], item.status.data)"
          :style="{
            color: checkIdInArr(scope.row[item.judeKey], item.status.data)
              .statuscolor,
          }"
          >{{
            checkIdInArr(scope.row[item.judeKey], item.status.data).statusname
          }}</span
        >
        <span v-else :style="{ color: item.status.defulColor }">{{
          scope.row[item.status.defulKeyName]
        }}</span>
      </div>
    </div>
    <div v-else-if="item.type == 'button'">
      <div v-if="item.btnLis.length > 0">
        <template v-for="(items, indexs) in item.btnLis" :key="indexs">
          <el-button
            type="text"
            size="small"
            v-if="scope.row[items.judeKey] == items.judeValue"
            :disabled="!!items.disabled"
            @click="tableCellClick(items.type, scope.row)"
            >{{ items.name }}
          </el-button>
        </template>
      </div>
    </div>
    <!-- <div v-else-if="item.type == 'select'">
      <div class="tb-text" v-if="!!scope.row[item.optionListKey]">
        <el-select
          v-model="scope.row[item.key]"
          placeholder="请选择"
          @change="selectItemChange(scope.row)"
        >
          <el-option
            v-for="(item, index) in scope.row[item.optionListKey]"
            :key="index"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  props: {
    item: {},
    scope: {},
  },

  data() {
    return {
      multipleSelection: [], //多选值
    };
  },

  methods: {
    //操作
    tableCellClick(type, data) {
      let obj = {
        type: type,
        data: data,
      };
      this.$emit("tableCellClick", obj);
    },
    textIconClick(item, data) {
      if (item.juckKey) {
        let obj = {
          type: item.key,
          data: data,
        };
        this.$emit("tableCellClick", obj);
      }
    },
    checkIdInArr(id, arr) {
      let str = false;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].statusid == id) {
          str = arr[i];
          break;
        }
      }
      return str;
    },
    //多选修改回调
    changeFun(val) {
      this.multipleSelection = val; // 返回的是选中的列的数组集合
    },
    //下拉框选择值改变
    selectItemChange(val, row) {
      // console.log(val)
      let obj = {
        type: "selectItemChange",
        data: val,
      };
      this.$emit("tableCellClick", obj);
    },
  },
};
</script>

<style scoped>
.tb-text {
  display: flex;
  align-items: center;
}
.advert-pic {
  width: 100%;
}
.voice-pic {
  width: 100%;
  display: inline-block;
}
.cur {
  cursor: pointer;
}
.circle-text {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
}
/*.circle-text{display: inline-block;width: 20px;height: 20px;border-radius: 50%;}*/
.text-limit {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.imgListBox {
  width: 100%;
}
.imgListItem {
  width: 32.333%;
  float: left;
  height: 50px;
  overflow: hidden;
  position: relative;
  margin-right: 1%;
  margin-bottom: 5px;
}
.imgListItem > img {
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
<style>
.myTooltip {
  max-width: 400px;
}
</style>
