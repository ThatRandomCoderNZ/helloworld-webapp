<template>
  <div class="dashboard-container">
    <div class="dashboard-header">
      <LogoImage />
      <div class="selectable-menu-item">
        <h1>言葉</h1>
      </div>
      <div class="selectable-menu-item">
        <h1>探検</h1>
      </div>
    </div>
    <div class="main-dashboard-container">
      <lesson-section name="Intro Vocab 1"></lesson-section>
    </div>
  </div>
</template>

<script>
import LogoImage from "@/components/LogoImage.vue";
import LessonSection from "@/components/MenuItems/LessonSection.vue";
import { getApi } from "@/helpers/api-routes";

export default {
  name: "DashboardAlternative",
  components: { LessonSection, LogoImage },

  mounted() {
    // fetch(resolveRoute("language/2")).then((result) => {
    //   console.log(result);
    // });

    getApi("section/14/lesson");
  },
};
</script>

<style scoped>
.dashboard-container {
  width: 100%;
}
.dashboard-header {
  width: 100%;
  height: 10vh;
  background-color: #9dcfcf;

  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}

.selectable-menu-item {
  color: white;
  font-weight: bolder;
  padding: 40px;
}

.selectable-menu-item:hover {
  color: white;
  border-bottom: 5px solid white;
  cursor: pointer;
  line-height: 1px;
}
</style>
