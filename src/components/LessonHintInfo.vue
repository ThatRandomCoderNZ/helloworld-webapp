<template>
  <div class="reader-info-card" v-for="lesson in lessonData" :key="lesson.id">
    <div :class="foreignStyling">{{ lesson.foreignWord + " " }}</div>
    <div class="equals">=</div>
    <div class="native">{{ " " + lesson.nativeWord }}</div>
  </div>
</template>

<script>
import {useGlobalStore} from "@/stores/global";

export default {
  name: "LessonHintInfo",

  setup() {
    const global = useGlobalStore();

    return {
      global,
    };
  },

  computed: {
    foreignStyling(){
      return this.global.currentLanguage === "Japanese" ? "foreign enlarged":"foreign"
    },
  },

  props: {
    lessonData: Array,
  },
};
</script>

<style scoped>
.reader-info-card {
  width: 300px;
  color: white;
  font-size: 18px;
  line-height: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  column-gap: 5px;
  justify-content: flex-start;
}

.equals {
  flex-basis: 10%;
}

.native {
  flex-basis: 45%;
  flex-grow: 2;
}

.foreign {
  flex-basis: 50%;
}

.enlarged {
  font-size: 24px;
  line-height: 28px;
  font-weight: lighter;
}
</style>
