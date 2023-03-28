<template>
  <div
    v-show="loading"
    class="lds-ring"
    :style="{ width: `${size}px`, height: `${size}px` }"
  >
    <div v-bind:style="[spinnerStyle, animDiv1]"></div>
    <div v-bind:style="[spinnerStyle, animDiv2]"></div>
    <div v-bind:style="[spinnerStyle, animDiv3]"></div>
    <div v-bind:style="[spinnerStyle]"></div>
  </div>
</template>

<script>
export default {
  name: "LoadingSpinner",
  props: {
    loading: {
      type: Boolean,
      default: true,
    },
    size: {
      type: Number,
      default: 80,
    },
    color: {
      type: String,
      default: "#9dcfcf",
    },
    duration: {
      type: String,
      default: "1.2s",
    },
  },
  data() {
    return {
      spinnerStyle: {
        borderWidth: `${this.size * 0.1}px`,
        borderColor: `${this.color} transparent transparent transparent`,
        animationDuration: this.duration,
      },
    };
  },

  methods: {
    calcPropertyValue(propName, originalValue, modificator) {
      const computedStyle = {};
      const timeQuantityOuter = originalValue.match(/^\d*\.?\d+/)[0];
      const timeUnit = originalValue.match(/s|(ms)$/)[0];
      const timeQuantityInner =
        Math.round(timeQuantityOuter * 1000 * modificator) / 1000;

      computedStyle[propName] = timeQuantityInner + timeUnit;
      return computedStyle;
    },
  },

  computed: {
    animDiv1() {
      return this.calcPropertyValue("animationDelay", this.duration, -0.375);
    },
    animDiv2() {
      return this.calcPropertyValue("animationDelay", this.duration, -0.25);
    },
    animDiv3() {
      return this.calcPropertyValue("animationDelay", this.duration, -0.125);
    },
  },
};
</script>

<style scoped>
.lds-ring {
  display: inline-block;
  position: relative;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  /* ratio: calc(64px / 80px) */
  width: 80%;
  height: 80%;
  /* ratio: calc(8px / 80px) */
  margin: 10%;
  border: 8px solid #fff;
  border-radius: 50%;
  border-color: #fff transparent transparent transparent;
  animation-name: lds-ring;
  animation-timing-function: cubic-bezier(0.5, 0, 0.5, 1);
  animation-iteration-count: infinite;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
