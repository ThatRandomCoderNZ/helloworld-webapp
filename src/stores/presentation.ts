import { defineStore } from "pinia";
import { ref } from "vue";

export const usePresentationStore = defineStore("presentation", () => {
  const expansionState = ref(new Map<string, boolean>());

  function getExpansionState(key: string) {
    return expansionState.value.get(key);
  }
  function setExpansionState(key: string, value: boolean) {
    expansionState.value.set(key, value);
  }

  return { expansionState, getExpansionState, setExpansionState };
});
