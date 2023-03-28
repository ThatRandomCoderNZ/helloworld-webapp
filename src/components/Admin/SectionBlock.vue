<template>
  <div
    :class="
      'section-block ' + (this.activeSelection === this.index ? 'selected' : '')
    "
  >
    <v-text-field
      class="editable-detail"
      v-model="nameModel"
      :hide-details="true"
      @focusout="updateData"
    >
    </v-text-field>
    <v-text-field
      class="editable-detail"
      v-model="difficultyModel"
      :hide-details="true"
      @focusout="updateData"
    >
    </v-text-field>
    <v-text-field
      class="editable-detail"
      v-model="typeModel"
      :hide-details="true"
      @focusout="updateData"
    ></v-text-field>
    <div class="section-footer">
      <DocumentAdd
        @click="createOppositeSection"
        style="width: 1.5em; height: 1.5em; align-self: end; color: white"
      ></DocumentAdd>
      <Delete
        @click="deleteData"
        style="width: 1.5em; height: 1.5em; align-self: end; color: white"
      />
    </div>
  </div>
</template>

<script>
import { route } from "@/helpers/api-routes";
import { Delete } from "@element-plus/icons-vue";
import { DocumentAdd } from "@element-plus/icons-vue";

export default {
  name: "SectionBlock",

  components: {
    Delete,
    DocumentAdd,
  },

  props: {
    id: Number,
    languageId: Number,
    name: String,
    difficulty: Number,
    type: String,
    index: Number,
    activeSelection: Number,
  },

  data() {
    return {
      nameModel: this.name,
      difficultyModel: this.difficulty,
      typeModel: this.type,
    };
  },

  methods: {
    updateData() {
      route("put", "section", {
        sectionId: this.id,
        title: this.nameModel,
        difficulty: this.difficultyModel,
        type: this.typeModel,
      }).then(() => {
        this.$emit("updated");
      });
    },

    deleteData() {
      route("delete", "section/" + this.id).then(() => {
        this.$emit("updated");
      });
    },

    createOppositeSection() {
      const url = `language/${this.languageId}/section/${this.id}/flipped`;
      route("POST", url).then(() => {
        console.log("success");
      });
    },
  },

  computed: {
    activeClass() {
      return "section-block " + (this.activeSelection === this.index)
        ? "selected"
        : "";
    },
  },
};
</script>

<style scoped>
.section-block {
  display: flex;
  flex-direction: column;
  background-color: #9dcfcf;
  padding: 5px 5px;
  margin: 30px 30px;
  cursor: pointer;
}

.section-block:hover {
  box-shadow: 1px 1px 2px gray;
}

.selected {
  border: 2px solid gray;
}

.selected:hover {
  border: 2px solid gray;
  box-shadow: none;
}

.editable-detail {
  width: 200px;
  cursor: pointer;
}

.editable-detail:deep(.v-field__overlay) {
  background-color: #9dcfcf !important;
  opacity: 1;
}

.editable-detail:deep(.v-field__overlay):focus {
  background-color: #9dcfcf !important;
  opacity: 1;
}

.editable-detail:deep(input) {
  font-size: 18px;
  color: white;
  text-align: center;
  border-style: none !important;
}

.editable-detail:deep(v-field) {
  border: 3px solid white;
  height: 5px;
  padding-top: 2px !important;
  padding-bottom: 2px !important;
}

.editable-detail:deep(v-field__input) {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}

.editable-detail:deep(.v-field__outline::before) {
  border-style: none;
}

.editable-detail:deep(.v-field__outline::after) {
  border-style: none;
}

.section-footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 15px;
}
</style>
