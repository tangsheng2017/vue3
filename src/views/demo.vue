<template>
  <div class="demo">
    <input type="text" v-model="number1" @change="inputChange" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      number1: 0,
    };
  },
  watch: {
    number1(newVal) {
      console.log(newVal, "newVal");
    },
  },
  methods: {
    inputChange(e) {
      console.log(e, "e");
    },
  },
};
</script>

<style lang="scss" scoped>
.demo-txt {
  font-size: 1rem;
}
</style>
