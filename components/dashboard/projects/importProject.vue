<template lang="pug">
  .importProject(:class="dashboardStore.importProjectsPopup? 'active': ''", ref="importProjectsEl")
    .close(@click="close")
      Icon(name="ic:twotone-cancel")
    header.flex.items-center
      form(@submit.prevent="fetchProjects").flex.gap-5.w-full
        .vimeoNameInput
          input(type="search", placeholder="Vimeo user id" v-model="id")
        button(v-html="dashboardStore.importButtonContent").submit 
    .projects 
      .project(v-for="project in dashboardStore.currentProjects" :key="project.uri")
        .content
          .thumbnail
            img(:src="project.pictures.base_link", alt="projectImage")
          .title-date
            span.title {{ project.name }}
            span.date {{globalStore.timeAgo(project.created_time)}}
        .select
          label(:for="`project-${project.uri}`", )
            input(type="checkbox", :id="`project-${project.uri}`", :data-projectUri="project.uri", @click="select(project.uri, $event)")
            .checked
              Icon(name="fluent:checkmark-12-filled")
      .export(@click="dashboardStore.exportVideos", v-if="dashboardStore.selectedProjects.length > 0")
        span(v-html="dashboardStore.exportButtonContent")
</template>

<script setup>
const dashboardStore = useMyDashboardStore();
const globalStore = useMyGlobalStore();
const id = ref("");
const importProjectsEl = ref("");
const fetchProjects = () => {
  if (id.value != "") {
    console.log("searching...", id.value);
    dashboardStore.getVimeoVideos(id.value);
    id.value = "";
  }
};

const select = (uri, e) => {
  const clickedProject = dashboardStore.currentProjects.find(
    (project) => project.uri == uri
  );
  const project = {
    title: clickedProject.name,
    thumbnail: clickedProject.pictures.base_link,
    video: clickedProject.link,
    uri: clickedProject.uri,
    video_date: clickedProject.created_time,
  };
  if (e.target.checked) {
    dashboardStore.selectProject(project);
  } else if (!e.target.checked) {
    dashboardStore.unSelectProject(project);
  }
};

const close = () => {
  dashboardStore.importProjectsPopup = false;
};

watch(
  () => dashboardStore.importProjectsPopup,
  (newVal) => {
    if (newVal && importProjectsEl.value) {
      useGsap.to(importProjectsEl.value, {
        display: "unset",
      });
      setTimeout(() => {
        useGsap.to(importProjectsEl.value, {
          y: 0,
          opacity: 1,
          duration: 0,
        });
      }, 200);
    } else if (newVal == false && importProjectsEl.value) {
      const checkboxes = document.querySelectorAll(
        ".importProject .project .select input"
      );
      checkboxes.forEach((c) => {
        c.checked = false;
      });
      useGsap.to(importProjectsEl.value, {
        y: "30px",
        opacity: 0,
        duration: 0,
      });
      setTimeout(() => {
        useGsap.to(importProjectsEl.value, {
          display: "none",
        });
      }, 400);
    }
  }
);
</script>

<style scoped lang="scss">
.importProject {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  background-color: rgb(255, 255, 255);
  border: 1px solid lightgray;
  z-index: 999;
  padding: 20px 40px;
  overflow: auto;
  transform: translateY(30px);
  opacity: 0;
  transition: 0.4s;
  display: none;
  .close {
    position: absolute;
    top: 20px;
    right: 30px;
    font-size: 40px;
    cursor: pointer;
  }
  header {
    margin: auto;
    max-width: 1300px;
    width: 100%;
    form {
      margin: auto;
      width: fit-content;
      .vimeoNameInput {
        width: 500px;
        input {
          width: 100%;
          height: 100%;
          padding: 5px 10px;
          border: 1px solid lightgray;
          border-radius: 5px;
        }
      }
      .submit {
        padding: 10px 20px;
        background-color: rgb(56, 56, 56);
        color: white;
        border-radius: 5px;
        user-select: none;
        cursor: pointer;
      }
    }
  }
  .projects {
    width: 100%;
    max-width: 1300px;
    display: flex;
    flex-direction: column;
    gap: 30px;
    margin: auto;
    margin-top: 30px;
    .export {
      width: 100%;
      background-color: rgb(56, 56, 56);
      padding: 10px 20px;
      text-align: center;
      font-size: 20px;
      font-weight: 500;
      border-radius: 10px;
      color: white;
      position: sticky;
      bottom: 0;
      left: 0;
      cursor: pointer;
    }
    .project {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20px;
      .content {
        display: flex;
        gap: 10px;
        width: 100%;
        .thumbnail {
          img {
            width: 200px;
            height: 100px;
            object-fit: cover;
            border-radius: 5px;
          }
        }
        .title-date {
          display: flex;
          flex-direction: column;
          gap: 10px;
          justify-content: space-between;
          padding: 0px 0;
          .title {
            font-size: 20px;
            font-weight: 600;
          }
        }
      }
      .select {
        width: 20%;
        display: flex;
        align-items: center;
        justify-content: end;
        cursor: pointer;
        height: 100%;
        label {
          display: inline-block;
          width: 30px;
          height: 30px;
          border-radius: 5px;
          border: 1px solid lightgray;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          .checked {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: rgb(9, 163, 224);
            scale: 0;
            transition: 0.1s;
            .iconify {
              color: white;
              font-size: 20px;
            }
          }
          input {
            display: none;
          }
          input:checked + .checked {
            scale: 1;
          }
        }
      }
    }
  }
}
</style>
