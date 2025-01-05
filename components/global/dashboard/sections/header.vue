<template lang="pug">
  header
    .links.flex.gap-4.items-center
      .link(v-for="link in links", :key="link.path")
        NuxtLink(:to="link.path") {{link.name}}
    .hero-save.save-button(v-if="route.name == 'sections' && (dashboardStore.image_before_file != '' || dashboardStore.image_after_file != '' || dashboardStore.backgroundLink != '')", @click="dashboardStore.updateHero()")
      span(v-html="dashboardStore.save_button_content")
    .save-projects.save-button(@click="dashboardStore.updateSelection", v-if="dashboardStore.checkedProjectsList.length > 0 || dashboardStore.unCheckedProjectsList.length > 0")
      span(v-html="dashboardStore.projects_save_button")
    .save-projects.save-button(@click="dashboardStore.updateAbout", v-if="dashboardStore.about_background != '' || dashboardStore.about_text_changed || dashboardStore.about_image_file !=''")
      span(v-html="dashboardStore.about_save_button")
</template>

<script setup>
const route = useRoute();
const dashboardStore = useMyDashboardStore();
onMounted(() => {
  console.log(dashboardStore.backgroundLink != "");
});
const links = [
  {
    name: "Hero",
    path: "/sections",
  },
  {
    name: "Projects list",
    path: "/sections/projects",
  },
  {
    name: "About",
    path: "/sections/about",
  },
];
</script>

<style scoped lang="scss">
header {
  padding-top: calc(var(--dashboard-header-height) + 20px);
  padding-left: calc(var(--sidebar-width) + 30px);
  padding-right: 20px;
  background-color: white;
  color: black;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .links {
    background-color: rgba(0, 0, 0, 0.137);
    width: fit-content;
    border-radius: 2px;
    overflow: hidden;
    border: 1px solid rgba(0, 0, 0, 0.144);
    padding: 1px;
    .link {
      border-radius: 2px;
      overflow: hidden;
      a {
        padding: 10px 20px;
        display: flex;
        font-weight: 500;
        color: rgb(70, 70, 70);
        transition: 0.2s;
        &.router-link-active {
          background-color: white;
        }
      }
    }
  }
  .save-button {
    padding: 5px 20px;
    border-radius: 4px;
    background: rgb(45, 49, 51);
    color: white;
    cursor: pointer;
    user-select: none;
  }
}
</style>
