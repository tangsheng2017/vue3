<template>
  <div class="tablePaper clearfix" v-if="!!PagerOrder">
    <el-pagination
      style="float: right"
      background
      :page-size="PagerOrder.size"
      :pager-count="5"
      :current-page="currPageNum"
      layout="prev, pager, next"
      @current-change="currentChange"
      :total="PagerOrder.totalCount"
    >
    </el-pagination>
    <span class="pagerInfo"
      >共 {{ PagerOrder.totalCount }} 条， 每页 {{ PagerOrder.size }} 条
    </span>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    //分页数据
    PagerOrder: {},
    //当前页码
    currPageNum: {
      type: Number,
      default: 1
    },

  },
  methods: {
    currentChange(data){
      let obj = {
        type: 'paperNumChange',
        data: data
      }
      this.$emit("tablePaperEven", obj);
    },

  },
  data () {
    return {
      pagerCount: 6
    }
  }
}
</script>

<style scoped>
.tablePaper {
  width: 100%;
  height: 100%;
  background: #fff;
}
.pagerInfo {
  float: right;
  font-size: 14px;
  line-height: 32px;
  margin-right: 10px;
}
</style>
