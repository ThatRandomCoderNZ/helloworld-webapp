<template>
  <div class="lesson-section">
    <div class="section-header">
      <div class="section-title">
        <h4>{{ name }}</h4>
      </div>
    </div>
    <div class="section-lesson-groups-container">
      <lesson-group main-title="Vocab I"></lesson-group>
      <lesson-group main-title="Vocab II"></lesson-group>
      <lesson-group main-title="Vocab III"></lesson-group>
      <lesson-group main-title="Vocab IV"></lesson-group>
      <lesson-group main-title="Vocab V"></lesson-group>
    </div>
  </div>
</template>

<script>
import LessonGroup from "@/components/MenuItems/LessonGroup.vue";

export default {
  name: "LessonSection",
  components: { LessonGroup },

  props: {
    name: String,
    lessonNames: Array,
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
