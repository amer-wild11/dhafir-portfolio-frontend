<template lang="pug">
  header
    label(for="projectsSearch").search
      input(type="search", placeholder="Search...", id="projectsSearch", v-model="searchVal", @input="search")
      .icon
        Icon(name="fluent:search-32-filled")
    .actions
      .importProjects
        .button(@click="open")
          .icon.flex.items-center.justify-center
            Icon(name="fluent:mail-inbox-arrow-down-20-filled")
      .save.flex.items-center.justify-center(v-if="dashboardStore.showSaveChanges", @click="dashboardStore.saveChanges()")
        button(v-html="dashboardStore.saveButtonContent")
</template>

<script setup>
const dashboardStore = useMyDashboardStore();
const vimeoStore = useMyVimeoStore();
const searchVal = ref("");

const open = () => {
  dashboardStore.importProjectsPopup = true;
};

const search = () => {
  let originalVideos = vimeoStore.dhafir_videos;
  const searchTerm = searchVal.value.trim().toLowerCase();
  if (searchTerm === "") {
    // إذا كان حقل البحث فارغًا، أعد القائمة الأصلية
    vimeoStore.dhafir_videos = dashboardStore.videosCopy;
    return;
  }
  // تصفية المشاريع بناءً على العنوان
  const filteredProjects = originalVideos.filter((project) =>
    project.title.toLowerCase().includes(searchTerm)
  );
  // تحديث vimeoStore.dhafir_videos بالنتائج أو القائمة الأصلية إذا لم تكن هناك نتائج
  vimeoStore.dhafir_videos =
    filteredProjects.length > 0 ? filteredProjects : dashboardStore.videosCopy;
};
</script>

<style scoped lang="scss">
header {
  padding: 10px 20px 10px 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .search {
    position: relative;
    width: 100%;
    max-width: 500px;
    input {
      padding: 10px 10px 10px 35px;
      border: 1px solid lightgray;
      border-radius: 100px;
      width: 100%;
      max-width: 500px;
    }
    .icon {
      position: absolute;
      top: 50%;
      left: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      transform: translateY(-50%);
      color: rgba(0, 0, 0, 0.418);
      .iconify {
        font-size: 20px;
      }
    }
  }
  .actions {
    display: flex;
    flex-direction: row-reverse;
    gap: 10px;
    .importProjects {
      .button {
        padding: 5px;
        background-color: rgb(2, 165, 206);
        border-radius: 6px;
        font-weight: 600;
        font-size: 16px;
        color: white;
        cursor: pointer;
        user-select: none;
        cursor: pointer;
        .icon {
          .iconify {
            font-size: 30px;
          }
        }
      }
    }
    .save {
      background-color: rgb(2, 165, 206);
      color: white;
      border-radius: 5px;
      padding: 5px 15px;
      button {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
