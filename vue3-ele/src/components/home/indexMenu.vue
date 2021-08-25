<template>
  <div class="index-info flexc-cen-x">
    <div
      class="leftNav scroolBar"
      :style="{
        width: isCollapse_menu ? '80px' : '256px',
        background: configInfo.menubgcolor,
      }"
    >
      <div
        class="leftnav-top flexc-cen-x"
        :class="isCollapse_menu ? 'flex-cen-xy' : 'flexc-cen-x'"
        :style="{
          background: configInfo.titlebgcolor,
          color: configInfo.titlefontcolor,
        }"
      >
        <img
          v-if="configInfo.titleurl"
          :src="configInfo.titleurl"
          alt="logo"
          class="left-logo"
        />
        <span v-if="!isCollapse_menu">{{ configInfo.yzplatformname }}</span>
      </div>
      <el-menu
        :style="{ width: isCollapse_menu ? '80px' : '256px' }"
        class="el-menu-vertical-demo"
        :unique-opened="true"
        :default-active="leftNavIndex"
        :collapse="isCollapse_menu"
        :background-color="configInfo.menubgcolor"
        :text-color="configInfo.menufontcolor"
      >
        <template v-for="(item, index) in routerData" :key="index">
          <el-submenu v-if="item.child.length > 0" :index="item.index">
            <template v-slot:title>
              <img class="menu-img" :src="item.icon" />
              <span>{{ item.name }}</span>
            </template>
            <template v-for="(son1, sonIndex1) in item.child" :key="sonIndex1">
              <el-submenu v-if="son1.child.length > 0" :index="son1.index">
                <template v-slot:title>
                  <i class="el-icon-menu"></i>
                  <span>{{ son1.name }}</span>
                </template>
                <template
                  v-for="(son2, sonIndex2) in son1.child"
                  :key="sonIndex2"
                >
                  <el-submenu v-if="son2.child.length > 0" :index="son2.index">
                    <template v-slot:title>
                      <i class="el-icon-menu"></i>
                      <span>{{ son2.name }}</span>
                    </template>
                  </el-submenu>
                  <el-menu-item
                    v-else
                    :index="son2.index"
                    @click="routerClick(son2)"
                  >
                    <span>{{ son2.name }}</span>
                  </el-menu-item>
                </template>
              </el-submenu>
              <el-menu-item
                v-else
                :index="son1.index"
                @click="routerClick(son1)"
              >
                <span>{{ son1.name }}</span>
              </el-menu-item>
            </template>
          </el-submenu>
          <el-menu-item v-else :index="item.index" @click="routerClick(item)">
            <img class="menu-img" :src="item.icon" />
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </div>
    <div
      class="minddle-content"
      :style="{
        width: isCollapse_menu ? 'calc(100% - 80px)' : 'calc(100% - 256px)',
      }"
    >
      <my-header></my-header>
      <ul class="head-nav flexc-cen-x">
        <li
          v-for="(item, index) in headNav"
          :key="index"
          class="bg-gray"
          :class="{ 'bg-white': item.act }"
          @click="routerClick(item, 'head')"
        >
          {{ item.name }}
          <div
            class="nav-close flex-cen-xy"
            @click.stop="delNav(index, item.act)"
          >
            ✕
          </div>
        </li>
      </ul>
      <div class="main scroolBar">
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" v-if="$route.meta.keepAlive" />
          </keep-alive>
          <component :is="Component" v-if="!$route.meta.keepAlive" />
        </router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import myheader from "./header";
export default {
  components: {
    "my-header": myheader,
  },
  computed: {
    ...mapState({
      // 获取数据
      isCollapse_menu: (state) => state.isCollapse_menu, //导航栏是否折叠
      routerData: (state) => JSON.parse(JSON.stringify(state.routerData)), //路由数据
      leftNavIndex: (state) => state.leftNavIndex, //左侧路由下标
      configInfo: (state) => state.configInfo, //页面配置
      topTabClick: (state) => state.topTabClick, //顶部导航栏点击
    }),
  },
  mounted() {
    console.log(this.routerData, "routerData");
    console.log(this.configInfo, "configInfo");
    this.checkAct(this.$route);
  },
  data() {
    return {
      isRouterAlive: true,
      cur_menu: "m1",
      headNav: [],
    };
  },
  methods: {
    ...mapMutations({
      setDataByName: "setDataByName",
    }),
    routerClick(data, type) {
      if (type == "head") {
        this.setDataByName({ key: "topTabClick", val: true }); //顶部导航栏点击
      } else {
        this.setDataByName({ key: "topTabClick", val: false }); //顶部导航栏点击
      }
      if (data.path) {
        this.$router.push(data.path);
      } else {
        this.$notifyMsg("提示", "暂未开放", "error");
      }
    },
    //添加顶部菜单
    addAside(data) {
      const has = this.headNav.find((item) => item.index == data.index);
      const lena = this.headNav.length;
      this.cleadAct();
      if (!has) {
        //头部没有此菜单选项
        data.act = true;
        if (lena == 15) {
          this.headNav.splice(14, 1);
          this.headNav.unshift(data);
        } else {
          this.headNav.unshift(data);
        }
      } else {
        this.headNav.forEach((e) => {
          if (e.path == data.path) {
            e.act = true;
          }
        });
      }
      this.cur_menu = data.index;
    },
    // 删除顶部菜单
    delNav(index, cur_act) {
      const len = this.headNav.length;
      let url = "";
      let data = "";
      if (!cur_act) {
        //非当前选中的直接删除
        this.headNav.splice(index, 1);
      } else {
        this.cleadAct();
        if (len > 1) {
          if (index == 0) {
            //向右定位选中的页面
            this.headNav.splice(index, 1);
            data = this.headNav[0];
            this.cur_menu = data.index;
            data.act = true;
            url = data.path;
            this.$router.push(url);
          } else {
            //向左定位选中的页面
            this.headNav.splice(index, 1);
            data = this.headNav[index - 1];
            this.cur_menu = data.index;
            data.act = true;
            url = data.path;
            this.$router.push(url);
          }
        }
      }
    },

    checkAct(newR) {
      let path = newR.path,
        leftNavIndex = "",
        cur_title = "",
        id = newR.params.id,
        funCode = newR.meta.funCode;
      if (path) {
        this.routerData.forEach((item, index) => {
          if (item.child.length > 0) {
            item.child.forEach((childItem, childIndex) => {
              if (childItem.FuncCode == funCode) {
                leftNavIndex = id ? funCode + id : childItem.index;
                cur_title = id ? newR.meta.des : childItem.name;
              }
              childItem.child.forEach((sonItem, sonIndex) => {
                if (sonItem.FuncCode == funCode) {
                  leftNavIndex = id ? funCode + id : sonItem.index;
                  cur_title = id ? newR.meta.des : sonItem.name;
                }
              });
            });
          } else {
            if (item.FuncCode == funCode) {
              leftNavIndex = id ? funCode + id : item.index;
              cur_title = id ? newR.meta.des : item.name;
            }
          }
        });
        var obj = {
          name: cur_title,
          index: leftNavIndex,
          path: path,
          fun: funCode,
          act: true,
        };
        this.addAside(obj);
      }
    },

    //头部菜单清除选中
    cleadAct() {
      this.headNav.forEach((e) => {
        e.act = false;
      });
    },
  },

  watch: {
    $route(n, o) {
      this.checkAct(n);
    },
  },
};
</script>

<style scoped>
.leftNav {
  width: 256px;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  background: #011500;
}
.minddle-content {
  width: calc(100% - 256px);
  height: 100%;
}
.head-nav {
  width: 100%;
  height: 30px;
  background: #f3f3f3;
  border-top: 1px solid #f5f5f5;
  border-bottom: 1px solid #f5f5f5;
}
.head-nav li {
  width: auto;
  height: 100%;
  overflow: hidden;
  cursor: pointer;
  line-height: 30px;
  font-size: 12px;
  list-style: none;
  padding: 0 30px 0 10px;
  position: relative;
  border-right: 1px solid #dadada;
}
.nav-close {
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  width: 15px;
  height: 15px;
  cursor: pointer;
}
.bg-gray {
  background: #ebebeb;
}
.bg-white {
  background: #fff;
}
.head-nav li:hover {
  background: #fff;
}
.nav-close:hover {
  font-size: 12px;
  border-radius: 100%;
  background: #eee;
}
.main {
  width: 100%;
  height: calc(100% - 94px);
  overflow: auto;
  background: #fafafa;
}
.menu-pic {
  width: 20px;
  height: 20px;
  opacity: 0.65;
}
.leftnav-top {
  width: 100%;
  font-size: 22px;
  color: #fff;
  padding: 20px 5px 30px 5px;
}
.leftnav-top img {
  width: 30px;
  height: 30px;
  border-radius: 100%;
  margin-right: 5px;
}

.menu-img {
  width: 20px;
  height: 20px;
  margin-right: 10px;
  opacity: 0.6;
}
</style>
<style>
.leftNav .el-menu {
  border: none !important;
}
</style>
