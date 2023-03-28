<template>
  <div class="dashboard-header">
    <div class="dashboard-logo-container">
      <LogoImage />
    </div>
    <div class="language-selector">
      <v-select
        :items="selectableLanguages"
        class="selector"
        v-model="currentValue"
        no-data-text="No Languages"
      ></v-select>
    </div>
  </div>
</template>

<script>
import { useGlobalStore } from "@/stores/global";
import LogoImage from "@/components/LogoImage.vue";
import { route } from "@/helpers/api-routes";

export default {
  name: "AppHeader",
  components: { LogoImage },

  setup() {
    const global = useGlobalStore();

    return {
      global,
    };
  },

  data() {
    return {
      currentValue: "",
      languageData: [],
      switch: false,
    };
  },

  computed: {
    selectableLanguages() {
      return this.languageData.map((language) => language.name);
    },

    sliderClasses() {
      return "slider round " + this.global.currentLanguage.toLowerCase();
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
      this.global.setLanguage(newLanguage);
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
.dashboard-header {
  width: 100%;
  height: 10vh;
  padding-left: 4vw;
  padding-right: 8vw;
  box-shadow: 0 -5px 20px #d9d9d9;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.selectable-menu-item {
  color: white;
  font-weight: bolder;
  padding: 40px;
}

.dashboard-logo-container {
  margin-top: 1vh;
}

.selectable-menu-item:hover {
  color: white;
  border-bottom: 5px solid white;
  cursor: pointer;
  line-height: 1px;
}

.selector {
  width: 150px;
  margin-left: 100px;
  margin-top: 30px;
}

.selector:deep(.v-input__control .v-field .v-field__overlay) {
  background: none !important;
}
</style>
