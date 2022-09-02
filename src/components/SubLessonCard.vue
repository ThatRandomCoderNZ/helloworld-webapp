<script lang="ts">
import gsap from "gsap";
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    row: {
      type: Number,
      default: 5,
    },
    column: {
      type: Number,
      default: 20,
    },
    title: String,
  },

  methods: {
    clicked() {
      gsap.to("#car", {
        x: 10 * this.column,
        y: 5 * this.row,
        duration: 1,
      });
    },
  },

  mounted() {
    console.log(this.row);
  },
});
</script>

<template>
  <div id="car" class="card">
    <h1 class="title">
      {{ title }}
    </h1>
    <div></div>
  </div>
</template>

<style>


</style>
