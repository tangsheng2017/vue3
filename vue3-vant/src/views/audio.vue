<template>
  <div class="audio">
    <iframe id="iframeDom" allow="autoplay" :src="mp3Url"></iframe>
    <audio
      id="videoDom"
      controls="controls"
      autoplay
      hidden="true"
      loop
      :src="mp3Url"
    ></audio>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mp3Url:
        "https://lnjyonline.u-road.com/Urescue/project/writable/uploads/images/notice/notice.mp3",
    };
  },
  // mounted() {
  //   setTimeout(() => {
  //     this.audioPlay();
  //   }, 500);
  // },
  // methods: {
  //   audioPlay() {
  //     const videoDom = document.getElementById("videoDom");
  //     const iframeDom = document.getElementById("iframeDom");
  //     iframeDom.onload = function () {
  //       console.log(1234);
  //       // videoDom.src = "";
  //       videoDom.oncanplay = function () {
  //         console.log(5678);
  //         videoDom.play();
  //       };
  //     };
  //   },
  // },
};
</script>

<style></style>
