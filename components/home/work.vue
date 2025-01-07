<template lang="pug">
  .work-section(ref="workEl", @mouseover="showBall", @mouseleave="hideBall")
    Ball
    .container
      .title.flex.items-center.gap-4.w-full
        CustomTitle(title="work")
        NuxtLink(to="/work").ctaButton.flex.items-center.gap-2
          span view all works
          .icon.flex.items-center.justify-center
            Icon(name="ic:outline-arrow-outward")
      .projects 
        .project(v-for="(project, i) in vimeoStore.dhafir_videos.sort((a, b) => a.arrange - b.arrange).slice(0, 6)" :key="i" @click="vimeoStore.setActive(project.video)", @mouseover="mouseEnter", @mouseleave="mouseLeave")
          .content
            .loading(ref="loadingEl")
            .thumbnail
              img(:src="project.thumbnail")
            .title
              span {{project.title}}
</template>

<script setup>
const videoId = 1041094458;
const vimeoStore = useMyVimeoStore();
const globalStore = useMyGlobalStore();
const workEl = ref("");

const mouseEnter = () => {
  globalStore.ball.grow = true;
  globalStore.ball.icon = "fluent:cursor-click-24-filled";
};

const mouseLeave = () => {
  globalStore.ball.grow = false;
  globalStore.ball.icon = "";
};

const showBall = () => {
  globalStore.ball.show = true;
};

const hideBall = () => {
  globalStore.ball.show = false;
};

watch(
  () => vimeoStore.dhafir_videos,
  () => {
    if (vimeoStore.dhafir_videos.length > 0) {
      nextTick(() => {
        useGsap.to(".work-section .projects .project", {
          y: 0,
          opacity: 1,
          duration: 0,
          stagger: 0.2,
          scrollTrigger: {
            trigger: workEl.value,
            start: "top 30%",
            end: "bottom center",
          },
        });
      });
    }
  }
);
</script>

<style scoped lang="scss">
.work-section {
  overflow: hidden;
  position: relative;
  .container {
    > .title {
      @media (max-width: 600px) {
        gap: 0px;
      }

      .title {
        width: 90%;
        font-size: 30px;
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

      > .project {
        cursor: pointer;
        transform: translateY(40px);
        transition: 1s;
        opacity: 0;
        .content {
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
}
</style>
