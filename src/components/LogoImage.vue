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
  background-image: url("../assets/logo-color-sub.svg");
  background-repeat: no-repeat;
  object-fit: contain;
  width: 100px;
  height: 50px;
}

@media screen and (max-width: 600px) {
  .logo-image {
    height: 80px;
    width: 60px;
    margin-top: 45px;
  }
}
</style>
