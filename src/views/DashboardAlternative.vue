<template>
  <div class="dashboard-container">
    <app-header></app-header>
    <div class="main-dashboard-container">
      <div class="slider-container">
        <!-- Rounded switch -->
        <label class="switch">
          <input type="checkbox" v-model="this.switch" />
          <span :class="sliderClasses"></span>
        </label>
      </div>
      <lesson-section
        name="Basic Sentence Building Blocks"
        :lesson-id="global.currentLanguageId"
        :filter-active="this.switch"
        :difficulty="1"
      ></lesson-section>
      <lesson-section
        name="Introduction to Verbs"
        :lesson-id="global.currentLanguageId"
        :filter-active="this.switch"
        :difficulty="2"
      ></lesson-section>
    </div>
  </div>
</template>

<script>
import LessonSection from "@/components/MenuItems/LessonSection.vue";
import { useGlobalStore } from "@/stores/global";
import AppHeader from "@/components/AppHeader.vue";

export default {
  setup() {
    const global = useGlobalStore();

    return {
      global,
    };
  },

  name: "DashboardAlternative",
  components: { AppHeader, LessonSection },

  data() {
    return {
      switch: false,
    };
  },

  computed: {
    sliderClasses() {
      return "slider round " + this.global.currentLanguage.toLowerCase();
    },
  },
};
</script>

<style scoped>
.dashboard-container {
  width: 100%;
}

.main-dashboard-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.slider-container {
  width: 100px;
  margin-top: 40px;
  margin-left: 10px;
  position: relative;
}

/* SLIDER STYLING */

/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /*background-image: url("../assets/english-countryside.svg");*/
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 34px;
  width: 34px;
  background-image: url("../assets/Asset 1.svg");
  object-fit: contain;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider.spanish {
  /*background-image: url("../assets/spanish-countryside.svg");*/
}

input:checked + .slider:before {
  -webkit-transform: translateX(28px);
  -ms-transform: translateX(28px);
  transform: translateX(28px);
}

input:checked + .slider.spanish:before {
  background-image: url("../assets/spanish-flag.svg");
}

input:checked + .slider.italian:before {
  background-image: url("../assets/italian-flag.svg");
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
