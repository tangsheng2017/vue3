<template>
  <div class="demo">
    <div>{{ room.attrs.size }}</div>
    <button @click="handClick()">点击</button>
  </div>
</template>

<script>
// ref：一般定义基础数据类型也可以定义对象,取值str.value
// reactive：定义对象，但是不能代理基本类型，例如字符串、数字、boolean 等
//toRefs 用于将一个 reactive 对象转化为属性全部为 ref 对象的普通对象
import { reactive, toRefs, watch } from "vue";
export default {
  setup() {
    const state = reactive({
      room: {
        id: 100,
        attrs: {
          size: "140平方米",
          type: "三室两厅",
        },
      },
    });
    const handClick = () => {
      state.room.attrs.size = "11111";
    };

    watch(
      () => state.room,
      (newType, oldType) => {
        console.log("新值:", newType.id, "老值:", oldType.id);
      },
      { deep: true }
    );

    return { ...toRefs(state), handClick };
  },
};
</script>

<style lang="scss" scoped>
.demo-txt {
  font-size: 1rem;
}
</style>
