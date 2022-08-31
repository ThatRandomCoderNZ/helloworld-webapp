<script lang="ts">
import { defineComponent, ref } from "vue";
import router from "../router";
import { gsap } from "gsap/dist/gsap";


export default defineComponent({

  props: {
    data: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      currentLesson: {
        japanese: "",
        english: "",
      },
      lessonAttempt: "",
      lessonProgress: 0,
      lessonThreshold: 9,
      showModal: false,
    };
  },

  methods: {
    handleLesson() {
      console.log(this.lessonAttempt.toLowerCase());
      console.log(this.currentLesson.english.toLowerCase());
      if (
        this.lessonAttempt.toLowerCase() ===
        this.currentLesson.english.toLowerCase()
      ) {
        this.lessonAttempt = "";
        this.lessonProgress += 1;
        this.assignRandomLesson();

        const correct = gsap.to(".lesson-input", {
          scale: 1.05,
          duration: 0.1,
          outlineColor: "#0fbf59",
          yoyo: true,
          repeat: 1,
          ease: "power1.out",
          onComplete: () => {
            correct.kill();
          },
        });
      } else {
        this.lessonAttempt = "";
        const incorrect = gsap.to(".lesson-input", {
          scale: 1.05,
          duration: 0.1,
          outlineColor: "#dd7474",
          yoyo: true,
          repeat: 1,
          ease: "power1.out",
          onComplete: () => {
            incorrect.kill();
          },
        });
      }

      if (this.lessonProgress > this.lessonThreshold) {
        router.push({ name: "home" });
      }
    },

    toggleModal() {
      this.showModal = !this.showModal;
    },

    assignRandomLesson() {
      const nextLesson = this.getRandomInt(this.lessonData.length);
      this.currentLesson = this.lessonData[nextLesson];
    },

    getRandomInt(max: number) {
      return Math.floor(Math.random() * max);
    },
  },

  mounted() {
    this.assignRandomLesson();
    (this.$refs.userEntry as InstanceType<typeof HTMLInputElement>).focus();
  },

  computed: {
    lessonData() {
      return JSON.parse(this.data);
    },

    progress() {
      return this.lessonProgress * 10 + "%";
    },

    englishHint() {
      return this.currentLesson.english.length > 1
        ? "[ " + this.currentLesson.english + " ]"
        : "[ " + this.currentLesson.english + " ]";
    },
  },
});
</script>

<template>
  <div class="reader-modal" v-if="showModal">
    <div class="modal-content">
      <h3 class="modal-title">レッスン内容</h3>
      <div class="modal-description">
        <div class="modal-lesson" v-for="lesson in lessonData" v-bind:key="lesson.id">
          {{ lesson.japanese }} = {{ lesson.english }}
        </div>
      </div>
      <button class="modal-button" @click="toggleModal">近い</button>
    </div>
  </div>
  <div class="lesson-page">
    <div class="header-bar">
      <router-link
        class="back-link"
        :to="{
          name: 'home',
        }"
      >
        ←
      </router-link>

      <div class="reader-container" @click="toggleModal">
        <div class="reader-image"></div>
      </div>
    </div>
    <div class="center-content">
      <div class="main-lesson-container">
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: progress }"></div>
        </div>
        <div class="main-title-container">
          <h1 class="main-title">{{ currentLesson.japanese }}</h1>
        </div>
        <div class="sub-title-container">
          <h1 class="sub-title" v-if="currentLesson.furigana">
            {{ currentLesson.furigana }}
          </h1>
        </div>
        <div class="keyboard-container">
          <input
            v-model="lessonAttempt"
            @keyup.enter="handleLesson"
            class="lesson-input"
            type="text"
            ref="userEntry"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.modal-title {
  color: #98d6d6;
  font-size: 72px;

  border-bottom: 1px solid #98d6d6;
  margin-bottom: 5vh;
}

.modal-button {
  color: white;
  background-color: #98d6d6;
  border: none;
  font-size: 24px;
  width: 300px;
  height: 60px;
  border-radius: 20px;
}

.modal-button:hover {
  cursor: pointer;
  box-shadow: 1px 1px #8ba0b8;
}

.modal-description {
  width: 80%;
  height: 60%;
  margin-bottom: 5vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.modal-lesson {
  font-size: 24px;
  color: #84b7b7;
  margin-top: 5px;
  margin-bottom: 5px;
}

.modal-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50vw;
  height: 45vw;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
}

.reader-modal {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  z-index: 1000;
  left: 0;
  top: 0;
  background-color: rgba(80, 80, 80, 0.582);
}

.progress-bar {
  width: 100%;
  height: 10px;
  background-color: rgb(235, 234, 234);
  display: flex;
  justify-content: start;
  border-radius: 20px;
}

.progress-fill {
  height: 100%;
  background-color: #98d6d6;
  border-radius: 20px;
}

.lesson-page {
  position: fixed;
  left: 10vw;
  top: 0;
  width: 80vw;
  height: 100vh;
  display: flex;
  align-items: center;

  flex-direction: column;
}

.main-title-container {
  display: flex;
  align-items: center;
}

.main-title {
  margin-top: 2vh;
  font-size: 180px;
  color: #98d6d6;
  text-align: center;
  vertical-align: middle;
}

.sub-title {
  font-size: 24px;
  color: #98d6d6;
  text-align: center;
  vertical-align: middle;
}

.main-lesson-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.keyboard-container {
  margin-top: 20vh;
  display: flex;
  align-items: center;
}

.lesson-input {
  width: 40vw;
  height: 8vh;
  line-height: 30px;
  font-size: 32px;
  text-align: center;
  border-radius: 20px;
  border: #98d6d6 solid 2px;
  color: #98d6d6;
}

input[type="text"]:focus {
  border-color: #98d6d6 !important;
}

input:focus,
textarea:focus {
  outline-color: #81bebe;
}

.lesson-input:focus {
  border-color: #81bebe;
}

.header-bar {
  width: 100%;
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.center-content {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-link {
  font-size: 60px;
  color: #98d6d6;
}

.back-link:hover {
  font-size: 60px;
  background: none;
}

.reader-container {
  margin-top: 3vh;
  height: 50px;
  width: 50px;
}

.reader-container:hover {
  cursor: pointer;
}

.reader-image {
  background-image: url("../assets/read-book-icon.svg");
  background-repeat: no-repeat;
  width: 100%;
  fill: blue;
  height: 100%;
}
</style>
