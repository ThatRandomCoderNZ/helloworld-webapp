<template>
  <div :id="id" :ref="refId" class="lesson-container">
    <div class="lesson-tile">
      <h6 class="lesson-title">はへふひほ</h6>
    </div>
    <div class="lesson-progress-bar"></div>
  </div>
</template>

<script>
import { gsap } from "gsap/dist/gsap";
export default {
  name: "LessonTile",

  props: {
    placement: Number,
    parentX: Number,
    parentY: Number,
    active: Boolean,
  },

  data() {
    return {
      x: 0,
      y: 0,
      showProgress: false,
    };
  },

  computed: {
    id() {
      return (
        "lesson-" +
        Math.round(this.x) +
        "-" +
        Math.round(this.y) +
        "-" +
        this.placement
      );
    },

    refId() {
      return (
        "unique-" +
        Math.round(this.x) +
        "-" +
        Math.round(this.y) +
        "-" +
        this.placement
      );
    },

    xOffset() {
      return this.parentX - this.$refs[this.refId].getBoundingClientRect().x;
    },

    yOffset() {
      return this.parentY - this.$refs[this.refId].getBoundingClientRect().y;
    },
  },

  mounted() {
    this.$nextTick(() => {
      this.x = this.parentX;
      this.y = this.parentY;
    });
    gsap.to("#" + this.id, {
      x: this.xOffset,
      y: this.yOffset,
      scale: 0.5,
      duration: 0,
      opacity: 0.8,
      rotateY: 180,
      onComplete: () => {
        gsap.to("#" + this.id, {
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.3,
          opacity: 1,
          rotateY: 0,
          delay: 1 - this.placement * 0.1,
          onComplete: () => {
            this.showProgress = true;
          },
        });
      },
    });
  },

  watch: {
    active(newActive, oldActive) {
      if (oldActive && !newActive) {
        gsap.to("#" + this.id, {
          x: this.xOffset / 3,
          y: this.yOffset / 3,
          scale: 0.6,
          duration: 0.3,
          opacity: 0,
        });
      }
    },
  },
};
</script>

<style scoped>
.lesson-tile {
  width: 100px;
  height: 100px;
  margin: 10px 5px 5px 5px;
  background-color: #9dcfcf;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.lesson-tile:hover {
  box-shadow: 1px 1px 2px gray;
  cursor: pointer;
}

.lesson-title {
  font-size: 16px;
  vertical-align: center;
}

.lesson-container {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.lesson-progress-bar {
  width: 80px;
  height: 5px;
  border: 1px solid #9dcfcf;
  border-radius: 20px;
  top: -2px;
}
</style>
