<template>
  <img ref="first-image" class="top-image" :src="firstSrc" />
  <img class="bottom-image" :src="secondSrc" />
</template>

<script>
export default {
  name: "TwoToneImage",

  props: {
    lowerBound: Number,
    firstSrc: String,
    secondSrc: String,
  },

  methods: {
    handleImageSplit() {
      const image = this.$refs["first-image"];

      const sectionBottom = this.lowerBound;
      console.log(sectionBottom);
      const imageBottom = image.getBoundingClientRect().bottom;

      if (imageBottom > sectionBottom) {
        const clippingPercent =
          image.getBoundingClientRect().height -
          (image.getBoundingClientRect().height -
            (imageBottom - sectionBottom));
        image.style.clipPath = "inset(0 0 " + clippingPercent + "px 0)";
        console.log(image.style.clipPath);
      }
    },
  },

  mounted() {
    window.addEventListener("scroll", this.handleImageSplit);
  },

  unmounted() {
    window.removeEventListener("scroll", this.handleImageSplit);
  },
};
</script>

<style scoped>
.top-image {
  position: absolute;
  width: 40vw;
  height: 36vh;
  z-index: 1;
}

.bottom-image {
  position: absolute;
  top: 0;
  width: 40vw;
  height: 36vh;
  object-fit: fill;
}
</style>
