<template>
  <div class="centenbox liveCreat">
    <div class="content-info flex-xy">
      <el-row :gutter="24" class="el-row top-select flexc-cen-x">
        <el-col :span="7">
          <div class="top-select-item flexc-cen-x">
            <div class="top-select-text">所属公司</div>
            <div class="top-item-right">
              <el-select
                v-model="searchObj.departid"
                placeholder="请选择所属公司"
                clearable
                @change="departChange"
              >
                <el-option
                  v-for="item in companyDataList"
                  :key="item.ID"
                  :label="item.CompName"
                  :value="item.ID"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="top-select-item flexc-cen-x">
            <div class="top-select-text">所属队伍</div>
            <div class="top-item-right">
              <el-select
                v-model="searchObj.teamid"
                clearable
                placeholder="请选择所属队伍"
                @change="searchKey"
              >
                <el-option
                  v-for="item in teamDataList"
                  :key="item.ID"
                  :label="item.teamname"
                  :value="item.ID"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="top-select-item flexc-cen-x">
            <div class="top-select-text">关键字</div>
            <div class="top-item-right">
              <el-input
                v-model="searchObj.keyword"
                placeholder="请输入内容"
                @keyup.enter="searchKey"
              ></el-input>
            </div>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="top-select-item flexc-cen-x">
            <div class="top-select-text">&nbsp;</div>
            <el-button
              class="search-btn text_jz"
              type="primary"
              @click="searchKey"
              >查询</el-button
            >
          </div>
        </el-col>
      </el-row>
      <div class="content-table">
        <div class="table-control-line flex-x-end">
          <el-button
            class="search-btn text_jz"
            type="primary"
            v-if="btnObj.flag.add"
            @click="add"
            >新增</el-button
          >
          <span
            class="iconfont icon-zidingyi table-control-icon"
            @click="tableControl"
          ></span>
        </div>
        <div class="table">
          <myTable
            :tabelHeader="tableObj.tableHeader"
            :tableData="tableObj.table"
            @tableCellClick="onMoudelMsg"
          ></myTable>
        </div>
        <table-paper
          :currPageNum="searchObj.index"
          :PagerOrder="PagerOrder"
          @tablePaperEven="onMoudelMsg"
        ></table-paper>
      </div>
    </div>
    <roleInfo
      v-if="dialogdata.type == 'roleInfo' && indexPageDialog"
      :isShow="dialogdata.type == 'roleInfo' && indexPageDialog"
      :pageData="dialogdata"
      @chatType="closeDialog"
    ></roleInfo>
  </div>
</template>
<script type="text/ecmascript-6">
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
import myTable from '../../components/fun/table/table'
import tablePaper from '../../components/fun/tablePaper/tablePaper'
import roleInfo from './popup/roleInfo'
import { getCompanyData } from "@/api/common.js";
export default {
  components: {
    "myTable":myTable,
    tablePaper,roleInfo
  },
  computed: {
    ...mapState({// 获取数据
      leftNavIndex: state=>state.leftNavIndex,//左侧路由下标
      topTabClick:state => state.topTabClick,//顶部导航栏点击
    })
  },
  created () {
    this.getCompanyData()
    // this.searchObj_temp = this.$common.deepCopy(this.searchObj)
    // this.tableObj.tableHeader_temp = this.$common.deepCopy(this.tableObj.tableHeader)
    // this.btn_flag_temp = this.$common.deepCopy(this.btnObj.flag)
    // this.getCompanyData((res)=>{
    //   this.companyDataList = res
    // })
    // this.$getTeamData('',(res)=>{
    //   this.teamDataList = res
    // })
  },
  // activated(){
  //   if(!this.topTabClick){
  //     this.searchObj = this.$common.deepCopy(this.searchObj_temp)
  //     this.btnObj.flag = this.$common.deepCopy(this.btn_flag_temp)
  //     this.getBtnList()
  //   }
  // },
  // mounted () {
  //   this.getBtnList()
  // },

  methods: {
    async getCompanyData() {
      try {
        const vdata = await getCompanyData();
        console.log(vdata)
        // this.companyDataList =
        console.log(new Proxy(vdata))
        // this.companyDataList = JSON.parse(JSON.stringify(vdata))
        console.log(this.companyDataList)
      } catch (error) {
      }
    },
    //菜单按钮权限
    getBtnList(){
      this.$getFunctionalAuthority(this.leftNavIndex,(data)=>{
        var vdata = data
        var btn = Object.keys(this.btnObj.code)
        vdata.forEach(item=>{
          btn.forEach(e=>{
            this.getBtnFlag(item.FuncCode,e)
          })
        })
        this.getList()
      })
    },
    //是否显示此按钮
    getBtnFlag(code,type){
      this.$nextTick(()=>{
        if(code == this.btnObj.code[type]){
          this.btnObj.flag[type] = true
        }
      })
    },

    departChange(){
      // this.$getTeamData(this.searchObj.departid,(res)=>{
      //   this.teamDataList = res
      //   this.searchObj.teamid = ''
      //   this.searchKey()
      // })
    },
    // 显示自定义表头
    tableControl(){
      this.tableObj.tableControlFlag = true
    },
    // 关闭自定义表头
    controlCancel(data){
      this.tableObj.tableControlFlag = false
    },
    // 自定义表头
    controlSure(data){
      let vdata = this.$common.deepCopy(this.tableObj.tableHeader_temp),temp = []
      if(data.length>0){
        vdata.forEach((e,i) => {
          if(data.includes(e.value)){
            this.tableObj.tableHeader_temp[i].show = true
            temp.push(e)
          }else{
            this.tableObj.tableHeader_temp[i].show = false
          }
        })
      }else{
        temp = []
      }
      this.$set(this.tableObj,'tableHeader',temp)
      this.tableObj.tableControlFlag = false
    },
    //表格分页按钮回调
    onMoudelMsg(data){
      let btnType = data.type
      let itemData = data.data
      if(btnType == 'paperNumChange'){
        this.searchObj.index = itemData
        this.getList()
      }else
      if(btnType=='edit'){
        var temp = {
          type:'roleInfo',
          ifshow:true,
          data:itemData,
          title:'编辑驻点信息'
        }
        this.openDialog(temp)

      }else
      if(btnType=='delete'){
        this.$confirmMsg('是否删除该驻点','','',()=>{
          this.delDetail(itemData.ID)
        })
      }

    },
    //驻点管理列表
    getList() {
      let postObj = this.$common.deepCopy(this.searchObj)
      this.$Post("Admin/Resource/Point/getPointList",{data:postObj},
        (res) => {
          var vdata = res.data
          var PagerOrder = res.PagerOrder  //分页数据
          vdata.forEach((item,index)=>{
            item.btn_edit = this.btnObj.flag.edit?'btn_edit':''
            item.btn_delete = this.btnObj.flag.delete?'btn_delete':''
          })

          this.tableObj.table = vdata
          for(var i in PagerOrder){
            PagerOrder[i] = Number(PagerOrder[i])
          }
          PagerOrder.size = this.searchObj.size
          this.PagerOrder = PagerOrder

        },
        (err) => {
          this.$alertShow(err.msg)
        },
        true);
    },
    //删除
    delDetail(id) {
      let postObj={ID:id}
      this.$Post("Admin/Resource/Point/delPointData",{data:postObj},
        (res) => {
          var vdata = res.data
          this.$notifyMsg('提示','删除成功')
          this.getList()
        },
        (err) => {
          this.$alertShow(err.msg)
        },
        true);
    },
    //搜索
    searchKey(){
      this.searchObj.index = 1
      this.getList()
    },
    //新增
    add(){
      var temp = {
        type:'roleInfo',
        ifshow:true,
        data:null,
        title:'新增驻点'
      }
      this.openDialog(temp)
    },
    //打开弹窗
    openDialog(data){
      //type,ifshow,data
      data.title = data.title || ''
      this.dialogdata = data
      this.indexPageDialog = data.ifshow
    },
    //弹窗关闭触发
    closeDialog(data){
      let dialogdata = this.$common.deepCopy(this.dialogdata) // 当前弹窗数据
      let popData = data   // 弹窗关闭前回调数据

      if( popData.type == 'roleInfo' ){
        if( !!popData.data&&popData.data.ID ){
          this.getList()
        }
      }

      //恢复初始化
      this.dialogdata = {}
      this.indexPageDialog = false
    },
  },
  provide(){
    return{
      openDialog:this.openDialog,
      closeDialog:this.closeDialog,
    }
  },
  data () {
    return {
      btnObj:{//按钮权限控制
        flag:{add:false,edit:false,delete:false},
        code:{add:'m6-2-1',edit:'m6-2-2',delete:'m6-2-3'}
      },
      companyDataList:null,
      teamDataList:[],
      tableObj:{//表格相关数据
        tableControlFlag:false,//动态改变标记
        tableHeader_temp:[],//动态改变的列表
        //表头数据
        tableHeader:[
          {
            type:'text',
            key:'pointname',
            value:'驻点',
          },
          {
            type:'text',
            key:'teamname',
            value:'所属队伍',
          },
          {
            type:'text',
            key:'CompName',
            value:'所属公司'
          },
          {
            type:'text',
            key:'longitude',
            value:'经度',
          },
          {
            type:'text',
            key:'latitude',
            value:'纬度',
          },
          {
            type:'text',
            key:'created',
            value:'创建时间',
            width:'160'
          },
          {
            type:'button',
            key:'status',
            value:'操作',
            btnLis:[
              {
                name:'编辑',
                judeKey:'btn_edit',
                judeValue:'btn_edit',
                type:'edit',
                btntype:'',
              },
              {
                name:'删除',
                judeKey:'btn_delete',
                judeValue:'btn_delete',
                type:'delete',
                btntype:'',
              },
            ],
            width:'90',

          },

        ],
        //表格数据
        table: [],
      },
      searchObj_temp:'',
      searchObj:{keyword:'',departid:'',teamid:'',index:1,size:10,},//查询条件
      PagerOrder:{
        count:0,
      },
      indexPageDialog:false,//是否显示弹窗
      dialogdata:{},//弹窗数据

    }
  }
}
</script>
<style scoped>
.centenbox {
  width: 100%;
  height: 100%;
  overflow: auto;
}
.leftNav {
  width: 240px;
  height: 100%;
  float: left;
  background: #fff;
}
.main {
  float: left;
  width: 100%;
  height: 100%;
  padding: 20px;
  overflow-y: auto;
}
.content {
  background: #fff;
  width: 100%;
  min-height: 100%;
  padding: 0 36px;
}
.main-title {
  width: 100%;
  height: 70px;
  justify-content: flex-start;
  border-bottom: 1px solid rgba(225, 228, 232, 1);
  margin-bottom: 20px;
  font-size: 22px;
}
/* .top-select{padding: 10px 15px;} */
.select-text {
  font-size: 12px;
  color: #000;
  margin-bottom: 10px;
}

.tjsj {
  font-size: 16px;
  margin-top: 18px;
}
</style>
