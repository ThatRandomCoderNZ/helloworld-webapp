<template>
  <div class="reader-info-card" v-for="lesson in lessonData" :key="lesson.id">
    <p>{{ lesson.foreignWord }} = {{ lesson.nativeWord }}</p>
  </div>
</template>

<script>
export default {
  name: "LessonHintInfo",

  props: {
    lessonData: Array,
  },
};
</script>

<style scoped>
.reader-info-card {
  width: 300px;
  height: 40px;
  color: white;
  font-size: 18px;
}
</style>
