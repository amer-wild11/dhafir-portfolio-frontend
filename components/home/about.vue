<template lang="pug">
  .about#about-section
    .bg
      img(src="/home/about/bg.png", alt="alt")
    .container
      CustomTitle(title="about")
      .content
        .text
          p {{sectionsStore.about.text}}
          .signature
            p Dhafir Ayad.
        .image
          img(:src="sectionsStore.about.image")
      HomeFooter
</template>

<script setup>
const sectionsStore = useMySectionsStore();

onMounted(() => {
  const tl = useGsap.timeline();
  tl.to(".about .content .text", {
    y: 0,
    opacity: 1,
    scrollTrigger: {
      trigger: ".about .content .text",
      start: "top center",
    },
  });
});
</script>

<style scoped lang="scss">
.about {
  position: relative;
  padding-bottom: 10px;

  .bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .container {
    .title {
      font-size: 30px;
      margin-bottom: 10px;
    }

    .content {
      display: flex;
      justify-content: space-between;
      gap: 35px;

      @media (max-width: 1024px) {
        flex-direction: column;

        .text {
          width: 100% !important;
          p {
            font-size: 17px !important;
          }
        }

        .image {
          width: 90%;
          margin: auto;
        }
      }

      .text {
        width: 100%;
        transition: 1s;
        .signature {
          margin-top: 20px;

          p {
            font-weight: 400;
            font-family: "Euphoria Script", sans-serif !important;
            font-size: 40px;
          }
        }

        p {
          font-size: 25px;
          font-weight: 700;
        }
      }

      .image {
        float: right;
        @media (max-width: 1024px) {
          display: flex;
          justify-content: center;
          width: 100%;
        }

        img {
          width: 800px;
          @media (max-width: 1024px) {
            width: 70%;
          }
        }
      }
    }
  }
}
</style>
