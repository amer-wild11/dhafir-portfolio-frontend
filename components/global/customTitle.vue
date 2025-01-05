<template lang="pug">
  .title.flex.items-center.gap-4.w-full(ref="title").custom_title
    h1.relative(ref='titleContent').custom_title_content {{props.title}}
    .line(ref="titleLine").custom_title_line
</template>

<script setup>
const title = ref("");
const titleLine = ref("");
const titleContent = ref("");
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});

onMounted(() => {
  const tl = useGsap.timeline();
  tl.to(".custom_title_content", {
    x: 0,
    y: 0,
    opacity: 1,
    scrollTrigger: {
      trigger: ".custom_title",
      scrub: 1,
    },
  });
  tl.to(".custom_title_line", {
    width: "100%",
    scrollTrigger: {
      trigger: ".custom_title",
      scrub: 1,
    },
  });
});
</script>

<style scoped lang="scss">
.title {
  h1 {
    padding: 20px 10px;
    display: inline-block;
    transform: translateY(-5%) translateX(-60px);
    opacity: 0;
    text-transform: capitalize;
    font-weight: bold;
  }

  .line {
    width: 0%;
    background-color: white;
    height: 1px;
    border-radius: 10px;
  }
}
</style>
