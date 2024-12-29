<template lang="pug">
  header.w-full.flex.items-center
    div.container.flex.items-center.justify-between.w-full.py-7
      .logo
        NuxtLink(to="/")
          h1 Dhafir Ayad
          p Film Director
      ul.links.flex.items-center.gap-10
        li.link
          NuxtLink(to="/work") Work
        li.link
          NuxtLink(to="/") Get in touch
</template>

<script setup>
</script>

<style scoped lang="scss">
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--header-height);
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.479);

  .container {
    .logo {
      @media (max-width: 600px) {
        width: 100px;
      }

      h1 {
        font-size: 40px;
        line-height: 100%;
        font-weight: bold;

        @media (max-width: 767px) {
          font-size: 30px;
        }
      }

      p {
        color: lightgray;
      }
    }

    .links {
      @media (max-width: 767px) {
        gap: 20px;
      }

      .link {
        a {
          font-size: 23px;
          font-weight: bold;
          transition: .2s;

          @media (max-width: 767px) {
            font-size: 20px;
          }

          @media (hover:hover) {
            &:hover {
              color: rgba(255, 255, 255, 0.507);
            }
          }

          &.router-link-active {
            text-decoration: underline;
          }
        }
      }
    }
  }
}
</style>