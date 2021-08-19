<template>
  <div class="home">
    <div class="map">
      <GMap></GMap>
    </div>
    <div>{{ moment().format("YYYY.MM.DD HH:00") }}</div>
  </div>
</template>

<script>
import moment from "moment";
// @ is an alias to /src
import GMap from "@/components/GMap.vue";

export default {
  name: "Home",
  components: {
    GMap,
  },
  data() {
    return {
      moment: moment,
    };
  },
};
</script>
<style lang="scss" scoped>
.map {
  width: 500px;
  height: 300px;
}
</style>
