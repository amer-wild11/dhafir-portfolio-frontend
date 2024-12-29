<template lang="pug">
  .work-section
    .container
      .title.flex.items-center.gap-4.w-full
        CustomTitle(title="work")
        NuxtLink(to="/work").ctaButton.flex.items-center.gap-2
          span view all works
          .icon.flex.items-center.justify-center
            Icon(name="ic:outline-arrow-outward")
      .projects 
        .project(v-for="(project, i) in vimeoStore.dhafir_videos" :key="i" @click="vimeoStore.setActive(project.uri)")
          .loading(ref="loadingEl")
          .thumbnail
            img(:src="project.pictures.base_link")
          .title
            span {{project.name}}
</template>

<script setup>
const videoId = 1041094458
const vimeoStore = useMyVimeoStore()
const globalStore = useMyGlobalStore()
</script>

<style scoped lang="scss">
.work-section {
  .container {
    >.title {
      @media (max-width: 600px) {
        flex-direction: column;
        gap: 0px;
        align-items: center;
        justify-content: start;
      }

      .title {
        width: 90%;
        font-size: 40px;
      }

      .ctaButton {
        width: 250px;
        cursor: pointer;
        user-select: none;

        @media (max-width: 600px) {
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        span {
          word-break: keep-all;
          font-size: 25px;
          text-transform: capitalize;

        }

        .icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          transform: translateY(-5px);

          .iconify {
            font-size: 30px;
          }
        }
      }
    }

    .projects {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
      gap: 15px;
      margin-top: 20px;

      @media (max-width: 600px) {
        grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
      }

      >.project {
        cursor: pointer;

        .thumbnail {
          width: 100%;
          height: 250px;
          margin-bottom: 1rem;
          position: relative;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 10px;
          }
        }

        .title {
          font-size: 16px;
          font-weight: bold;
        }
      }
    }
  }
}
</style>