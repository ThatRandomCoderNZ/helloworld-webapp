<template>
  <div class="grammar-section-container">
    <div class="section-header-container">
      <h5>{{ title }}</h5>
    </div>
    <div class="grammar-section">
      <div
        class="grammar-block"
        v-for="grammarBlock in grammarLessons"
        :key="grammarBlock.id"
        @click="navigateToGrammarLesson(grammarBlock.id)"
      >
        <h3>{{ grammarBlock.title }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import { route } from "@/helpers/api-routes";
import { useGlobalStore } from "@/stores/global";
import { useContentStore } from "@/stores/content";

export default {
  name: "GrammarSection",

  setup() {
    const global = useGlobalStore();
    const content = useContentStore();

    return {
      global,
      content,
    };
  },

  props: {
    title: String,
    difficultyLevel: Number,
  },

  data() {
    return {
      grammarLessons: [],
    };
  },

  methods: {
    navigateToGrammarLesson(id) {
      this.content.grammarLessonId = id;
      router.push("grammar-tool");
    },
  },

  async mounted() {
    this.grammarLessons = await route(
      "GET",
      `${this.global.currentLanguageId}/grammar`,
      {}
    );
  },
};
</script>

<style scoped>
.grammar-section-container {
  display: flex;
  flex-direction: column;
}

.grammar-block {
  width: 300px;
  height: 200px;
  background-color: #6da8a8;
}
</style>
