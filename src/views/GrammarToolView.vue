<template>
  <div class="grammar-tool-container">
    <SideReader :force-display="false">
      <div>Something</div>
    </SideReader>
    <div class="grammar-tool-header">
      <router-link
        class="back-link"
        :to="{
          name: 'grammar',
        }"
      >
        ←
      </router-link>
    </div>

    <div class="prompt-container">
      <div>Write something {{ this.lessonMood }}</div>
      <div>{{ grammarLessonData.prompt }}</div>
    </div>

    <div class="metrics-container">
      <div class="mood-scale-container">
        <div class="mood-rating-container">
          <div>{{ moodRating }}/10</div>
          <div class="mood-rating-subtitle">mood</div>
          <div></div>
        </div>
        <v-progress-circular
          :rotate="180"
          :size="200"
          :width="10"
          :model-value="moodRating * 10"
          color="#98d6d6"
        ></v-progress-circular>
      </div>
      <div class="accuracy-container">
        <div class="accuracy-title">correct</div>
        <v-progress-circular
          :rotate="180"
          :size="200"
          :width="10"
          :model-value="accuracyScore"
          :color="accuracyColor"
        ></v-progress-circular>
      </div>
    </div>

    <div class="grammar-tool-input-container">
      <textarea
        class="grammar-input"
        type="text"
        v-model="answer"
        @keyup.enter="handleTextInput"
      />
    </div>
  </div>
</template>

<script>
import SideReader from "@/components/SideReader.vue";
import { useGlobalStore } from "@/stores/global";
import { useContentStore } from "@/stores/content";
import { route } from "@/helpers/api-routes";

const moods = ["humorous", "sad", "happy", "exciting"];

export default {
  name: "GrammarToolView",
  components: { SideReader },

  setup() {
    const global = useGlobalStore();
    const content = useContentStore();

    return {
      global,
      content,
    };
  },

  data() {
    return {
      grammarLessonData: {},
      lessonMood: "",
      moodRating: 0,
      answer: "",
      accuracyColor: "green",
      accuracyScore: 0,
    };
  },

  methods: {
    pickRandomMood() {
      const randomIndex = Math.floor(Math.random() * moods.length);
      return moods[randomIndex];
    },

    handleTextInput() {
      const message = this.answer;
      route(
        "get",
        `ai/${this.global.currentLanguageId}/correctness?prompt=${this.grammarLessonData.prompt}&sentence=${message}`
      ).then((result) => {
        this.accuracyColor = result ? "green" : "red";
        this.accuracyScore = 100;
      });

      route(
        "get",
        `ai/${this.global.currentLanguageId}/accuracy?sentence=${message}`
      ).then((result) => {
        console.log(result);
      });

      route(
        "get",
        `ai/${this.global.currentLanguageId}/mood?mood=${this.lessonMood}&sentence=${message}`
      ).then((result) => {
        this.moodRating = result;
      });
      this.answer = "";
    },
  },

  async mounted() {
    this.lessonMood = this.pickRandomMood();
    this.grammarLessonData = await route(
      "get",
      `grammar/${this.content.grammarLessonId}`
    );
  },
};
</script>

<style scoped>
.back-link {
  font-size: 60px;
  color: #98d6d6;
  text-decoration: none;
  margin-left: 10vw;
}

.back-link:hover {
  font-size: 60px;
  background: none;
}

.grammar-tool-header {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}

.grammar-tool-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.prompt-container {
  color: #81bebe;
  min-font-size: 18px;
  font-size: 2vw;
  width: 50%;
  text-align: center;
  font-weight: 600;
}

.grammar-tool-input-container {
  margin-top: 15vh;
}

.grammar-input {
  color: #81bebe;
  width: 50vw;
  height: 100px;
  padding: 10px 20px;
  resize: none;
  border: 2px solid #81bebe;
  border-radius: 20px;
  font-size: 20px;
}

.grammar-input:focus {
  border: 2px solid #98d6d6;
}

.metrics-container {
  margin-top: 15vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10vw;
}

.mood-rating-container {
  font-size: 36px;
  position: absolute;
  margin-top: 72px;
  margin-left: 62px;
  font-weight: 700;
  color: #98d6d6;
}

.mood-rating-subtitle {
  font-size: 18px;
  margin-left: 18px;
  margin-top: -10px;
}

.accuracy-title {
  position: absolute;
  margin-left: 60px;
  margin-top: 80px;
  color: #98d6d6;
  font-weight: 700;
  font-size: 24px;
}
</style>
