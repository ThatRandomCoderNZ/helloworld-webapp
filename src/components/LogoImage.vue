<template>
  <div class="logo-image"></div>
</template>

<script>
export default {
  name: "LogoImage",
};
</script>

<style scoped>
.logo-image {
  background-image: url("../assets/alt-logo-white.svg");
  background-repeat: no-repeat;
  object-fit: contain;
  width: 150px;
  height: 80px;
}
</style>
