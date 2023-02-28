<template>
  <div class="vocab-block" @focusout="updateData">
    <div class="block-form-container">
      <div class="vocab-row">
        <div class="editable-block">
          <p>Title:</p>
          <v-text-field
            class="editable-detail"
            v-model="titleModel"
            :hide-details="true"
          ></v-text-field>
        </div>
        <div class="editable-block">
          <p>Difficulty:</p>
          <v-text-field
            class="editable-detail"
            v-model="difficultyModel"
            :hide-details="true"
          ></v-text-field>
        </div>
        <div class="editable-block">
          <p>Prompt:</p>
          <v-text-field
            class="editable-detail"
            v-model="promptModel"
            :hide-details="true"
          ></v-text-field>
        </div>
        <Delete
          @click="deleteData"
          style="
            width: 1.5em;
            height: 1.5em;
            margin-bottom: 20px;
            align-self: end;
            justify-self: center;
            cursor: pointer;
            color: black;
          "
        />
      </div>
      <div class="vocab-row">
        <div class="explanation-container">
          <p>Explanation:</p>
          <textarea
            class="explanation-input"
            v-model="explanationModel"
          ></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { route } from "@/helpers/api-routes";
import { Delete } from "@element-plus/icons-vue";

export default {
  name: "GrammarBlock",

  components: {
    Delete,
  },

  props: {
    id: Number,
    title: String,
    difficulty: Number,
    prompt: String,
    explanation: String,
  },

  data() {
    return {
      titleModel: this.title,
      difficultyModel: this.difficulty,
      promptModel: this.prompt,
      explanationModel: this.explanation,
    };
  },

  methods: {
    updateData() {
      route("put", "grammar", {
        id: this.id,
        title: this.titleModel,
        difficulty: this.difficultyModel,
        prompt: this.promptModel,
        explanation: this.explanationModel,
      }).then(() => {
        this.$emit("updated");
      });
    },

    deleteData() {
      route("delete", "grammar/" + this.id).then(() => {
        this.$emit("updated");
      });
    },
  },
};
</script>

<style scoped>
.vocab-block {
  display: flex;
  flex-direction: column;

  border-radius: 10px;
  padding: 10px 10px;
  margin: 10px 30px;
}

.vocab-row {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 8vw;
  align-items: center;
}

.editable-block {
  margin-top: 5px;
}

.explanation-container {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-items: flex-start;
}

.explanation-input {
  width: 80%;
  min-height: 100px;
  background-color: white;
  padding: 5px 10px;
}

.editable-detail {
  display: inline-block;
  width: 15vw;
}

.editable-detail:deep(.v-field__overlay) {
  background-color: white !important;
}
</style>
