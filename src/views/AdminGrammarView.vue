<template>
  <div class="grammar-editor-container">
    <div class="grammar-editor-header">
      <div class="language-selector">
        <v-select
          class="selector"
          label="Language"
          outlined
          :items="selectableLanguages"
          v-model="currentValue"
          no-data-text="No Languages"
        ></v-select>
      </div>
    </div>
    <div class="grammar-editor">
      <div
        class="grammar-line"
        v-for="grammar in grammarData"
        :key="grammar.id"
      >
        <GrammarBlock
          :title="grammar.title"
          :id="grammar.id"
          :difficulty="grammar.difficulty"
          :explanation="grammar.explanation"
          :prompt="grammar.prompt"
          @updated="syncGrammarData"
        >
        </GrammarBlock>
      </div>
      <div class="add-block" @click="createNew">
        <p class="add-text">+</p>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import { route } from "@/helpers/api-routes";
import GrammarBlock from "@/components/Admin/GrammarBlock.vue";

export default {
  name: "AdminGrammarView",
  components: { GrammarBlock },

  data() {
    return {
      languages: [],
      currentValue: "",
      grammarData: [],
    };
  },

  computed: {
    selectableLanguages() {
      return this.languages.map((language) => {
        return language.name;
      });
    },

    currentLanguage() {
      if (this.currentValue === "") {
        return 0;
      } else {
        return this.languages.findIndex(
          (language) => language.name === this.currentValue
        );
      }
    },

    currentLanguageId() {
      return this.languages[this.currentLanguage].id;
    },
  },

  methods: {
    createNew() {
      route("POST", `${this.currentLanguageId}/grammar`, {}).then(() =>
        this.syncGrammarData()
      );
    },

    async syncGrammarData() {
      this.grammarData = await route(
        "get",
        `${this.currentLanguageId}/grammar`
      );
    },
  },

  watch: {
    currentValue(newLanguage) {
      this.syncGrammarData();
    },
  },

  async mounted() {
    this.languages = await route("get", "language");
    console.log(this.languages);
    this.currentValue = this.selectableLanguages[0];
  },
};
</script>

<style scoped>
.selector {
  width: 10vw;
  margin-left: 30px;
  padding-top: 20px;
}

.grammar-editor-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
}

.grammar-editor-header {
  background-color: #9dcfcf;
  width: 100%;
  height: 100px;
}

.grammar-editor {
  width: 80%;
  padding-top: 50px;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-items: center;
  gap: 25px;
}

.add-block {
  width: 100px;
  height: 100px;
  background-color: #9dcfcf;
  margin: 20px auto auto 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
}

.add-block:hover {
  box-shadow: 1px 1px 2px gray;
  cursor: pointer;
  font-size: 34px;
}

.add-text {
  color: white;
}

.grammar-line {
  width: 100%;
  background-color: #9dcfcf;
}
</style>
