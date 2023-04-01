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
        v-for="(lesson, index) in lessons"
        v-bind:key="lesson.id"
        :lesson-id="lesson.id"
        :title="lesson.name"
        :placement="(lessons.length + 0.1) * 0.1 - index * 0.1"
        :parentX="xPosition()"
        :parentY="yPosition()"
        :progress="lesson.progress"
        :active="active"
        @retracted="handleMenuClose"
      />
    </div>
  </div>
</template>

<script>
import LessonTile from "@/components/MenuItems/LessonTile.vue";
import { gsap } from "gsap/dist/gsap";
import { route } from "@/helpers/api-routes";
import { usePresentationStore } from "@/stores/presentation";
import { useUserStore } from "@/stores/user";

export default {
  name: "LessonGroup",
  components: { LessonTile },

  setup() {
    const presentationStore = usePresentationStore();
    const userStore = useUserStore();

    return {
      presentationStore,
      userStore,
    };
  },

  props: {
    mainTitle: String,
    sectionId: Number,
  },

  data() {
    return {
      expanded: false,
      active: false,
      lessonsData: [],
    };
  },

  computed: {
    lessons() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return this.lessonsData.sort((first, second) => {
        if (first.id < second.id) {
          return -1;
        } else if (first.id === second.id) {
          return 0;
        }
        return 1;
      });
    },

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
        y: -95,
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
        y: 95,
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
      this.presentationStore.setExpansionState(this.id, newState);
    },

    xPosition() {
      return this.$refs["group-container"].getBoundingClientRect().x;
    },

    yPosition() {
      return this.$refs["group-container"].getBoundingClientRect().y;
    },
  },

  mounted() {
    if (this.presentationStore.getExpansionState(this.id)) {
      const state = this.presentationStore.getExpansionState(this.id);
      if (state) {
        this.minimise();
      }
    }

    route("get", `section/${this.sectionId}/lesson`).then((result) => {
      result.forEach(async (lesson) => {
        const vocabIds = lesson.vocabulary.map((vocab) => {
          return vocab.id;
        });

        route(
          "get",
          `${
            this.userStore.getUserUuid
          }/progress/grouped?wordIds=${vocabIds.join(",")}`
        ).then((progressData) => {
          let progress = 0;
          if (progressData.length > 0) {
            progress =
              progressData
                .map((progressInfo) => {
                  return progressInfo.progress;
                })
                .reduce((sum, value) => {
                  return sum + value;
                }) / progressData.length;
          }
          lesson["progress"] = progress;
          this.lessonsData.push(lesson);
        });
      });
      console.log(this.lessonsData);
    });
  },
};
</script>

<style scoped>
.lesson-group-container {
  width: 330px;
  height: 350px;
  display: flex;
  align-items: start;
  justify-content: center;
}

.maximised-group {
  width: 300px;
  height: 300px;
  background-color: #9dcfcf;
  z-index: 10;
  display: flex;
  flex-direction: column;
  text-align: center;
  line-height: 70px;
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
  position: relative;
  text-align: center;
  line-height: 25px;
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
  padding-left: 20px;
  padding-right: 20px;
  line-height: 49px;
  color: white;
  font-size: 49px;
  vertical-align: center;
}

.group-title-min {
  color: white;
  font-size: 18px;
  line-height: 18px;
  vertical-align: center;
}
</style>
