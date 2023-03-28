<template>
  <div class="add-block" @click="createNew">
    <p class="add-text">+</p>
  </div>
</template>

<script>
import { route } from "@/helpers/api-routes";

export default {
  name: "AddBlock",

  props: {
    currentLanguage: Number,
    currentSection: Number,
    currentLesson: Number,
    type: String,
  },

  computed: {
    endpoint() {
      if (this.type === "section") {
        return `language/${this.currentLanguage}/section`;
      } else if (this.type === "lesson") {
        return `language/${this.currentLanguage}/section/${this.currentSection}/lesson`;
      } else {
        return `section/${this.currentSection}/lesson/${this.currentLesson}/vocab`;
      }
    },
  },

  methods: {
    createNew() {
      route("post", this.endpoint).then((result) => {
        this.$emit("added");
      });
    },
  },
};
</script>

<style scoped>
.add-block {
  width: 100px;
  height: 100px;
  background-color: #9dcfcf;
  margin: auto auto 20px;
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
</style>
