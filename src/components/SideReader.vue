<template>
  <div class="reader-master-container" v-click-outside="handleClose">
    <div id="side-reader" class="side-reader side-movement">
      <div class="reader-content-container">
        <slot></slot>
      </div>
    </div>
    <div
      @click="showReader"
      id="side-tab"
      class="side-reader-tab side-movement"
    >
      <div class="small-logo-container"></div>
    </div>
  </div>
</template>

<script>
import { gsap } from "gsap/dist/gsap";

export default {
  name: "SideReader",

  props: {
    lessonData: Array,
    forceDisplay: Boolean,
  },

  data() {
    return {
      show: false,
    };
  },

  watch: {
    forceDisplay(newForceDisplay) {
      if (newForceDisplay) {
        this.openReader();
      }
    },
  },

  methods: {
    handleClose() {
      if (this.forceDisplay) {
        return;
      }

      this.closeReader();
    },

    openReader() {
      this.show = true;
      gsap.to("#side-reader", {
        x: -400,
        z: 1000,
        duration: 0.3,
      });
      gsap.to("#side-tab", {
        x: -175,
        y: -140,
        z: 1000,
        rotateZ: 90,
        duration: 0.3,
      });
    },

    closeReader() {
      this.show = false;
      gsap.to("#side-reader", {
        x: 0,
        duration: 0.3,
      });
      gsap.to("#side-tab", {
        x: 0,
        y: 0,
        rotateZ: 0,
        duration: 0.3,
      });
    },

    showReader() {
      if (!this.show) {
        this.openReader();
      } else {
        this.closeReader();
      }
    },
  },

  mounted() {
    if (this.forceDisplay) {
      this.openReader();
    }
  },
};
</script>

<style scoped>
.side-reader {
  position: absolute;
  width: 400px;
  height: 100vh;
  background-color: #9dcfcf;
  right: -400px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.side-reader-tab {
  position: absolute;
  margin-top: 10vh;
  width: 50px;
  height: 150px;
  border-radius: 10px 0 0 10px;
  background-color: #9dcfcf;
  right: 0;
  cursor: pointer;
  z-index: 100;
}

.small-logo-container {
  background-image: url("../assets/equals-logo-white.svg");
  object-fit: contain;
  top: 60px;
  width: 100px;
  height: 25px;
  transform: rotateZ(-90deg);
  position: relative;
  right: 20px;
}

.reader-content-container {
  position: relative;
  width: 80%;
  height: 80%;
  display: flex;
  flex-direction: column;
}

.reader-info-card {
  width: 300px;
  height: 40px;
  color: white;
  font-size: 18px;
}

.reader-master-container {
  z-index: 100;
}
</style>
