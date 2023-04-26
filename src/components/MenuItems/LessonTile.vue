<template>
  <div :id="id" :ref="refId" class="lesson-container" @click="navigateToLesson">
    <div :class="lessonStyle">
      <h6 class="lesson-title">{{ title }}</h6>
    </div>
<!--    <div class="lesson-progress-bar">-->
<!--      <div class="progress-fill" :style="'width: ' + progressFill + '%'"></div>-->
<!--    </div>-->
    <ProgressBar :progress-fill="progress" :mastery-fill="mastery"></ProgressBar>
  </div>
</template>

<script>
import { gsap } from "gsap/dist/gsap";
import router from "@/router";
import { useContentStore } from "@/stores/content";
import ProgressBar from "@/components/ProgressBar.vue";

export default {
  name: "LessonTile",
  components: {ProgressBar},

  setup() {
    const store = useContentStore();

    return {
      store,
    };
  },

  props: {
    title: String,
    lessonId: Number,
    placement: Number,
    parentX: Number,
    parentY: Number,
    active: Boolean,
    progress: Number,
    mastery: Number,
  },

  data() {
    return {
      x: 0,
      y: 0,
      showProgress: false,
    };
  },

  methods: {
    navigateToLesson() {
      this.store.setLesson(this.lessonId);
      router.push("about");
    },
  },

  computed: {
    lessonStyle() {
      return "lesson-tile " + (this.mastery >= 100 ? " mastered" : "");
    },

    id() {
      return (
        "lesson-" +
        this.lessonId +
        "-" +
        Math.round(this.x) +
        "-" +
        Math.round(this.y) +
        "-" +
        Math.round(this.placement * 100)
      );
    },

    progressFill() {
      return this.progress;
    },

    refId() {
      return (
        "unique-" +
        this.lessonId +
        "-" +
        Math.round(this.x) +
        "-" +
        Math.round(this.y) +
        "-" +
        Math.round(this.placement * 100)
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
    console.log(this.placement);
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
          delay: this.placement,
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
  text-align: center;
}

.lesson-tile:hover {
  box-shadow: 1px 1px 2px gray;
  cursor: pointer;
}

.lesson-title {
  font-size: 16px;
  color: white;
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
.mastery-fill {
  position: relative;
  top: -4px;
  height: 4px;
  left: -1px;
  border-radius: 20px;
  background-color: #b19dcf;
}

.progress-fill {
  height: 100%;
  background-color: #9dcfcf;
}

.mastered {
  background-color: #cf9dcf;
}
</style>
