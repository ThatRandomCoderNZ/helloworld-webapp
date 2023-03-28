<template>
  <div class="whole-lesson-container">
    <div
      :class="'primary ' + lessonCardAnim"
      @mouseenter="enterHover"
      @mouseleave="exitHover"
      @click="handleClick"
    >
      <div class="lesson-menu-card">
        <div :class="'extra-info-container ' + extraInfoAnim">
          <h1 class="extra-info lesson-type">{{ lessonType }}</h1>
          <h1 class="extra-info lesson-translation">{{ lessonTranslation }}</h1>
        </div>
        <h1 :class="'lesson-title ' + lessonTitleAnim">
          {{ lessonTitle }}
        </h1>
      </div>
      <div class="progress-bar"></div>
    </div>

    <div class="menuVisibility" v-if="showMenu">
      <router-link
        v-for="lesson in lessons.lessonData"
        :key="lesson.id"
        :to="{
          name: 'about',
          params: {
            data: JSON.stringify(lesson.data),
          },
        }"
      >
        <div :class="'card ' + zIndex + ' ' + subLessonAnim">
          <h4 class="sub-lesson-title">
            {{ lesson.title }}
          </h4>
          <div class="sub-progress-bar"></div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { gsap } from "gsap/dist/gsap";
import { defineComponent, type PropType } from "vue";

export interface Lessons {
  lessonData: {
    id: number;
    data: {
      japanese: string;
      english: string;
      furigana: string;
    }[];
    title: string;
  }[];
}

export default defineComponent({
  props: {
    lessons: {
      type: Object as PropType<Lessons>,
      required: true,
    },
    id: Number,
    lessonTitle: String,
    lessonTranslation: String,
    lessonType: String,
  },

  data() {
    return {
      bounce: gsap.to({}, {}),
      raise: gsap.to({}, {}),
      settle: gsap.to({}, {}),
      elevateMenu: gsap.to({}, {}),
      lowerMenu: gsap.to({}, {}),
      inImportantTransition: false,
      showMenu: false,
      menuPositionX: -230,
      menuPositionY: -105,
      menuTransitionSpeed: 0.4,
      testElement: Object,
      inPlace: false,
    };
  },

  computed: {
    lessonCardAnim() {
      return "lesson-card-anim-" + this.id;
    },

    extraInfoAnim() {
      return "extra-info-anim-" + this.id;
    },

    lessonTitleAnim() {
      return "lesson-title-anim-" + this.id;
    },

    subLessonAnim() {
      return "sub-lesson-anim-" + this.id;
    },

    menuVisibility() {
      return this.showMenu ? "menu-visible" : "menu-invisible";
    },

    zIndex() {
      return this.inPlace ? "z-index-override" : "";
    },
  },

  methods: {
    testStuff() {
      const test = this.$refs.desto as HTMLElement;
      test.classList.toggle("hello-world");
    },

    handleClick() {
      this.raise.pause();
      this.bounce.pause();
      if (!this.inImportantTransition) {
        if (this.showMenu) {
          this.lowerMenu.play(0);
        } else {
          this.elevateMenu.play(0);
        }
      }
    },
    enterHover() {
      if (!this.showMenu && !this.inImportantTransition) {
        this.bounce.pause();

        gsap.to("." + this.lessonTitleAnim, {
          y: 60,
          duration: 0.5,
        });

        gsap.to("." + this.extraInfoAnim, {
          opacity: 1,
          duration: 0.3,
          delay: 0.1,
        });

        this.raise = gsap.to("." + this.lessonCardAnim, {
          scale: 1.05,
          duration: 0.2,
          ease: "power1.out",
        });
      }
    },
    exitHover() {
      if (!this.showMenu && !this.inImportantTransition) {
        this.settle = gsap.to("." + this.lessonCardAnim, {
          scale: 1,
          duration: 0.4,
          ease: "power1.out",
          onComplete: () => {
            //this.bounce.play();
          },
        });

        gsap.to("." + this.lessonTitleAnim, {
          y: 0,
          duration: 0.5,
        });

        gsap.to("." + this.extraInfoAnim, {
          opacity: 0,
          duration: 0.4,
        });
      }
    },
    handleMenuClosedFinish() {
      this.inImportantTransition = false;
      //this.bounce.play(0);
      this.showMenu = false;
    },

    handleMenuCloseStart() {
      this.inPlace = false;
      this.inImportantTransition = true;
      gsap.to("." + this.subLessonAnim, {
        x: 20,
        y: 20,
        duration: 0.6,
        stagger: 0.05,
      });
    },

    handleImportantTask() {
      this.inPlace = false;
      this.inImportantTransition = true;
    },
    handleMenuOpenedFinish() {
      this.inImportantTransition = false;
      this.showMenu = true;
      gsap.utils.toArray("." + this.subLessonAnim).forEach((btn, index) => {
        const button = btn as gsap.TweenTarget;
        const i = index as number;
        gsap.to(button, {
          x: 120 * (i % 4),
          y: 120 * Math.floor(i / 4),
          z: 5,
          duration: 0.8,
          delay: 1 - i * 0.1,
          onComplete: () => {
            this.inPlace = true;
          },
        });
      });
    },
  },
  mounted() {
    this.bounce = gsap.to("." + this.lessonCardAnim, {
      y: -10,
      repeat: -1,
      duration: 1,
      yoyo: true,
      paused: true,
    });
    this.elevateMenu = gsap.to("." + this.lessonCardAnim, {
      x: this.menuPositionX,
      y: this.menuPositionY,
      z: 100,
      scale: 0.4,
      duration: this.menuTransitionSpeed,
      paused: true,
      ease: "power1.out",
      onStart: () => {
        this.inImportantTransition = true;
        this.showMenu = true;
      },
      onComplete: this.handleMenuOpenedFinish,
    });
    this.lowerMenu = gsap.to("." + this.lessonCardAnim, {
      x: 0,
      y: 0,
      scale: 1,
      duration: this.menuTransitionSpeed,
      paused: true,
      ease: "power1.out",
      onStart: this.handleMenuCloseStart,
      onComplete: this.handleMenuClosedFinish,
    });
  },
});
</script>

<style>
.extra-info {
  font-weight: 200;
  font-size: 40px;
  text-align: center;
}

.lesson-translation {
  font-size: 32px;
}

.lesson-type {
  font-weight: 400;
}

.extra-info-container {
  position: absolute;
  color: white;
  margin-bottom: 100px;
  opacity: 0;
}

.extra-info-fade-in {
  transition: opacity 1s;
  opacity: 1;
}

.card {
  position: absolute;
  background-color: #98d6d6e6;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  z-index: -1;
}

.card:hover {
  cursor: pointer;
  box-shadow: 1px 1px #8ba0b8;
}

.sub-lesson-title {
  color: white;
  text-align: center;
  vertical-align: middle;
}

.whole-lesson-container {
  width: 44vw;
  height: 50vh;
  position: relative;
  right: 31vw;
  top: -40vh;
}

.divider {
  opacity: 0;
}

.lesson-menu-card {
  background-color: #98d6d6;
  width: 300px;
  height: 300px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  border-radius: 0px;
  z-index: 10000;
  /* animation-name: pulse;
    animation-duration: 5s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out; */
}

.lesson-menu-card:hover {
  box-shadow: 2px 2px #8ba0b8;
}

.sub-lessons-container {
  position: absolute;
  width: 800px;
  pointer-events: none;
}

.test-div {
  width: 100px;
  height: 100px;
  background-color: black;
}

.menu-visible {
  visibility: visible;
  pointer-events: none;
  z-index: -5;
}

.menu-invisible {
  visibility: hidden;
}

.z-index-override {
  z-index: 10 !important;
}

.primary {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#destination {
  position: fixed;
  top: 0;
  right: 0;
  width: 200px;
  height: 200px;
  background-color: blue;
}

.progress-bar {
  width: 290px;
  margin-top: 10px;
  height: 10px;
  background-color: #d9d9d9;
  border-radius: 5px;
}

.sub-progress-bar {
  position: absolute;
  width: 90px;
  margin-top: 110px;
  height: 3px;
  background-color: #d9d9d9;
  border-radius: 5px;
}

.sub-class-lesson {
  position: relative;
  display: block;
  width: 50px;
  height: 50px;

  background-color: #98d6d6e6;
  -webkit-column-break-inside: avoid;
  page-break-inside: avoid;
  break-inside: avoid;
}

.primary:hover {
  cursor: pointer;
}

.lesson-title {
  color: white;
  font-size: 64px;
  text-align: center;
  vertical-align: middle;
}

@keyframes pulse {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(0px);
  }
}

@keyframes raise {
  0% {
    transform: translateY();
  }
  100% {
    transform: translateY(-10px);
  }
}
</style>
