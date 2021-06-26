<template>
  <div class="advisoryDetails">
    <div class="title">{{detailData.title}}</div>
    <div class="timer">发布于 {{detailData.intime}}</div>
    <div class="con" v-html="detailData.content"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      detailData:{}
    }
  },
  mounted () {
    let id = this.$route.params.id
    this.getDetail(id)
  },
  methods: {
    // 获取详情
    getDetail(id){
      let postObj = {newsid:id};
      this.$Post("Api/App/Administration/newsDetail",{data:postObj},
        (res) => {
          let vdata = res.data;
          console.log('获取详情',vdata)
          this.detailData = vdata
        },
        (err) => {
          this.$alertShow(err.msg)
        },true);
    },
  }
}
</script>

<style scoped>
.advisoryDetails{width: 6.7rem;margin: 0.4rem auto;}
.title{font-size: 0.4rem;}
.timer{font-size: 0.25rem;color: #999;margin: 0.3rem 0;}
.con{margin-bottom: 0.2rem;}

</style>
<style>
.con img{max-width: 100%;}
</style>