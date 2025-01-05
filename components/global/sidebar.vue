<template lang="pug">
  aside
    ul.links 
      li.link(v-for="link in links" :key="link.icon")
        NuxtLink(:to="link.path")
          .icon.flex.items-center.justify-center
            Icon(:name="link.icon")
          span {{link.name}}
</template>

<script setup>
const links = [
  {
    name: "projects",
    path: "/dashboard",
    icon: "fluent:tasks-app-28-regular",
  },
  {
    name: "sections",
    path: "/sections",
    icon: "fluent:notebook-20-regular",
  },
];
</script>

<style scoped lang="scss">
aside {
  position: fixed;
  top: calc(var(--dashboard-header-height) + 20px);
  left: 10px;
  width: var(--sidebar-width);
  bottom: 10px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.199);
  color: black;
  .links {
    display: flex;
    flex-direction: column;
    gap: 10px;
    .link {
      width: 100%;
      a {
        padding: 10px 10px;
        border-radius: 10px;
        width: 100%;
        display: flex;
        align-items: center;
        gap: 10px;
        border: 2px solid transparent;
        transition: 0.2s;
        &.router-link-active {
          border-color: rgb(137, 220, 248);
          background-color: rgb(197, 238, 252);
        }
        span {
          font-size: 18px;
          font-weight: 500;
        }
        .icon {
          .iconify {
            font-size: 30px;
          }
        }
      }
    }
  }
}
</style>
