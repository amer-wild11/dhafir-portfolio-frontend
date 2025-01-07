<template lang="pug">
  header.w-full.flex.items-center.global_header
    div.container.flex.items-center.justify-between.w-full.py-7
      .logo
        NuxtLink(to="/")
          h1 Dhafir Ayad
          p Film Director
      ul.links.flex.items-center.gap-10
        li.link.work
          NuxtLink(to="/work").work Work
        li.link.get-in-touch(@click="scrollToAbout")
          NuxtLink(to="/")(ref="getInTouchLink") Get in touch
</template>

<script setup>
const getInTouchLink = ref("");

const scrollToAbout = () => {
  useGsap.to(window, {
    scrollTo: "#about-section",
    duration: 1,
  });
};

onMounted(() => {
  useGsap.to(".global_header .links .get-in-touch", {
    duration: 0,
    scrollTrigger: {
      marker: true,
      trigger: "#about-section",
      toggleActions: "play none none reverse",
    },
  });
  window.addEventListener("scroll", function () {
    // Calculate the scroll position
    const scrollPosition = window.scrollY + window.innerHeight;

    // Get the total height of the document
    const documentHeight = document.documentElement.scrollHeight - 500;

    // Check if the user has scrolled to the bottom

    if (scrollPosition >= documentHeight) {
      useGsap.to(".global_header .links .get-in-touch", {
        textDecoration: "underline",
      });
    } else {
      useGsap.to(".global_header .links .get-in-touch", {
        textDecoration: "none",
      });
    }
  });
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
        min-width: 140px;
      }

      h1 {
        font-size: 40px;
        line-height: 100%;
        font-weight: bold;

        @media (max-width: 767px) {
          font-size: 26px;
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

          &.work.router-link-active {
            text-decoration: underline;
          }
        }
      }
    }
  }
}
</style>
