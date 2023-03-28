<template>
  <div class="lesson-section">
    <div class="section-header">
      <div class="section-title">
        <h3>{{ name }}</h3>
      </div>
    </div>
    <div class="section-lesson-groups-container">
      <lesson-group
        v-for="group in groups"
        :main-title="group.title"
        :section-id="group.sectionId"
        :key="group.sectionId"
        style="background: none"
      ></lesson-group>
    </div>
  </div>
</template>

<script>
import LessonGroup from "@/components/MenuItems/LessonGroup.vue";
import { route } from "@/helpers/api-routes";
import { useGlobalStore } from "@/stores/global";

export default {
  name: "LessonSection",
  components: { LessonGroup },

  setup() {
    const global = useGlobalStore();

    return {
      global,
    };
  },

  props: {
    name: String,
    lessonNames: Array,
    lessonId: Number,
    difficulty: Number,
    filterActive: Boolean,
  },

  watch: {
    lessonId(newLessonId) {
      route(
        "get",
        `language/${newLessonId}/section?difficulty=${this.difficulty}&type=${this.typeFilter}`
      ).then((result) => {
        this.groups = result;
        console.log(this.groups);
      });
    },

    filterActive(filterStatus) {
      if (filterStatus) {
        this.typeFilter = "FOREIGN";
      } else {
        this.typeFilter = "NATIVE";
      }

      route(
        "get",
        `language/${this.global.currentLanguageId}/section?difficulty=${this.difficulty}&type=${this.typeFilter}`
      ).then((result) => {
        this.groups = result;
        console.log(this.groups);
      });
    },
  },

  data() {
    return {
      groups: [],
      typeFilter: "NATIVE",
    };
  },

  mounted() {
    const id = !this.global.currentLanguageId
      ? "2"
      : this.global.currentLanguageId;
    route(
      "get",
      `language/${id}/section?difficulty=${this.difficulty}&type=${this.typeFilter}`
    ).then((result) => {
      this.groups = result;
      console.log(this.groups);
    });
  },
};
</script>

<style scoped>
.section-header {
  width: 100%;
  margin-top: 5vh;
  height: 10vh;
  color: #696969;
}
.section-title {
  position: relative;
  left: 45px;
  margin-top: 4vh;
}

.lesson-section {
  margin: 0 auto;
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media only screen and (max-width: 600px) {
  .lesson-section {
    padding-left: 6vw;
    width: 100%;
  }
}

.section-lesson-groups-container {
  margin-left: 100px;
  justify-self: center;
  align-self: center;
  display: flex;
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  column-gap: 40px;
  row-gap: 70px;
}
</style>
