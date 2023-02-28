<template>
  <div class="logo-image"></div>
</template>

<script>
export default {
  name: "LogoImage",

  props: {
    language: {
      required: false,
      type: String,
      default: "spanish",
    },
    color: {
      required: false,
      type: String,
      default: "colored",
    },
  },

  computed: {
    test() {
      return "background-image: url('../assets/logo-japanese-white.svg')";
    },
  },
};
</script>

<style scoped>
.logo-image {
  background-image: url("../assets/equals-logo.svg");
  background-repeat: no-repeat;
  object-fit: contain;
  margin-top: 25px;
  width: 100px;
  height: 50px;
}
</style>
