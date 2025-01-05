<template lang="pug">
  header.w-full.flex.items-center.global_header
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
onMounted(() => {
  const tl = useGsap.timeline();
  tl.to(".global_header .logo", {
    y: 0,
    opacity: 1,
    duration: 0,
  });
  tl.to(".global_header .links .link", {
    y: 0,
    opacity: 1,
    stagger: 0.1,
    duration: 0,
  });
});
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
  overflow: hidden;
  .container {
    .logo {
      transform: translateY(100px);
      transition: 1s;
      opacity: 0;
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
        transform: translateY(100px);
        transition: 1s;
        opacity: 0;
        a {
          font-size: 23px;
          font-weight: bold;
          transition: 0.2s;

          @media (max-width: 767px) {
            font-size: 20px;
          }

          @media (hover: hover) {
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
