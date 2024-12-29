<template lang="pug">
  .projects-list
    .project(v-for="(project, i) in vimeoStore.dhafir_videos.slice(-3)", :id='`project-${project.uri}`', @click="vimeoStore.setActive(project.uri)")
      .bg-video
        .video(:id='`project-${project.uri}`', :data-videoId="globalStore.extractVimeoId(project.link)")
      .play-button
        .icon.flex.items-center.justify-center
          Icon(name="material-symbols:play-circle-outline", v-if="!project.active")
          Icon(name="material-symbols:stop-circle-outline", v-else)
      .thumbnail
        img(:src="project.pictures.base_link")
      .content.container
        .title-director
          span.title {{project.name}}
          span.director Director: Dhafir
        .production-year
          span.production Production: Framevision
          span.year Year: 2024
</template>

<script setup>
import Player from '@vimeo/player';

const vimeoStore = useMyVimeoStore()
const globalStore = useMyGlobalStore()
const players = ref([])

// watch(() => vimeoStore.dhafir_videos, () => {
//   nextTick(() => {
//     const projects = document.querySelectorAll('.projects-list .project .bg-video .video')
//     projects.forEach((project) => {

//       const options = {
//         autoplay: true,
//         loop: true,
//         muted: true,
//         controls: false,
//         id: project.dataset.videoid,
//         width: '100dvw',
//         trigger: 'mouseenter'
//       }

//       let player = new Player(project, options)
//       players.value.push(player)
//     })
//   })
// })

</script>

<style scoped lang="scss">
.projects-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  .project {
    width: 100%;
    height: 489px;
    position: relative;
    display: flex;
    align-items: end;
    justify-content: center;
    cursor: pointer;

    @media (max-width: 767px) {
      height: 300px;
    }

    .bg-video {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
      display: flex;
      align-items: center;
      justify-content: center;

      .video {
        width: 100%;
        height: 100%;

        iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      }
    }

    .play-button {
      font-size: 100px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      cursor: pointer;

      .icon {
        display: flex;
      }
    }

    .thumbnail {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .content {
      z-index: 1;
      position: relative;
      height: 40%;
      width: 99%;
      max-width: 1500px;
      display: flex;
      justify-content: space-between;

      .title-director {
        display: flex;
        flex-direction: column;
        gap: 5px;

        .title {
          font-size: 50px;
          font-weight: bold;
          line-height: 100%;

          @media (max-width: 767px) {
            font-size: 25px;
          }
        }

        .director {
          font-size: 25px;
          color: rgba(255, 255, 255, 0.733);
          font-weight: 300;

          @media (max-width: 767px) {
            font-size: 12px;
          }
        }
      }

      .production-year {
        align-self: end;
        margin-bottom: 30px;
        display: flex;
        flex-direction: column;
        font-size: 18px;
        color: lightgray;

        @media (max-width: 767px) {
          font-size: 13px;
        }
      }
    }
  }
}
</style>