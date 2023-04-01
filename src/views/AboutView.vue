<template>
  <SideReader :force-display="showHints">
    <lesson-hint-info :lesson-data="lessonData" />
  </SideReader>
  <!--  <div class="reader-modal" v-if="showHints">-->
  <!--    <div class="modal-content">-->
  <!--      <div class="modal-description">-->
  <!--        <div-->
  <!--          class="modal-lesson"-->
  <!--          v-for="lesson in lessonData"-->
  <!--          v-bind:key="lesson.id"-->
  <!--        >-->
  <!--          {{ lesson.foreignWord }} = {{ lesson.nativeWord }}-->
  <!--        </div>-->
  <!--      </div>-->
  <!--      <button class="modal-button" @click="toggleModal">Close</button>-->
  <!--    </div>-->
  <!--  </div>-->
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
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: progress }"></div>
      </div>
      <div></div>
    </div>
    <div class="center-content">
      <div class="main-lesson-container">
        <div class="main-title-container">
          <h1 class="main-title">{{ currentLesson.foreignWord }}</h1>
        </div>
        <div class="sub-title-container">
          <h1 class="sub-title" v-if="currentLesson.foreignAlternative">
            {{ currentLesson.foreignAlternative }}
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

<script lang="ts">
import { defineComponent, ref } from "vue";
import router from "@/router";
import { gsap } from "gsap/dist/gsap";
import { route } from "@/helpers/api-routes";
import { useContentStore } from "@/stores/content";
import { useUserStore } from "@/stores/user";
import SideReader from "@/components/SideReader.vue";
import LessonHintInfo from "@/components/LessonHintInfo.vue";

export default defineComponent({
  components: { LessonHintInfo, SideReader },
  setup() {
    const store = useContentStore();
    const user = useUserStore();

    const userEntry = ref<HTMLInputElement>();
    return {
      store,
      userEntry,
      user,
    };
  },

  data() {
    return {
      currentLesson: {
        foreignWord: "",
        nativeWord: "",
        foreignAlternative: "",
        id: "",
      },
      data: [],
      lessonAttempt: "",
      lessonProgress: 0,
      lessonThreshold: 0,
      showHints: false,
      questionTimer: 0,
      questionSequence: [0],
      currentQuestion: -1,
    };
  },

  methods: {
    handleLesson() {
      if (
        this.lessonAttempt.trim().toLowerCase() ===
        this.currentLesson.nativeWord.trim().toLowerCase()
      ) {
        this.lessonAttempt = "";
        this.lessonProgress += 1;
        const timeTaken = (Date.now() - this.questionTimer) / 1000;
        console.log(timeTaken);
        const targetTime = Math.max(
          this.currentLesson.nativeWord.length * 0.3,
          2
        );
        const progress =
          timeTaken <= targetTime
            ? 100
            : timeTaken > 12
            ? 10
            : 110 - Math.floor(timeTaken) * 10;
        console.log("Progress", progress);
        route(
          "POST",
          `${this.user.getUserUuid}/progress/${this.currentLesson.id}`,
          {
            progress: progress,
          }
        );
        if (this.lessonProgress >= this.lessonThreshold) {
          router.push({ name: "home" });
        }
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
    },

    toggleModal() {
      this.showHints = !this.showHints;
      if (!this.showHints) {
        this.focusInput();
      }
    },

    focusInput() {
      this.userEntry?.focus();
    },

    assignRandomLesson() {
      this.focusInput();
      this.questionTimer = Date.now();
      const nextLesson = this.getNextLesson();
      this.currentLesson = this.lessonData[nextLesson];
    },

    getNextLesson() {
      this.currentQuestion++;
      return this.questionSequence[this.currentQuestion];
    },

    createRandomQuestionSequence() {
      const questionRange = [...Array(this.data.length).keys()];
      return this.shuffle(questionRange);
    },

    shuffle(data: Array<number>) {
      return data
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
    },

    getRandomInt(max: number) {
      return Math.floor(Math.random() * max);
    },
  },

  async mounted() {
    const data = await route("get", "lesson/" + this.store.lessonId);
    route(
      "get",
      `${this.user.getUserUuid}/progress/lesson/${this.store.lessonId}`
    ).then((result) => {
      this.showHints = result.length != data.vocabulary.length;
    });
    this.data = data.vocabulary;
    this.lessonThreshold = this.data.length;
    this.questionSequence = this.createRandomQuestionSequence();
    this.assignRandomLesson();
    (this.$refs.userEntry as InstanceType<typeof HTMLInputElement>).focus();
  },

  computed: {
    lessonData() {
      return this.data;
    },

    progress() {
      return (this.lessonProgress / this.lessonThreshold) * 100 + "%";
    },

    // englishHint() {
    //   return this.currentLesson.native.length > 1
    //     ? "[ " + this.currentLesson.native + " ]"
    //     : "[ " + this.currentLesson.native + " ]";
    // },
  },
});
</script>

<style>
.progress-bar {
  position: relative;
  width: 60%;
  right: 30px;
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
  margin-top: 20vh;
  font-size: 60px;
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

.reader-container {
  margin-top: 15vh;
  height: 35px;
  width: 35px;
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
  text-decoration: none;
}

.back-link:hover {
  font-size: 60px;
  background: none;
}
</style>
