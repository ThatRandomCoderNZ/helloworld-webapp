<template>
  <div ref="parallax">
    <slot> </slot>
  </div>
</template>

<script>
export default {
  name: "ParallaxContainer",

  props: {
    speed: Number,
  },

  data() {
    return {
      imagePositionY: 0,
      scrollY: 0,
      otherImagePositionY: 0,
    };
  },

  methods: {
    move(assumed) {
      const scrollTop = assumed.target.documentElement.scrollTop;
      const scrollDelta = scrollTop - this.scrollY;
      this.scrollY = scrollTop;

      this.imagePositionY += scrollDelta * this.speed;
      this.$refs.parallax.style.top = this.imagePositionY + "px";

      // const parallaxOther = document.getElementById("parallax-other");
      // this.otherImagePositionY += scrollDelta * 0.3;
      // parallaxOther.style.top = this.otherImagePositionY + "px";
    },
  },

  mounted() {
    window.addEventListener("scroll", this.move);
  },

  unmounted() {
    window.removeEventListener("scroll", this.move);
  },
};
</script>

<style scoped></style>
