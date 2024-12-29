<template lang="pug">
  .hero
    .bg
      img(src="/home/about/bg.png")
    .container
      .title
        h1 Work
</template>

<script lang="ts" setup>

</script>

<style scoped lang="scss">
.hero {
  width: 100%;
  height: 100vh;
  padding-top: var(--header-height);
  position: relative;

  .bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .container {
    height: 100%;
    display: flex;
    align-items: center;
    font-size: 120px;

    @media (max-width: 650px) {
      justify-content: center;
      text-align: center;
    }
  }
}
</style>