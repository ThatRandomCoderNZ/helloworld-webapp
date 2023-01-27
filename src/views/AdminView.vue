<template>
  <div class="admin-page-container">
    <div class="admin-header-bar">
      <LogoImage></LogoImage>
    </div>
    <div class="main-admin-container">
      <div class="content-manager-container">
        <div class="content-manager-header">
          <div class="language-selector"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mockData } from "@/helpers/mockData";
import LogoImage from "@/components/LogoImage.vue";

export default {
  name: "AdminView",
  components: { LogoImage },

  data() {
    return {
      language: mockData,
    };
  },
};
</script>

<style scoped>
.admin-header-bar {
  height: 10vh;
  width: 100%;
  background-color: #9dcfcf;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>
