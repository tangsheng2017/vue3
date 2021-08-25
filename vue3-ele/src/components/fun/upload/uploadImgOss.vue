<template>
  <div class="imgItem" :style="{width:w,height:h}" style="cursor: pointer;">
    <!--<img src="../../../assets/old/home/icon49.png" />-->
    <input type="file" @change="change($event)" accept="*" multiple>

  </div>
</template>



<script type="text/ecmascript-6">
import { client } from '../../../Plugin/oss/index'
//const OSS = require('ali-oss')
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
    filetype:{type:[String]}
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
  methods: {
    Upload(file) {
      const that = this
      //判断扩展名
      const tmpcnt = file.name.lastIndexOf(".")
      const exname = file.name.substring(tmpcnt + 1)

      //const names = ['jpg', 'jpeg', 'webp', 'png','bmp']
      //if(names.indexOf(exname)< 0 ){
      //  this.$message.error("不支持的格式!")
      //  return
      //}
      if(that.filetype){
        var type = exname.toUpperCase()
        var arr = that.typeList[that.filetype]
        var hasFlag = arr.findIndex(item=>item==type)//是否有数据
        if(hasFlag != -1){
        }else{
          that.$notifyMsg('提示','不支持的格式','error')
          return
        }
      }
      async function multipartUpload () {
        //const fileName = that.name + file.lastModified
        //managerSystem/
        let time = new Date().getTime()
        const fileName = 'uRescue/'+ time +  '.' + exname
        //定义唯一的文件名，打印出来的uid其实就是时间戳
        //client 是第一步中的 client
        client().multipartUpload(fileName, file,{
            progress:function (p) { //获取进度条的值
              let obj ={
                type : 'progress',
                num : Math.floor(p*100)
              }
              if(!!that.formDataId){
                obj.id = that.formDataId
                obj.name = file.name
              }
              that.$emit("addImg", obj);
            },
          }).then(
          result => {
            //下面是如果对返回结果再进行处理，根据项目需要
            let url = 'https://'+result.bucket+'.'+that.$Base_config.OssSetting.region+ that.$Base_config.OssSetting.preFix + '/' + result.name
            let obj ={
              imgURL : url,
            }
            if(!!that.formDataId){
              obj.id = that.formDataId
              obj.name = file.name
              obj.filetype = exname
            }
            that.$emit("addImg", obj);

          }).
        catch(err => {
          let obj ={
            type : 'uoLoadErr',
          }
          if(!!that.formDataId){
            obj.id = that.formDataId
            obj.name = file.name
          }
          that.$emit("addImg", obj);

        })
      }

      multipartUpload ()


    },

    uploadJs(file){
      let OSS = require('ali-oss')

      let ossConfig = {
//        region: '<Your region>',
//        accessKeyId: '<Your AccessKeyId>',
//        accessKeySecret: '<Your AccessKeySecret>',
//        bucket: 'Your bucket name'

        region: this.$Base_config.OssSetting.region,
        accessKeyId: this.$Base_config.OssSetting.accessKeyId,
        accessKeySecret: this.$Base_config.OssSetting.accessKeySecret,
        bucket: this.$Base_config.OssSetting.bucket,
        secure:true,
      }

      let client = new OSS(ossConfig);

      let tempCheckpoint;

      // 定义上传方法
      async function multipartUpload () {
        try {
          let result = await client.multipartUpload('object-key', file, {
            progress: async function (p, checkpoint) {
              // 断点记录点。 浏览器重启后无法直接继续上传，需用户手动触发进行设置。
              tempCheckpoint = checkpoint;
            },
            //meta: { year: 2017, people: 'test' },
            //mime: 'image/jpeg'
          })
        } catch(e){
        }
      }

      //开始上传
      multipartUpload();

      // 暂停分片上传方法
      client.cancel();

      // 恢复上传
      let resumeclient = new OSS(ossConfig);
      async function resumeUpload () {
        try {
          let result = await resumeclient.multipartUpload('object-key', 'local-file', {
            progress: async function (p, checkpoint) {
              tempCheckpoint = checkpoint;
            },
            checkpoint: tempCheckpoint,
            meta: { year: 2017, people: 'test' },
            mime: 'image/jpeg'
          })
        } catch (e) {
        }
      }

      resumeUpload();
    },

    handleAvatarSuccess(){},
    beforeAvatarUpload(){},

    uploadImgOss(imgobj){
      let loadid = null
      loadid = this.$loadingShow('')
      var image = new FormData();
      image.append("img", imgobj);
      image.append("source", "customerservice");
      this.$http.imgUpload("Upload/uploadImgOss", image,
        (res) => {
          var vdata = res.data;
          this.$loadingHide(loadid)
          let obj ={
            imgURL : vdata.data.imgurl.img,
          }
          if(!!this.formDataId){
            obj.id = this.formDataId
          }
          this.$emit("addImg", obj);
        },
        (err) => {
          this.$loadingHide(loadid)
          this.$alertShow(err.msg)
        },
        true, true);
    },

    change(event) {
      var _this = this;
      var imgobj = event.target.files[0];

      //if(imgobj.size > 2 * 1000 * 1024){
      // this.$alertShow('您所选择的图片过大，请选择2M以内的图片')
      // return
      //}

      //判断是否有尺寸限制(默认最大100兆)
      if( !!this.size && (this.size.split(':').length==3 || this.size.split(':').length==2)){
        var siezW = this.size.split(':')[0];
        var siezH = this.size.split(':')[1];
        var sizeLimit = this.size.split(':').length==3?this.size.split(':')[2]:1024*100
        var imgsize = (imgobj.size / 1024).toFixed(0);
        var imageUrl = this.getObjectURL(imgobj);
        // this.Upload(imgobj)
        this.getImgSize(imageUrl,
          (data)=> {
            if( (data.width/data.height) == (siezW/siezH) && imgsize <= Number(sizeLimit)){
              this.Upload(imgobj)
              event.target.value=''
            }else{
              this.$alertShow('上传失败,请注意图片尺寸是否合适')
            }


          },imgsize
        );
      }else{

        this.Upload(imgobj)
        event.target.value=''

      }




//      this.uploadJs(imgobj)

//      this.uploadImgOss(imgobj)




      return;
      //创建文件读取相关的变量
      // var imgFile;
      // //创建读取文件的对象
      // var reader = new FileReader();
      // //为文件读取成功设置事件
      // reader.onload = function(e) {
      //   alert("文件读取完成");
      //   imgFile = e.target.result;
      // };

      // //正式读取文件
      // reader.readAsDataURL(imgobj);

      if (!imgobj) {
        return;
      }
      // if(imgobj.size>300*1024){
      //   this.$alertShow('上传图片必须300K以内')
      //   return
      // }
      this.$vux.loading.show({
        text: "Loading"
      });
      var imgsize = (imgobj.size / 1024).toFixed(0);
      var imageUrl = this.getObjectURL(imgobj);
      this.convertImgToBase64(
        imageUrl,
        function(imgele) {
          _this.$emit("addImg", imgobj);
          _this.$vux.loading.hide();
          // event.target.value = "";
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
      this.$vux.loading.hide();
    },
    getImgSize(url, callback, size) {
      var img = new Image();
      size = parseInt(size);
      img.crossOrigin = "Anonymous";
      img.onload = function() {
        var width = img.width;
        var height = img.height;
        callback.call(this, {width:width,height:height});
      };
      img.src = url;

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
  width: 40%;
  height: 40%;
  left: 30%;
  top: 30%;
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
