<template>
  <div class="dashboard">
    <div class="projects">
      <label
        :for="`project-${project.id}`"
        class="project"
        v-for="project in vimeoStore.dhafir_videos.sort(
          (a, b) => a.arrange - b.arrange
        )"
        :key="project.id"
      >
        <div class="content">
          <div class="thumbnail">
            <img :src="project.thumbnail" alt="alt" />
          </div>
          <div class="title-date">
            <span class="title">{{ project.title }}</span>
            <span class="date">{{
              globalStore.timeAgo(project.video_date)
            }}</span>
          </div>
        </div>
        <label :for="`project-${project.id}`" class="checkbox">
          <input
            type="checkbox"
            :id="`project-${project.id}`"
            :checked="project.selected"
            @input="clicked(project, $event)"
          />
          <label
            :for="`project-${project.id}`"
            class="checked flex items-center justify-center"
          >
            <Icon name="material-symbols:check" />
          </label>
        </label>
      </label>
    </div>
  </div>
</template>

<script setup>
const globalStore = useMyGlobalStore();
const vimeoStore = useMyVimeoStore();
const dashboardStore = useMyDashboardStore();

definePageMeta({
  layout: "sections",
});

const clicked = (project, e) => {
  const checked = e.target.checked;
  if (checked) {
    dashboardStore.selectProjectList(project);
  } else if (!checked) {
    dashboardStore.unSelectProjectList(project);
  }
};
</script>

<style scoped lang="scss">
.dashboard {
  width: 100%;
  min-height: calc(100dvh - 168px);
  background: white;
  color: black;
  padding: 10px 10px 10px calc(var(--sidebar-width) + 30px);
  .projects {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    .project {
      display: flex;
      justify-content: space-between;
      cursor: pointer;
      user-select: none;
      .content {
        display: flex;
        gap: 10px;
        .thumbnail {
          img {
            width: 300px;
            height: 140px;
            object-fit: cover;
            border-radius: 4px;
          }
        }
        .title-date {
          display: flex;
          flex-direction: column;
          gap: 10px;
          .title {
            font-size: 20px;
            font-weight: bold;
          }
        }
      }
      .checkbox {
        width: 30px;
        height: 30px;
        border-radius: 4px;
        position: relative;
        border: 1px solid rgba(0, 0, 0, 0.616);
        cursor: pointer;
        &:hover {
          background-color: rgb(240, 240, 240);
        }
        .checked {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0%;
          left: 0%;
          cursor: pointer;
          background: rgb(49, 49, 49);
          color: white;
          font-size: 20px;
          scale: 0;
          transition: 0.1s;
        }
        input {
          display: none;
          appearance: none;

          &:checked + .checked {
            scale: 1;
          }
        }
      }
    }
  }
}
</style>
