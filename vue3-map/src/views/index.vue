<template>
  <div class="index">
    <GMap></GMap>
  </div>
</template>

<script>
import GMap from "@/components/GMap";
export default {
  data() {
    return {};
  },
  components: {
    GMap,
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.index {
  width: 100%;
  height: 100%;
}
</style>
