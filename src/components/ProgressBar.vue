<template>
  <div class="lesson-progress-bar">
    <div class="progress-fill" :style="'width: ' + progressFill + '%'"></div>
    <div class="mastery-fill" :style="'width: calc(' + masteryFill + '% + ' + this.additionalSpacing + ')'"></div>
  </div>
</template>

<script>
export default {
  name: "ProgressBar",

  props: {
    progressFill: Number,
    masteryFill: Number,
  },

  computed: {
    additionalSpacing(){
      return this.masteryFill > 0 ? '2px':'0px';
    }
  }
}

</script>

<style scoped>

.lesson-progress-bar {
  width: 80px;
  height: 5px;
  border: 1px solid #9dcfcf;
  border-radius: 20px;
  top: -2px;
}

.progress-fill {
  height: 100%;
  border-radius: 20px;
  background-color: #9dcfcf;
}

.mastery-fill {
  position: relative;
  top: -4px;
  height: 5px;
  left: -1px;
  border-radius: 20px;
  background-color: #cf9dcf;
}

</style>