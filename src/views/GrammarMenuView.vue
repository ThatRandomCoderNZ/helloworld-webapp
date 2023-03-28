<template>
  <div class="grammar-tool-container">
    <AppHeader></AppHeader>
    <div class="grammar-tool">
      <GrammarSection title="Beginner" difficulty-level="0"></GrammarSection>
    </div>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import GrammarSection from "@/components/MenuItems/GrammarSection.vue";

export default {
  name: "GrammarMenuView",
  components: { GrammarSection, AppHeader },
};
</script>

<style scoped>
.grammar-tool-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.grammar-tool {
  margin-top: 10vh;
  width: 80%;
  height: 200px;
}
</style>
