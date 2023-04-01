<template>
  <div class="dashboard-header">
    <div class="dashboard-logo-container">
      <router-link to="dashboard"> <LogoImage /></router-link>
    </div>
    <div class="language-selector">
      <v-select
        :items="selectableLanguages"
        class="selector"
        v-model="currentValue"
        no-data-text="No Languages"
      ></v-select>
    </div>
    <div class="logout-container" @click="logout">
      <a>Logout</a>
    </div>
  </div>
</template>

<script>
import { useGlobalStore } from "@/stores/global";
import LogoImage from "@/components/LogoImage.vue";
import { logoutUser, route } from "@/helpers/api-routes";
import router from "@/router";
import { inject } from "vue";

export default {
  name: "AppHeader",
  components: { LogoImage },

  setup() {
    const global = useGlobalStore();
    const cookies = inject("$cookies");

    return {
      global,
      cookies,
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

    logout() {
      logoutUser(this.cookies);
      router.push({ name: "landing" });
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
  height: 75px;
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
  margin-top: 20px;
}

.selector:deep(.v-input__control .v-field .v-field__overlay) {
  padding: 0;
  background: none !important;
}

.selector:deep(.v-field--variant-filled .v-field__outline::before) {
  border-style: none;
}

.logout-container {
  cursor: pointer;
}

@media screen and (max-width: 600px) {
  .dashboard-header {
    height: 50px;
  }

  .selector {
    margin-top: 20px;
  }
}
</style>
