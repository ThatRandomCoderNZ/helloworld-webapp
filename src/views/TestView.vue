<template>
<div class="whole-page">
  <button @click="handlePlay">PLAY SOUND</button>

</div>

</template>

<script>
import { route } from "@/helpers/api-routes";

export default {
  name: "TestView",

  methods: {
    handlePlay() {
      route(
        "POST",
        `test-speech/2`,
        {
          prompt: "Hola todos",
        },
        "arraybuffer"
      ).then((result) => {
        console.log("Result received. Playing audio");
        const audioContext = new AudioContext();
        audioContext.decodeAudioData(result).then((decodedData) => {
          const audioSource = new AudioBufferSourceNode(audioContext);
          audioSource.buffer = decodedData;
          audioSource.connect(audioContext.destination);
          audioSource.start(0);
        });
      });
    },
  }
}
</script>

<style scoped>

</style>