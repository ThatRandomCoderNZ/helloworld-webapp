<template>
  <div class="dashboard-container">
    <div class="dashboard-header">
      <LogoImage />
    </div>
    <div class="main-dashboard-container">
      <div class="language-selector">
        <v-select
          class="selector"
          label="Language"
          outlined
          :items="selectableLanguages"
          v-model="currentValue"
          no-data-text="No Languages"
        ></v-select>
      </div>
      <lesson-section
        name="Intro Vocab 1"
        :lesson-id="global.currentLanguageId"
      ></lesson-section>
    </div>
  </div>
</template>

<script>
import LogoImage from "@/components/LogoImage.vue";
import LessonSection from "@/components/MenuItems/LessonSection.vue";
import { route } from "@/helpers/api-routes";
import { useGlobalStore } from "@/stores/global";

export default {
  setup() {
    const global = useGlobalStore();

    return {
      global,
    };
  },

  name: "DashboardAlternative",
  components: { LessonSection, LogoImage },

  data() {
    return {
      currentValue: {},
      languageData: [],
    };
  },

  computed: {
    selectableLanguages() {
      return this.languageData.map((language) => language.name);
    },
  },

  methods: {
    getLanguageNameForId(id) {
      return this.languageData.find((language) => language.id === id).name;
    },
  },

  watch: {
    currentValue(newLanguage) {
      const selectedLanguage = this.languageData.find(
        (language) => language.name === newLanguage
      );
      this.global.setLanguageId(selectedLanguage.id);
    },
  },

  mounted() {
    route("GET", "language/plain").then((result) => {
      this.languageData = result;
      if (!this.global.currentLanguageId) {
        this.currentValue = this.selectableLanguages[0];
      } else {
        this.currentValue = this.getLanguageNameForId(
          this.global.currentLanguageId
        );
      }
    });
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

.selector {
  width: 10vw;
  margin-left: 100px;
  margin-top: 30px;
}
</style>
