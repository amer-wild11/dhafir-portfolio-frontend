<template lang="pug">
  .projects-list
    .project(v-for="(project, i) in vimeoStore.dhafir_videos.filter((p) => p.selected).sort((a, b) => a.arrange - b.arrange)", :id='`project-${project.video}`', @click="vimeoStore.setActive(project.video)", @mouseover="globalStore.ballEnter('material-symbols:play-circle-outline')", @mouseleave="globalStore.ballLeave()")
      
      .play-button
        .icon.flex.items-center.justify-center
          Icon(name="material-symbols:play-circle-outline", v-if="!project.active")
          Icon(name="material-symbols:stop-circle-outline", v-else)
      .thumbnail
        img(:src="project.thumbnail")
      .content.container
        .title-director
          span.title {{project.title}}
          span.director Director: Dhafir
        .production-year
          span.production 
          span.year 
</template>

<script setup>
import Player from "@vimeo/player";

const vimeoStore = useMyVimeoStore();
const globalStore = useMyGlobalStore();
const players = ref([]);

watch(
  () => vimeoStore.dhafir_videos,
  () => {
    nextTick(() => {
      useGsap.to(".projects-list .project", {
        y: 0,
        opacity: 1,
        duration: 0,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".projects-list",
          end: "top top",
          start: "top 30%",
        },
      });
    });
  }
);
</script>

<style scoped lang="scss">
.projects-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  .project {
    width: 100%;
    height: 550px;
    position: relative;
    display: flex;
    align-items: end;
    justify-content: center;
    cursor: pointer;
    transform: translateY(50px);
    opacity: 0;
    transition: 0.4s;
    @media (max-width: 767px) {
      height: 300px;
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
        filter: brightness(0.4);
      }
    }

    .content {
      z-index: 1;
      position: relative;
      height: 20%;
      width: 99%;
      max-width: 1500px;
      display: flex;
      justify-content: start;

      .title-director {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 5px;

        .title {
          font-size: 40px;
          font-weight: bold;
          line-height: 100%;

          @media (max-width: 767px) {
            font-size: 25px;
          }
        }

        .director {
          font-size: 20px;
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
