<template lang="pug">
  .video.flex.gap-3.justify-center(ref="currentVideo",)
    .videos(style="width: 100%;max-width: 1200px;",)
      .video-container(style="width:100%")
        #current_video-wrapper(style="width: 100%;", ref="active_video")
      .title-date.flex.flex-col
        .title
          span.title {{vimeoStore.active_video.title}}
          .icon(@click="vimeoStore.closePopup")
            Icon(name="material-symbols:close-rounded")
        span.date {{ globalStore.timeAgo(vimeoStore.active_video.video_date) }}
      .profile
        a(href="https://vimeo.com/dhafir", target="_blank").flex.items-center.justify-between.gap-4.w-full
          .image
            img(src="/home/work/profile.avif")
            .name-profission
              span.name Dhafir Ayad
              span.profission film director
          .socialLinks.flex.items-center.gap-4
            .link
              .icon
              Icon(name="mdi:vimeo")
    .otherProjects 
      .project(v-for="(project, i) in vimeoStore.dhafir_videos" :key="i" :class="project.active? 'active' : ''", @click="vimeoStore.setActive(project.video)")
        .thumbnail.w-full
          img(:src="project.thumbnail")
        .title
          span {{project.title}}
</template>

<script setup>
import Player from "@vimeo/player";

const player = ref("");
const vimeoStore = useMyVimeoStore();
const globalStore = useMyGlobalStore();
const currentVideo = ref("");
const active_video = ref("");

watch(
  () => vimeoStore.videoPopup,
  (newVal, oldVal) => {
    if (newVal && currentVideo.value) {
      player.value = new Player(
        active_video.value,
        vimeoStore.active_video.vimeo_options
      );

      useGsap.to(currentVideo.value, {
        display: "flex",
        duration: 0,
      });
      setTimeout(() => {
        useGsap.to(currentVideo.value, {
          y: 0,
          opacity: 1,
          duration: 0,
        });
      }, 200);
    } else if (!newVal && currentVideo.value) {
      player.value.destroy();
      useGsap.to(currentVideo.value, {
        y: "3%",
        opacity: 0,
        duration: 0,
      });
      setTimeout(() => {
        useGsap.to(currentVideo.value, {
          display: "none",
          duration: 0,
        });
      }, 200);
    }
  }
);

watch(
  () => vimeoStore.active_video,
  (newVal, oldVal) => {
    if (JSON.stringify(oldVal) != "{}" && JSON.stringify(newVal) != "{}") {
      player.value.destroy().then(() => {
        player.value = new Player(active_video.value, newVal.vimeo_options);
      });
    }
  }
);
</script>

<style scoped lang="scss">
.video {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(15, 15, 15);
  z-index: 999;
  padding: 30px;
  overflow: auto;
  display: none;
  transform: translateY(3%);
  opacity: 0;
  transition: 0.2s;

  @media (max-width: 767px) {
    padding: 0;
    flex-direction: column;
    justify-content: start;
    align-items: start;

    .videos {
      flex: 1;
      position: unset;
      background-color: rgb(15, 15, 15);
      overflow: unset !important;
    }

    .video-container {
      border-radius: 0 !important;

      #current_video-wrapper {
        border-radius: 0 !important;
      }
    }
  }

  .videos {
    position: sticky;
    top: 0;
    left: 0;
    overflow: auto;
  }

  .video-container {
    border-radius: 20px;
    position: relative;

    #current_video-wrapper {
      overflow: hidden;
      border-radius: 20px;
    }

    &::before {
      content: "";
      width: 100%;
      height: 100%;
      position: absolute;
      top: 50%;
      left: 50%;
      background-color: rgba(40, 30, 131, 0.486);
      border-radius: 50%;
      filter: blur(100px);
      transform: translate(-50%, -50%);
    }
  }

  .title-date {
    margin-top: 30px;
    margin-left: 10px;

    @media (max-width: 767px) {
      margin-top: 15px;
    }

    .title {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-right: 10px;

      span {
        font-size: 25px;
        font-weight: bold;
      }

      .icon {
        min-width: 40px;
        min-height: 40px;
        background-color: rgba(248, 248, 248, 0.137);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        .iconify {
          font-size: 30px;
        }
      }

      @media (max-width: 767px) {
        span {
          font-size: 20px;
        }
      }
    }

    .date {
      font-size: 18px;
      color: rgba(255, 255, 255, 0.582);
    }
  }

  .profile {
    margin-top: 20px;

    @media (max-width: 767px) {
      padding: 5px;
    }

    a {
      .image {
        display: flex;
        gap: 10px;

        img {
          width: 80px;
          height: 80px;
          object-fit: cover;
          border-radius: 50%;
          border: 2px solid rgba(211, 211, 211, 0.356);

          @media (max-width: 767px) {
            width: 60px;
            height: 60px;
          }
        }

        .name-profission {
          display: flex;
          flex-direction: column;
          padding-top: 10px;

          .name {
            font-size: 25px;
            line-height: 100%;

            @media (max-width: 767px) {
              font-size: 20px;
            }
          }

          .profission {
            font-size: 16px;
            font-weight: 400;
            text-transform: capitalize;
            color: rgba(255, 255, 255, 0.438);

            @media (max-width: 767px) {
              font-size: 15px;
            }
          }
        }
      }

      .socialLinks {
        .link {
          background-color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          color: black;
          border-radius: 5px;
          cursor: pointer;
          padding: 5px 20px;
          font-size: 30px;

          @media (max-width: 767px) {
            font-size: 20px;
          }

          .icon {
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
    }
  }

  .otherProjects {
    width: 50%;
    max-width: 500px;
    min-width: 300px;

    @media (max-width: 767px) {
      width: 100%;
      min-width: unset;
      max-width: unset;
    }

    .project {
      cursor: pointer;
      width: 100%;
      padding: 5px;

      &.active {
        background-color: rgba(211, 211, 211, 0.226);
        border-radius: 5px;
      }

      &:not(:last-of-type) {
        margin-bottom: 10px;
      }

      .thumbnail {
        margin-bottom: 10px;
        width: 100%;

        img {
          width: 100%;
          border-radius: 10px;
        }
      }

      .title {
        font-size: 20px;
      }
    }
  }
}
</style>
