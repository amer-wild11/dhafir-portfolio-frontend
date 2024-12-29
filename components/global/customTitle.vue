<template lang="pug">
  .title.flex.items-center.gap-4.w-full
    h1.relative {{props.title}}
    .line
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>

<style scoped lang="scss">
.title {
  h1 {
    padding: 20px 10px;
    display: inline-block;
    transform: translateY(-5%);
    text-transform: capitalize;
    font-weight: bold;
  }

  .line {
    flex: 1;
    background-color: white;
    height: 1px;
    border-radius: 10px;
  }
}
</style>