<template>
  <div class="import-container">
    <input type="file" id="csvFile" accept=".csv" @change="uploadVocab" />
  </div>
</template>

<script>
import { route } from "@/helpers/api-routes";

export default {
  name: "ImportBlock",

  props: {
    lessonId: Number,
    sectionId: Number,
  },

  methods: {
    uploadVocab(e) {
      const files = e.target.files || e.dataTransfer.files;
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result.split("\n");
        data.forEach((pairing) => {
          const [question, answer] = pairing.split(",");
          console.log(question, answer);
          route(
            "POST",
            `section/${this.sectionId}/lesson/${this.lessonId}/vocab`,
            { foreignWord: question, nativeWord: answer }
          );
        });
      };
      reader.readAsText(files[0]);
    },
  },
};
</script>

<style scoped>
.import-container {
  position: relative;
  left: 50px;
  bottom: 50px;
}
</style>
