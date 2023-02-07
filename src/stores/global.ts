import { defineStore } from "pinia";

export const useGlobalStore = defineStore({
  id: "global",
  state: () => ({
    languageId: "",
  }),
  getters: {
    currentLanguageId: (state) => state.languageId,
  },
  actions: {
    setLanguageId(languageId: string) {
      this.languageId = languageId;
    },
  },
});
