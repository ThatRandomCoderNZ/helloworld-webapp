<template>
  <div class="landing-page-container" @scroll="move" ref="page-container">
    <div class="landing-header"></div>
    <div ref="test" class="main-container">
      <div class="left-side-container">
        <div class="logo-container">
          <LogoImage />
        </div>
        <ParallaxContainer
          :speed="0.3"
          id="parallax-other"
          class="main-info-container"
        >
          <div class="main-title-container">
            <h1 class="main-title">World's Smartest</h1>
            <h1 class="main-title">Language Learning Tool</h1>
          </div>
          <div class="info-container">
            <p class="info">
              Crafted for efficiency. The hello world learning tool will fast
              track your progress towards your fluency goals
            </p>
          </div>
          <div class="call-to-action-container">
            <div class="get-started-button">
              <p class="get-started-title">Get Started</p>
            </div>
          </div>
        </ParallaxContainer>
      </div>

      <div class="right-side-container">
        <ParallaxContainer class="hero-image-container" :speed="0.9">
          <TwoToneImage
            :lower-bound="topFrame"
            first-src="src/assets/laptop-white.svg"
            second-src="src/assets/Laptop-color.svg"
          >
          </TwoToneImage>
        </ParallaxContainer>
      </div>
    </div>
    <div class="next-container"></div>
  </div>
</template>

<script>
import TwoToneImage from "@/components/TwoToneImage.vue";
import ParallaxContainer from "@/components/ParallaxContainer.vue";
import LogoImage from "@/components/LogoImage.vue";

export default {
  name: "LandingAlternativeView",
  components: { LogoImage, ParallaxContainer, TwoToneImage },

  data() {
    return {
      topFrame: 2400,
    };
  },

  computed: {},

  methods: {
    handleScroll() {
      this.topFrame = this.$refs.test.getBoundingClientRect().bottom;
    },
  },

  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },

  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style scoped>
.next-container {
  height: 100vh;
  width: 100%;
}

.landing-page-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
}

.landing-header {
  background-color: #9dcfcf;
  height: 10vh;
  width: 100%;
}

.logo-container {
  margin-top: 5vh;
  margin-left: 15vw;
}

.main-container {
  background-color: #9dcfcf;
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: row;
}

.left-side-container {
  height: 100%;
  width: 50%;
}

.main-info-container {
  margin-left: 15vw;
  display: flex;
  flex-direction: column;
  margin-top: 5vh;
}

.main-title {
  font-weight: bolder;
  color: white;
  line-height: 1.4em;
}

.info-container {
  margin-top: 5vh;
  color: white;
  width: 60%;
}

.call-to-action-container {
  width: 100%;
  margin-top: 10vh;
  margin-left: 4vw;
}

.get-started-button {
  position: relative;
  color: white;
  width: 220px;
  height: 55px;
  border: 5px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  cursor: pointer;
}

.get-started-button:hover {
  border: 6px solid white;
  box-shadow: 4px 4px #868585;
}

.get-started-title {
  text-align: center;
  font-weight: bolder;
  font-size: 20px;
}

.right-side-container {
  height: 100%;
  width: 50%;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
}

.hero-image-container {
  margin-left: 5vw;
  height: 50%;
  width: 100%;
  margin-bottom: 10vh;
}
</style>
