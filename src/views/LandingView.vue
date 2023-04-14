<template>
  <div class="landing-page">
    <div class="landing-header">
      <div class="landing-logo-container">
        <div class="logo-image"></div>
      </div>
      <div
        :class="
          'lesson-details-container ' + (transitionDetails ? 'fading' : '')
        "
      >
        <!--        <div-->
        <!--          v-for="word in wordBank"-->
        <!--          :key="word.id"-->
        <!--          :class="-->
        <!--            'landing-word-display ' +-->
        <!--            (word.id < correctWords ? 'strike' : 'no-strike-through')-->
        <!--          "-->
        <!--        >-->
        <!--          {{ word.japanese }} = {{ word.english }}-->
        <!--        </div>-->
      </div>
      <!--      <div v-else class="lesson-details-container">-->
      <!--        <div v-for="word in wordBank"-->
      <!--             :key="word.id"-->
      <!--             :class="'landing-word-display ' + ((word.id < currentWordIndex) ? 'strike':'no-strike-through') ">-->
      <!--          {{ word.japanese }} = {{ word.english }}-->
      <!--        </div>-->
      <!--      </div>-->
    </div>

    <div class="main-landing-content">
      <div class="animated-centerpiece">
        <div
          :class="
            'foreign-text-guesser ' +
            (transitionForeign
              ? 'success-fade'
              : '' + (transitionDetails ? ' hide' : ''))
          "
        >
          <h4>{{ currentWords.japanese }}</h4>
        </div>
        <div class="native-text-guesser">
          <h4 ref="native-guesser">excited</h4>
        </div>
      </div>

      <div class="registration-container">
        <button class="landing-button sign-in" @click="handleSignIn">
          <p>Get Started</p>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

import TypeWriter from "typewriter-effect/dist/core";

import router from "@/router";

export default defineComponent({
  name: "LandingView",
  data() {
    return {
      bankSwitch: false,
      transitionDetails: false,
      transitionForeign: false,
      currentWordIndex: 0,
      correctWords: 0,
      secondaryBank: [
        {
          id: 0,
          japanese: "これ",
          english: "this",
        },
        {
          id: 1,
          japanese: "それ",
          english: "that",
        },
        {
          id: 2,
          japanese: "明日",
          english: "tomorrow",
        },
        {
          id: 3,
          japanese: "家",
          english: "home",
        },
        {
          id: 4,
          japanese: "です",
          english: "to be",
        },
        {
          id: 5,
          japanese: "行く",
          english: "to go",
        },
      ],
      wordBank: [
        {
          id: 0,
          japanese: "こんにちは",
          english: "hello",
        },
        {
          id: 1,
          japanese: "ありがとう",
          english: "thank you",
        },
        {
          id: 2,
          japanese: "今日",
          english: "today",
        },
        {
          id: 3,
          japanese: "する ",
          english: "to do",
        },
        {
          id: 4,
          japanese: "Bonjour",
          english: "hello",
        },
        {
          id: 5,
          japanese: "Faire",
          english: "to do",
        },
        {
          id: 6,
          japanese: "Souvent",
          english: "often",
        },
      ],
    };
  },

  computed: {
    currentWords() {
      return this.wordBank[this.currentWordIndex];
    },
  },

  methods: {
    startAnimation() {
      return new Promise((resolve) => {
        const typewriter = new TypeWriter(this.$refs["native-guesser"], {
          delay: 75,
        });

        typewriter
          .pauseFor(1000)
          .typeString(this.currentWords.english)
          .pauseFor(750)
          .callFunction(resolve)
          .start();
      });
    },

    assignNewWord() {
      return new Promise((resolve) => {
        this.correctWords++;
        this.transitionForeign = true;
        setTimeout(() => {
          this.transitionForeign = false;
          this.currentWordIndex++;
          if (this.currentWordIndex >= this.wordBank.length) {
            this.transitionDetails = true;
            this.currentWordIndex = 0;
            setTimeout(() => {
              this.transitionDetails = false;
              this.correctWords = 0;
              const temp = this.wordBank;
              this.wordBank = this.secondaryBank;
              this.secondaryBank = temp;
              resolve();
            }, 1500);
          } else {
            resolve();
          }
        }, 1000);
      });
    },

    handleSignUp() {
      router.push({ name: "signup" });
    },

    handleSignIn() {
      router.push({ name: "signup" });
    },

    handleTypingShift() {
      this.$refs["native-guesser"].textContent = "";
      this.assignNewWord()
        .then(this.startAnimation)
        .then(this.handleTypingShift);
    },
  },

  mounted() {
    this.startAnimation().then(this.handleTypingShift);
  },
});
</script>

<style scoped>
.logo-image {
  background-image: url("../assets/logo-just-white-sub.svg");
  background-repeat: no-repeat;
  object-fit: contain;
  margin-top: 25px;
  width: 100px;
  height: 60px;
}

.landing-page {
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  justify-self: start;
  left: 0;
  top: 0;
  width: 100vw;
  position: fixed;
  padding-right: 5vw;
  padding-left: 5vw;
  height: 100vh;
  background-color: #98d6d6;
}
.landing-header {
  display: flex;
  width: 100%;
  align-items: start;
  flex-direction: row;
  justify-content: space-between;
  align-self: start;
  margin-top: 2vh;
}

.main-landing-title {
  font-size: 30px;
}

.main-landing-subtitle {
  font-size: 18px;
  margin-left: 10px;
}

.lesson-details-container {
  margin-right: 5vw;
  transition: opacity 1s;
}

.landing-word-display {
  font-size: 18px;
  transition: 1s;
  text-align: center;
}

.hide {
  opacity: 0;
}

.foreign-text-guesser {
  font-size: 42px;
  transition: opacity 1s;
  color: white;
}

.success-fade {
  transition: color 0.1s, opacity 1s;
  opacity: 0;
  color: #befad6;
}

@keyframes strike {
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
}
.strike {
  position: relative;
}
.strike::after {
  content: " ";
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 1px;
  background: white;
  animation-name: strike;
  animation-duration: 0.5s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}

.fading {
  transition: opacity 1s;
  opacity: 0;
}

.landing-logo-container {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  text-align: center;
}
.main-landing-content {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
}

.animated-centerpiece {
  margin-top: 15vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.native-text-guesser {
  margin-top: 5vh;
  font-size: 32px;
  text-align: center;
}

.lesson-details-container {
  align-self: end;
}

.registration-container {
  justify-self: baseline;
  margin-bottom: 10vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 80vw;
}

.landing-button {
  width: 300px;
  height: 75px;
  border: white solid 3px;
  fill: none;
  color: white;
  background-color: transparent;
  border-radius: 2px;
  font-weight: bold;
  cursor: pointer;
  font-size: 22px;
}
.landing-button:hover {
  border: white solid 4px;
  fill: none;
  color: white;
  background-color: transparent;
  box-shadow: 2px 2px 2px grey;
}

.no-strike-through {
  text-decoration: none;
}
.strike-through {
  text-decoration: line-through;
}

@media screen and (max-width: 600px) {
  .logo-image {
    margin-top: 10px;
    width: 80px;
    height: 40px;
  }

  .animated-centerpiece {
    margin-top: 25vh;
  }

  .foreign-text-guesser {
    font-size: 32px;
  }

  .native-text-guesser {
    font-size: 24px;
  }

  .registration-container {
    margin-bottom: 5vh;
  }

  .landing-button {
    width: 200px;
    height: 60px;
    margin-bottom: 20vh;
    font-size: 18px;
  }
}
</style>
