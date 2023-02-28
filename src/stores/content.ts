import { defineStore } from "pinia";

export const useContentStore = defineStore({
  id: "content",
  state: () => ({
    lessonId: "",
    grammarLessonId: "",
  }),
  getters: {
    currentLesson: (state) => state.lessonId,
    currentGrammarLesson: (state) => state.grammarLessonId,
  },
  actions: {
    setLesson(lessonId: string) {
      this.lessonId = lessonId;
    },
    setGrammarLesson(lessonId: string) {
      this.grammarLessonId = lessonId;
    },
  },
});
