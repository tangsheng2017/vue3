<template>
  <div class="imgItem" :style="{width:w,height:h}" style="cursor: pointer;">
    <img v-if="placeIcon" :src="placeIcon">
    <!-- <img v-else src="../../../assets/home/addImg.png"> -->
    <input type="file" @change="change($event)" accept="image/*" capture="camera" multiple>

  </div>
</template>



<script type="text/ecmascript-6">
export default {
  props: {
    w: {
      type: [String, Number]
    },
    h: {
      type: [String, Number]
    },
    //图片id
    formDataId: {
      type: [String, Number]
    },
    //尺寸
    size:{type: [String]},
    //类型
    filetype:{type:[String]},
    placeIcon:{type:[String]},
    //上传类型    1041001：图片，1041006：视频， 1041002：word， 1041003：excel， 1041004：pdf， 1041005：其它
    type: {
      type: [String, Number],
      default: 1041001
    },
    index: {
      type: [String, Number]
    },
  },
  directives: {},
  components: {},
  data() {
    return {
      a: "",
      imageUrl: '',
      name:'test',
      typeList:{
        audio:['CD','WAVE','AIFF','MPEG','MP3','MPEG-4','MP4','MPEG-4','MIDI','WMA','RA','RM','RMX','VQF','OGGVORBIS','AMR','APE','FLAC','AAC'],
        video:['MP4','MPEG-4','AVI','MPEG','MOV','ASF','WMF','RM','RMVB','DIVX','MKV','VOB','WMV','MPE'],
        img:['PNG', 'JPG', 'JPEG', 'BMP', 'GIF', 'WEBP', 'PSD', 'SVG', 'TIFF']
      }
    };
  },
  mounted(){
    //console.log(client)
  },
  methods: {
    change(event) {
      var _this = this;
      var imgobj = event.target.files[0];

      if (!imgobj) {
        return;
      }
      if (imgobj.size > 20000 * 1024) {
        this.$alertShow("上传文件必须20M以内");
        return;
      }
      this.$loadingShow()
      var imgsize = (imgobj.size / 1024).toFixed(0);
      var imageUrl = this.getObjectURL(imgobj);
      this.convertImgToBase64(
        imageUrl,
        function(imgele) {
          // console.log(imgele);
          
          _this.uploadFile(imgele)
          event.target.value=''
          
        },
        imgsize
      );
      event.preventDefault();
    },
    getObjectURL(file) {
      var url = null;
      if (window.createObjectURL != undefined) {
        // basic
        url = window.createObjectURL(file);
      } else if (window.URL != undefined) {
        // mozilla(firefox)
        url = window.URL.createObjectURL(file);
      } else if (window.webkitURL != undefined) {
        // web_kit or chrome
        url = window.webkitURL.createObjectURL(file);
      }
      return url;
    },
    convertImgToBase64(url, callback, size) {
      var canvas = document.createElement("CANVAS");
      var ctx = canvas.getContext("2d");
      var img = new Image();
      size = parseInt(size);
      img.crossOrigin = "Anonymous";
      img.onload = function() {
        var width = img.width;
        var height = img.height;
        var rate = 1;
        //宽大于 800 且 大于1.5M
        if (width > 800 && size > 800) {
          rate = 800 / size;
        }
        canvas.width = width * rate;
        canvas.height = height * rate;
        ctx.drawImage(
          img,
          0,
          0,
          width,
          height,
          0,
          0,
          width * rate,
          height * rate
        );
        var dataURL = canvas.toDataURL("image/jpeg", 0.5);
        callback.call(this, dataURL);
        canvas = null;
      };
      img.src = url;
    },
    uploadFile(base64){
      var postObj = {
        type:this.type,
        base64:base64
      }
      // var postObj = this.$common.deepCopy(this.formData)
      this.$Post('Common/uploadFile',{data:postObj},
        (res) =>{
          let imgObj = {
            imgURL:res.data[0],
            formDataId:this.formDataId
          }
          this.$emit("addImg", imgObj);
          this.$loadingHide()
        },(err) =>{
          this.$alertShow(err.msg)
          this.$loadingHide()
        },true)
    },
  }
};
</script>
<style scoped>
.imgItem {
  float: left;
  position: relative;
  /* border: 1px dashed #ccc; */
}
.imgItem > * {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: block;
}
.imgItem > img {
  width: 100%;
  height: 100%;
  left: 0%;
  top: 0%;
  z-index: 1;
}
.imgItem > .delect {
  z-index: 5;
  width: 0.4rem;
  height: 0.4rem;
  right: 0;
  left: auto;
}
.imgItem input {
  z-index: 10;
  opacity: 0;
  cursor: pointer;
}
.imgItem input[type="file"]{cursor: pointer !important;}

</style>
