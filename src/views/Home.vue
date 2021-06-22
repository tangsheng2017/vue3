<template>
  <div class="home">
    <div>
      <GMap></GMap>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import GMap from '@/components/GMap.vue';

export default {
  name: 'Home',
  components: {
    GMap,
  },
};
</script>
