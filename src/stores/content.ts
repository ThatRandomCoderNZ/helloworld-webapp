import { defineStore } from "pinia";

export const useContentStore = defineStore({
  id: "content",
  state: () => ({
    lessonId: "",
  }),
  getters: {
    currentLesson: (state) => state.lessonId,
  },
  actions: {
    setLesson(lessonId: string) {
      this.lessonId = lessonId;
    },
  },
});
