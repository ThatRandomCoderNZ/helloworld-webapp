<template>
  <div class="vocab-block" @focusout="updateData">
    <div class="block-form-container">
      <div class="vocab-row">
        <div class="editable-block">
          <p>Question:</p>
          <v-text-field
            class="editable-detail"
            v-model="foreignWordModel"
            :hide-details="true"
          ></v-text-field>
        </div>
        <div class="editable-block">
          <p>Answer:</p>
          <v-text-field
            class="editable-detail"
            v-model="nativeWordModel"
            :hide-details="true"
          ></v-text-field>
        </div>
        <div class="editable-block">
          <p>Alternative:</p>
          <v-text-field
            class="editable-detail"
            v-model="foreignAlternativeModel"
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
    </div>
  </div>
</template>

<script>
import { route } from "@/helpers/api-routes";
import { Delete } from "@element-plus/icons-vue";

export default {
  name: "VocabBlock",

  components: {
    Delete,
  },

  props: {
    id: Number,
    foreignWord: String,
    nativeWord: String,
    pronunciation: String,
    foreignAlternative: String,
  },

  data() {
    return {
      foreignWordModel: this.foreignWord,
      nativeWordModel: this.nativeWord,
      pronunciationModel: this.pronunciation,
      foreignAlternativeModel: this.foreignAlternative,
    };
  },

  methods: {
    updateData() {
      route("put", "vocab", {
        vocabularyId: this.id,
        foreignWord: this.foreignWordModel,
        nativeWord: this.nativeWordModel,
        pronunciation: this.pronunciationModel,
        foreignAlternative: this.foreignAlternativeModel,
      }).then(() => {
        this.$emit("updated");
      });
    },

    deleteData() {
      route("delete", "vocab/" + this.id).then(() => {
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
  justify-content: space-around;
  align-items: center;
}

.editable-block {
  margin-top: 5px;
}

.editable-detail {
  display: inline-block;
  width: 200px;
}

.editable-detail:deep(.v-field__overlay) {
  background-color: white !important;
}
</style>
