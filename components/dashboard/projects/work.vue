<template>
  <div class="projects">
    <Sortable
      :list="vimeoStore.dhafir_videos.sort((a, b) => a.arrange - b.arrange)"
      item-key="id"
      @end="onEnd"
    >
      <template #item="{ element }">
        <div class="project">
          <div class="content">
            <div class="thumbnail">
              <img :src="element.thumbnail" alt="alt" />
            </div>
            <div class="title-date">
              <div class="value">
                <span class="title">{{ element.title }}</span>
                <span class="date">{{
                  globalStore.timeAgo(element.video_date)
                }}</span>
              </div>
              <span class="arrange">Arrangement: {{ element.arrange }}</span>
            </div>
          </div>
          <div class="options">
            <div
              class="delete option flex items-center justify-center"
              @click="deleteProject(element)"
            >
              <Icon name="ic:baseline-delete" />
            </div>
          </div>
        </div>
      </template>
    </Sortable>
  </div>
</template>

<script setup>
import { Sortable } from "sortablejs-vue3";

const vimeoStore = useMyVimeoStore();
const globalStore = useMyGlobalStore();
const dashboardStore = useMyDashboardStore();

const deleteProject = (project) => {
  dashboardStore.projectToDelete = project;
  dashboardStore.deleteAlert = true;
};

const onEnd = (event) => {
  // تحديث ترتيب العناصر في المصفوفة
  const movedItem = vimeoStore.dhafir_videos.splice(event.oldIndex, 1)[0];
  vimeoStore.dhafir_videos.splice(event.newIndex, 0, movedItem);

  // تحديث خاصية 'arrange' لكل عنصر لتعكس ترتيبه الجديد
  vimeoStore.dhafir_videos.forEach((item, index) => {
    item.arrange = index + 1; // الترتيب يبدأ من 1
  });

  dashboardStore.showSaveChanges = true;
};


</script>

<style scoped lang="scss">
.projects {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  .project {
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    cursor: move;
    transition: 0.2s;
    &:hover {
      background-color: rgba(0, 0, 0, 0.068);
    }
    .content {
      display: flex;
      gap: 10px;
      .thumbnail {
        img {
          width: 300px;
          height: 150px;
          object-fit: cover;
          border-radius: 5px;
        }
      }
      .title-date {
        display: flex;
        flex-direction: column;
        .value {
          display: flex;
          flex-direction: column;
          flex: 1;
          .title {
            font-size: 20px;
            font-weight: 600;
          }
          .date {
            font-size: 17px;
            color: rgba(0, 0, 0, 0.486);
          }
        }
        .arrange {
          font-size: 17px;
          color: rgba(0, 0, 0, 0.486);
        }
      }
    }
    .options {
      display: flex;
      align-items: center;
      gap: 10px;
      padding-right: 20px;
      .option {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        font-size: 30px;
        cursor: pointer;
        transition: 0.2s;
        &:hover {
          background-color: rgb(182, 27, 27);
          color: white;
        }
      }
      .sort {
        cursor: grab;
      }
    }
  }
}
</style>
