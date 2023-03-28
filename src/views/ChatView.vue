<template>
  <div class="main-chat-container">
    <AudioRecorder />
    <div class="chat-container">
      <div class="chat-header">
        <div class="chat-title">Diego</div>
      </div>
      <div class="chat-screen" ref="chatScreen">
        <div
          v-for="chatItem in chatData"
          :key="chatItem.id"
          :class="
            'chat-bubble ' +
            (chatItem.sender === 'user' ? 'right-side' : 'left-side')
          "
        >
          {{ chatItem.message }}
        </div>
        <div v-if="chatBotTyping" class="loading-container left-loading">
          <div class="dot-flashing"></div>
        </div>
        <div v-if="userTyping" class="loading-container right-loading">
          <div class="dot-flashing"></div>
        </div>
      </div>
      <textarea class="chat-input" v-model="chatText" @keyup="handleSend" />
    </div>
  </div>
</template>

<script>
import { resolveRoute, route } from "@/helpers/api-routes";
import AudioRecorder from "@/components/AudioRecorder.vue";
import { useGlobalStore } from "@/stores/global";

export default {
  name: "ChatView",
  components: { AudioRecorder },

  setup() {
    const global = useGlobalStore();

    return {
      global,
    };
  },

  data() {
    return {
      chatText: "",
      chatData: [],
      uniqueId: 0,
      chatBotTyping: false,
      audioContext: new AudioContext(),
      audioSource: {},
    };
  },

  methods: {
    playAudio() {
      this.audioSource.start(0);
    },

    handleSend(event) {
      this.$refs.chatScreen.scrollTop = this.$refs.chatScreen.scrollHeight;
      this.uniqueId++;
      if (event.key === "Enter") {
        const messageText = this.chatText.trim();
        this.chatData.push({
          id: this.uniqueId,
          sender: "user",
          message: messageText,
        });

        this.chatText = "";

        new Promise((resolve) => setTimeout(resolve, 1000)).then(
          () => (this.chatBotTyping = true)
        );

        route("POST", "mood", { prompt: messageText }).then((result) => {
          console.log("Mood: " + result);
        });

        route("POST", "humour", { prompt: messageText }).then((result) => {
          console.log("Humour: " + result);
        });

        route("POST", "grammar-notes", { prompt: messageText }).then(
          (result) => {
            console.log("Notes: " + result);
          }
        );

        route("POST", `1/aitest/${this.global.currentLanguageId}`, {
          prompt: messageText,
        }).then((result) => {
          this.uniqueId++;
          this.chatData.push({
            id: this.uniqueId,
            sender: "chat-bot",
            message: result,
          });
          this.chatBotTyping = false;
        });
      }
    },
  },

  computed: {
    userTyping() {
      return this.chatText.length > 0;
    },
  },
  // Record something
  // Send to API
  // Convert to Text
  // Send Text to OpenAI for response
  // Convert Response to Speech
  // Feed speech back to front end

  mounted() {
    route("DELETE", "1/aitest");

    route(
      "POST",
      `test-speech/${
        this.global.currentLanguageId ? this.global.currentLanguageId : 2
      }`,
      {
        prompt: "Hola y bienvenidos",
      },
      "arraybuffer"
    ).then((result) => {
      console.log(result);

      // const audioBlob = new Blob([result], { type: "audio/wav" });
      // const url = URL.createObjectURL(audioBlob);
      // this.$refs["src-target"].src = url;
      //
      // this.$refs["audio-button"].addEventListener("click", (event) => {
      //   this.$refs["audio-controls"].play();
      // });

      this.audioContext.decodeAudioData(result).then((decodedData) => {
        this.audioSource = new AudioBufferSourceNode(this.audioContext);
        this.audioSource.buffer = decodedData;
        this.audioSource.connect(this.audioContext.destination);
        this.audioSource.start(0);
      });
    });
  },
};
</script>

<style scoped>
.loading-container {
  margin-left: 30px;
  margin-top: 20px;
  width: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  background-color: #f2f9f9;
  border-radius: 20px;
  flex-shrink: 0;
}

.left-loading {
  align-self: flex-start;
}

.right-loading {
  align-self: flex-end;
  margin-right: 30px;
}

.main-chat-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.chat-header {
  width: 100%;
  height: 15%;
  background-color: #9dcfcf;
  border-top-left-radius: 26px;
  border-top-right-radius: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.chat-title {
  color: white;
  font-size: 30px;
}

.chat-container {
  width: 400px;
  height: 700px;
  border: 4px solid #9dcfcf;
  display: flex;
  flex-direction: column;
  border-radius: 30px;
}

.chat-screen {
  width: 100%;
  min-height: 65%;
  height: 65%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding-bottom: 20px;
}

.chat-bubble {
  margin: 10px 10px 0 10px;
  padding: 10px 20px;
  min-width: 100px;
  max-width: 250px;
  min-height: 40px;
  font-size: 14px;
  background-color: #9dcfcf;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  flex-shrink: 0;
}

.left-side {
  align-self: flex-start;
}

.right-side {
  align-self: flex-end;
  background-color: #499494;
}

.chat-input {
  width: 80%;
  height: 14%;
  margin: 3% auto auto;
  border-radius: 20px;
  border: 1px solid #9dcfcf;
  padding: 10px 20px 5px 20px;
  text-align: start;
  resize: none;
  justify-self: flex-end;
}

.chat-input:focus {
  border: 1px solid #9dcfcf;
}

.dot-flashing {
  position: relative;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #9dcfcf;
  color: #9dcfcf;
  animation: dot-flashing 1s infinite linear alternate;
  animation-delay: 0.5s;
}
.dot-flashing::before,
.dot-flashing::after {
  content: "";
  display: inline-block;
  position: absolute;
  top: 0;
}
.dot-flashing::before {
  left: -15px;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #9dcfcf;
  color: #9dcfcf;
  animation: dot-flashing 1s infinite alternate;
  animation-delay: 0s;
}
.dot-flashing::after {
  left: 15px;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #9dcfcf;
  color: #9dcfcf;
  animation: dot-flashing 1s infinite alternate;
  animation-delay: 1s;
}

@keyframes dot-flashing {
  0% {
    background-color: #9dcfcf;
  }
  50%,
  100% {
    background-color: rgba(157, 207, 207, 0.2);
  }
}
</style>
