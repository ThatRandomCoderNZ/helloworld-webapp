<template>
  <div class="lesson-section">
    <div class="section-header">
      <div class="section-title">
        <h4>{{ name }}</h4>
      </div>
    </div>
    <div class="section-lesson-groups-container">
      <lesson-group
        v-for="group in groups"
        :main-title="group.title"
        :section-id="group.sectionId"
        :key="group.sectionId"
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
  },

  watch: {
    lessonId(newLessonId) {
      route("get", `language/${newLessonId}/section`).then((result) => {
        this.groups = result;
        console.log(this.groups);
      });
    },
  },

  data() {
    return {
      groups: [],
    };
  },

  mounted() {
    console.log(this.global.languageId);
    const id = !this.global.currentLanguageId
      ? "2"
      : this.global.currentLanguageId;
    route("get", `language/${id}/section`).then((result) => {
      this.groups = result;
      console.log(this.groups);
    });
  },
};
</script>

<style scoped>
.section-header {
  width: 100%;
  height: 10vh;
  color: #696969;
}
.section-title {
  margin-left: 9vw;
  margin-top: 4vh;
}

.lesson-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.section-lesson-groups-container {
  display: flex;
  width: 90%;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 40px;
}
</style>
