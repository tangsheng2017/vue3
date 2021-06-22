<template>
  <div class="hello">
    <GMap :width="800" :height="400"></GMap>
  </div>
</template>

<script>
// import { defineAsyncComponent } from "vue";
import GMap from "@/components/GMap"; //引入高德地图AGMap
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  components: {
    GMap
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
