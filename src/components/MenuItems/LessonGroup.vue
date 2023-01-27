<template>
  <div ref="group-container" class="lesson-group-container">
    <div v-if="!expanded" :id="id" class="maximised-group" @click="minimise">
      <h6 class="group-title">{{ mainTitle }}</h6>
    </div>
    <div v-else class="expanded-group-container">
      <div class="minimised-group" :id="minimisedId" @click="maximise">
        <h6 class="group-title-min">{{ mainTitle }}</h6>
      </div>
      <lesson-tile
        v-for="i in [1, 2, 3, 4, 5, 6, 7, 8]"
        v-bind:key="i"
        :placement="i"
        :parentX="xPosition()"
        :parentY="yPosition()"
        :active="active"
        @retracted="handleMenuClose"
      />
    </div>
  </div>
</template>

<script>
import LessonTile from "@/components/MenuItems/LessonTile.vue";
import { gsap } from "gsap/dist/gsap";

export default {
  name: "LessonGroup",
  components: { LessonTile },

  props: {
    mainTitle: String,
  },

  data() {
    return {
      expanded: false,
      active: false,
    };
  },

  computed: {
    id() {
      return "group-" + this.mainTitle.split(" ").join("-");
    },

    minimisedId() {
      return "minimised-group-" + this.mainTitle.split(" ").join("-");
    },
  },

  methods: {
    minimise() {
      this.active = true;
      gsap.to("#" + this.id, {
        scale: 0.37,
        x: -115,
        y: -125,
        duration: 0.3,
        onComplete: () => {
          this.setExpansionState(true);
        },
      });
    },

    maximise() {
      this.active = false;
      gsap.to("#" + this.minimisedId, {
        scale: 2.72,
        x: 115,
        y: 125,
        boxShadow: "none",
        duration: 0.5,
        onComplete: () => {
          this.setExpansionState(false);
        },
      });
    },

    handleMenuClose() {
      this.setExpansionState(false);
    },

    setExpansionState(newState) {
      this.expanded = newState;
    },

    xPosition() {
      return this.$refs["group-container"].getBoundingClientRect().x;
    },

    yPosition() {
      return this.$refs["group-container"].getBoundingClientRect().y;
    },
  },
};
</script>

<style scoped>
.lesson-group-container {
  width: 330px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.maximised-group {
  width: 300px;
  height: 300px;
  background-color: #9dcfcf;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.maximised-group:hover {
  box-shadow: 3px 5px 5px gray;
  cursor: pointer;
}

.minimised-group {
  width: 110px;
  height: 110px;
  right: 5px;
  background-color: #9dcfcf;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 1px 2px 5px gray;
}

.minimised-group:hover {
  box-shadow: 3px 5px 5px gray;
  cursor: pointer;
}

.expanded-group-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
}

.group-title {
  color: white;
  font-size: 62px;
  vertical-align: center;
}

.group-title-min {
  color: white;
  font-size: 22px;
  vertical-align: center;
}
</style>
