<template>
  <main>
    <div class="container">
      <div id="vimeo-player"></div>
      <button @click="play">click to play</button>
    </div>
  </main>
</template>

<script setup>
import Player from '@vimeo/player';
// تحديد معرّف الفيديو
const videoId = 1041094458;

// تهيئة المشغل
const options = {
  id: videoId,
  width: 640,
  loop: true,
  autoplay: true,
};

onMounted(() => {
  const player = new Player('vimeo-player', options);
})
</script>