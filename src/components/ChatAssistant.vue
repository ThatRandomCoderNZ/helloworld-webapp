<template>
<div id="chat-assistant" class="chat-assistant" >
  <div class="chat-header" @click="handleReaderState">
    <h4 class="chat-title">
      Ask Tanata
    </h4>
  </div>
  <div class="chat-body">
    <div class="chat-subsection-container">
      <div :class="'subheader validity-title ' + validSelected" @click="setValidMode(true)">
        <h4>Can I say?</h4>
      </div>
      <div :class="'subheader exploration-title ' + exploreSelected" @click="setValidMode(false)">
        <h4>How do I say?</h4>
      </div>
    </div>

    <div class="messages-container">
      <h5>{{resultText}}</h5>
    </div>

    <div class="input-container">
      <v-textarea v-model="userMessage" @keydown.enter.prevent="submitMessage"></v-textarea>
    </div>

  </div>
</div>
</template>

<script>


import {gsap} from "gsap/dist/gsap";
import {result} from "lodash-es";

export default {
  name: "ChatAssistant",

  data() {
    return {
      showing: false,
      validityMode: true,
      userMessage: "",
      resultText: "",
    };
  },

  computed: {
    validSelected() {
      return this.validityMode ? "selected" : "";
    },

    exploreSelected() {
      return !this.validityMode ? "selected" : "";
    },
  },

  methods: {
    result,
    submitMessage() {
      this.resultText = this.userMessage;
      this.userMessage = "";
    },

    setValidMode(state) {
      this.validityMode = state;
    },

    handleReaderState() {
      this.showing ? this.closeReader() : this.openReader();
    },

    openReader() {
      this.showing = true;
      gsap.to("#chat-assistant", {
        y: -749,
        duration: 0.3,
      });
    },

    closeReader() {
      this.showing = false;
      gsap.to("#chat-assistant", {
        y: 0,
        duration: 0.3,
      });
    },
  },

}
</script>

<style scoped>

.messages-container {
  height: 80%;
  width: 100%;
}

.input-container {
  width: 100%;
  height: 20%;
  border-top: 2px solid #9dcfcf;
}

.chat-subsection-container {
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}

.subheader {
  cursor: pointer;
  background-color: #9dcfcf;
  color: white;
  display: flex;
  justify-content: center;
  height: 40px;
  align-items: center;
}


.selected {

  border-bottom: 6px inset #7bbebe;
}

.validity-title {
  width: 50%;
}

.exploration-title {
  width: 50%;
}

.chat-title {
  color: white;
  font-size: 22px;
}

.chat-body {
  width: 100%;
  height: 100%;
  border: 2px solid #9dcfcf;
  background-color: white;
}

.chat-header {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  background-color: #9dcfcf;
}

.chat-assistant {
  border: 2px solid white;
  z-index: 1000;
  position: fixed;
  display: flex;
  flex-direction: column;
  height: 800px;
  width: 500px;
  align-items: center;
  justify-content: flex-start;
  right: 0;
  bottom: calc(-750px);
}
</style>