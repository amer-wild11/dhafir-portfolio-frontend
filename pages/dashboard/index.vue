<template lang="pug">
  .dashboard
    DashboardProjects
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "dashboard",
});
</script>

<style scoped lang="scss">
.dashboard {
  width: 100%;
  min-height: 100dvh;
  background: white;
  padding-top: calc(var(--dashboard-header-height) + 10px);
  padding-left: calc(var(--sidebar-width) + 30px);
  color: black;
}
</style>
