<template>
  <div class="table" v-if="tableData">
    <el-table
      v-if="showTable"
      ref="tableDom"
      :data="tableData"
      style="width: 100%"
      @selection-change="changeFun"
    >
      <template v-for="(item, index) in tabelHeader" :key="index">
        <el-table-column
          v-if="item.type == 'selection'"
          type="selection"
          width="55"
        >
        </el-table-column>
        <!--多行表头-->
        <el-table-column
          v-else-if="item.type == 'tablecol'"
          :label="item.value"
          header-align="center"
        >
          <template
            v-for="(child1, child1_index) in item.child"
            :key="child1_index"
          >
            <!--多行表头-->
            <el-table-column
              v-if="child1.type == 'tablecol'"
              :label="child1.value"
              header-align="center"
            >
            </el-table-column>
            <el-table-column
              v-else
              :prop="child1.key"
              :label="child1.value"
              :width="child1.width"
            >
              <template v-slot="scope">
                <tableCol
                  :item="child1"
                  :scope="scope"
                  @tableCellClick="tableCellClick"
                ></tableCol>
              </template>
            </el-table-column>
          </template>
        </el-table-column>
        <el-table-column
          v-else
          :prop="item.key"
          :label="item.value"
          :width="item.width"
        >
          <template v-slot="scope">
            <tableCol
              :item="item"
              :scope="scope"
              @tableCellClick="tableCellClick"
            ></tableCol>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
import tableCol from "./tableCol";
export default {
  components: {
    tableCol,
  },
  props: {
    // 表头
    tabelHeader: Array,
    //表格数据
    tableData: Array,
  },

  data() {
    return {
      multipleSelection: [], //多选值
      showTable: true,
    };
  },
  watch: {
    tabelHeader() {
      this.showTable = false;
      setTimeout(() => {
        this.showTable = true;
      }, 200);
    },
  },
  methods: {
    //操作
    tableCellClick(obj) {
      this.$emit("tableCellClick", obj);
    },
    textIconClick(obj) {
      this.$emit("tableCellClick", obj);
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
/*.circle-text{display: inline-block;width: 6px;height: 6px;border-radius: 50%;}*/
.circle-text {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 5px;
}
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
