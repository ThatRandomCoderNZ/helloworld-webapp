<template>
  <div
    :class="
      'lesson-block ' + (this.activeLesson === this.index ? 'selected' : '')
    "
  >
    <v-text-field
      class="editable-detail"
      outlined
      v-model="nameModel"
      :hide-details="true"
      @focusout="updateData"
    ></v-text-field>
    <Delete
      @click="deleteData"
      style="width: 1.5em; height: 1.5em; align-self: end; color: white"
    />
  </div>
</template>

<script>
import { route } from "@/helpers/api-routes";
import { Delete } from "@element-plus/icons-vue";

export default {
  name: "LessonBlock",

  components: {
    Delete,
  },

  props: {
    id: Number,
    name: String,
    index: Number,
    activeLesson: Number,
  },

  methods: {
    updateData() {
      route("put", "lesson", {
        lessonId: this.id,
        name: this.nameModel,
        type: "VOCAB",
      }).then(() => {
        this.$emit("updated");
      });
    },

    deleteData() {
      route("delete", "lesson/" + this.id).then(() => {
        this.$emit("updated");
      });
    },
  },

  data() {
    return {
      nameModel: this.name,
    };
  },
};
</script>

<style scoped>
.lesson-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #9dcfcf;
  padding: 15px 10px;
  background-color: #9dcfcf !important;
  margin: 30px;
  cursor: pointer;
}

.lesson-block:hover {
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
  margin: 20px;
  font-size: 50px;
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
  font-size: 24px;
  color: white;
  text-align: center;
  border-style: none !important;
}

.editable-detail:deep(v-field) {
  border: 3px solid white;
}

.editable-detail:deep(.v-field__outline::before) {
  border-style: none;
}

.editable-detail:deep(.v-field__outline::after) {
  border-style: none;
}
</style>
