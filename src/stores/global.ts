import { defineStore } from "pinia";

export const useGlobalStore = defineStore({
  id: "global",
  state: () => ({
    languageId: "",
    language: "",
  }),
  getters: {
    currentLanguageId: (state) => (state.languageId ? state.languageId : 2),
    currentLanguage: (state) => (state.language ? state.language : "Spanish"),
  },
  actions: {
    setLanguageId(languageId: string) {
      this.languageId = languageId;
    },

    setLanguage(language: string) {
      this.language = language;
    },
  },
});
