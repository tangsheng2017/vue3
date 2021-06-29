<template>
  <div class="advisoryList" id="content_box" @scroll="scrollBottom">
    <div
      class="list"
      v-for="(news, index) in newsList"
      :key="index"
      @click.stop="toAdvisoryDetails(news.newsid)"
    >
      <div class="txt">
        <p class="title">{{ news.title }}</p>
        <div class="time">{{ news.intime }}</div>
      </div>
      <div class="img">
        <img :src="news.cover_pic" alt="" />
      </div>
    </div>
    <div class="noData" v-if="noData">
      <!-- <img src="../../assets/nodata.png" /> -->
      <div>暂无数据</div>
    </div>
    <div v-else>
      <div class="noMore" v-show="noMore">已加载完</div>
      <div class="noMore" v-show="!noMore">正在加载</div>
    </div>
  </div>
</template>

<script>
import { getNewsList } from "@/api/advisory.js";
export default {
  data() {
    return {
      newsList: [],
      // 拉取列表
      pullObj: {
        index: 1,
        size: 10,
      },
      noMore: false, //是否可加载数据
      noData: false, //是否有数据
    };
  },
  mounted() {
    // this.getList("first");
    this.getNewsList()
  },
  methods: {
    async getNewsList() {
      // this.showLoading = true;
      // this.listData = [];
      try {
        const vdata = await getNewsList(this.pullObj);
        console.log(vdata)
        // this.handleResultList(result.data, type);
      } catch (error) {
        // this.errorToast(error.message);
      } finally {
        this.showLoading = false;
      }
    },
    scrollBottom() {
      // 滚动到页面底部时加载
      const el = document.querySelector("#content_box");
      const offsetHeight = el.offsetHeight;
      const scrollTop = el.scrollTop;
      const scrollHeight = el.scrollHeight;
      if (offsetHeight + scrollTop - scrollHeight == 0) {
        this.getList("more");
      }
    },
    toAdvisoryDetails(id) {
      this.$router.push(`/advisoryDetails/${id}`);
    },
    // 获取列表
    getList(tag = "first") {
      if (this.noMore && tag != "first") return;

      tag == "more" ? this.pullObj.index++ : (this.pullObj.index = 1); //判断是第一次加载还是拉取更多

      var postObj = this.$common.deepCopy(this.pullObj);
      this.$Post(
        "Api/App/Administration/newsList",
        { data: postObj },
        (res) => {
          var vdata = this.$common.deepCopy(res.data);
          console.log("获取列表", vdata);
          this.noData = false;
          if (tag == "first") {
            if (vdata.length == 0) {
              this.noData = true;
              this.newsList = [];
            } else {
              this.newsList = vdata;
              this.noMore = false;
            }
          } else {
            this.newsList = this.newsList.concat(vdata);
          }
          if (vdata.length < 10) {
            this.noMore = true;
          }
        },
        (err) => {
          this.$alertShow(err.msg);
        },
        true
      );
    },
  },
};
</script>

<style scoped>
#content_box {
  overflow-y: scroll;
  height: 100%;
}
.advisoryList {
  width: 6.9rem;
  margin: 0 auto;
}
.list {
  height: 2.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 0.02rem solid #eee;
}
.list:first-child {
  border: none;
}
.list .txt {
  width: 4.3rem;
  height: 1.4rem;
  font-size: 0.32rem;
  position: relative;
}
.txt .title {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.list .time {
  font-size: 0.22rem;
  color: #666;
  position: absolute;
  left: 0;
  bottom: 0;
}
.list .img {
  width: 2.2rem;
  height: 1.4rem;
  border-radius: 0.06rem;
  overflow: hidden;
}
.list .img img {
  width: 100%;
}
</style>
