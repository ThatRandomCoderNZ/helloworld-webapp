<template>
  <div>
    <div v-if="!recording">
      <button
        v-if="!loadingResponse"
        class="recording-button"
        @click="startRecording"
      >
        Start Recording
      </button>
      <LoadingSpinner v-else></LoadingSpinner>
    </div>
    <div v-else>
      <button class="recording-button" @click="stopRecording">
        Stop Recording
      </button>
    </div>
  </div>
</template>

<script>
import { route } from "@/helpers/api-routes";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

export default {
  name: "AudioRecorder",
  components: { LoadingSpinner },
  data() {
    return {
      recording: false,
      audioChunks: [],
      mediaRecorder: null,
      audioContext: new AudioContext(),
      audioSource: {},
      loadingResponse: false,
      blobData: [],
    };
  },
  methods: {
    // appends an audio element to playback and download recording
    createAudioElement(blobUrl) {
      console.log("Downloading");
      const downloadEl = document.createElement("a");
      downloadEl.style = "display: block";
      downloadEl.innerHTML = "download";
      downloadEl.download = "audio.webm";
      downloadEl.href = blobUrl;
      const audioEl = document.createElement("audio");
      audioEl.controls = true;
      const sourceEl = document.createElement("source");
      sourceEl.src = blobUrl;
      sourceEl.type = "audio/webm";
      audioEl.appendChild(sourceEl);
      document.body.appendChild(audioEl);
      document.body.appendChild(downloadEl);
    },

    startRecording() {
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        this.mediaRecorder = new MediaRecorder(stream);
        console.log("Media Connected");
        this.mediaRecorder.addEventListener("dataavailable", (event) => {
          this.blobData.push(event.data);
          console.log(event.data);
          if (!this.recording) {
            this.sendAudio(this.blobData);
            this.blobData = [];
            this.mediaRecorder.stop();
            this.recording = false;
          }
        });
        this.mediaRecorder.start(1000);
        this.recording = true;
      });
    },
    stopRecording() {
      if (this.mediaRecorder) {
        this.recording = false;
        this.mediaRecorder.stop();
      }
    },

    sendAudio(data) {
      console.log(data);
      const audioBlob = new Blob(data, { type: "audio/webm" });
      this.createAudioElement(URL.createObjectURL(audioBlob));
      const formData = new FormData();
      formData.append("audio", audioBlob);
      this.loadingResponse = true;
      route("POST", "app/1/converse/2", formData, "arraybuffer").then(
        (result) => {
          const audioContext = new AudioContext();
          audioContext.decodeAudioData(result).then((decodedData) => {
            this.loadingResponse = false;
            const audioSource = new AudioBufferSourceNode(audioContext);
            audioSource.buffer = decodedData;
            audioSource.connect(audioContext.destination);
            audioSource.start(0);
            // audioSource.onended(() => {
            //   this.mediaRecorder.start();
            //   this.recording = true;
            // });
          });
        }
      );
    },
  },
};
</script>

<style>
.recording-button {
  width: 150px;
  height: 50px;
  color: white;
  background-color: #9dcfcf;
  border-radius: 20px;
  margin-bottom: 50px;
}
</style>
