<template>
  <div class="home">
    <div class="map">
      <GMap></GMap>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import GMap from "@/components/GMap.vue";

export default {
  name: "Home",
  components: {
    GMap,
  },
};
</script>
<style lang="scss" scoped>
.map {
  width: 500px;
  height: 300px;
}
</style>
