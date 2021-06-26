<template>
  <div class="demo">
    <van-button type="primary" size="large">大号按钮</van-button>
    <div class="demo-txt">12348</div>
  </div>
</template>

<script>
import { reactive } from 'vue';
import { Button } from 'vant';
export default {
  components: {
    [Button.name]: Button,
  },
  setup() {
    const state = reactive({
      a: 0,
    });

    function increment() {
      state.a++;
    }

    return {
      state,
      increment,
    };
  },
};
</script>

<style lang="scss" scoped>
.demo-txt{
  font-size: 1rem;
}
</style>
