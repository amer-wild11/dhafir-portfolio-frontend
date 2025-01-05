<template>
  <div class="dashboard">
    <h1 style="font-size: 30px">Social links</h1>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "sections",
});
</script>

<style scoped lang="scss">
.dashboard {
  width: 100%;
  min-height: calc(100dvh - 168px);
  background: white;
  color: black;
  padding: 10px 10px 10px calc(var(--sidebar-width) + 30px);
}
</style>
