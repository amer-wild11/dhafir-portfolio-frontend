<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
const vimeoStore = useMyVimeoStore();
const sectionsStore = useMySectionsStore();
onMounted(() => {
  vimeoStore.getVideos();
  sectionsStore.getHeroSection();
  sectionsStore.getAboutSection();
});

watch(
  () => vimeoStore.videoPopup,
  (newVal, oldVal) => {
    if (newVal) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "auto";
    }
  }
);
</script>

<style lang="scss">
html {
  scrollbar-gutter: stable;
}
</style>
