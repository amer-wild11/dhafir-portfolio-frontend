<template lang="pug">
  .about
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
const sectionsStore = useMySectionsStore()
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
      font-size: 40px;
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
        }

        .image {
          width: 90%;
          margin: auto;
        }
      }

      .text {
        width: 60%;

        .signature {
          margin-top: 20px;

          p {
            font-weight: 400;
            font-family: 'Euphoria Script', sans-serif !important;
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

        img {
          width: 100%;
        }
      }
    }
  }
}
</style>