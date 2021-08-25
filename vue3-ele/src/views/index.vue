<template>
  <div class="index" element-loading-background="rgba(0, 0, 0, 0.8)">
    <index-menu class="index"></index-menu>
  </div>
</template>

<script type="text/ecmascript-6">
import indexmenu from '../components/home/indexMenu'
export default {
  components: {
    'index-menu':indexmenu
  },
}
</script>

<style scoped>
.index {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
