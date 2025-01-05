<template lang="pug">
  .deleteAlert(ref="deleteEl")
    .icon.flex.items-center.justify-center
      Icon(name="mdi:exclamation-thick")
    .content
      .title-desc
        span.title Are you sure?
        p.desc This action is going to delete this project, this action can't be undone.
      .options
        .cancel.option(@click="cancel")
          span Cancel
        .delete.option(@click="dashboardStore.deleteProject()")
          span Delete
</template>

<script setup>
const deleteEl = ref();
const dashboardStore = useMyDashboardStore();

const cancel = () => {
  dashboardStore.deleteAlert = false;
  dashboardStore.projectToDelete = {};
};

watch(
  () => dashboardStore.deleteAlert,
  (newVal, oldVal) => {
    if (newVal && deleteEl.value) {
      useGsap.to(deleteEl.value, {
        display: "flex",
      });
      setTimeout(() => {
        useGsap.to(deleteEl.value, {
          y: 0,
          opacity: 1,
          duration: 0,
        });
      }, 200);
    } else if (newVal == false && deleteEl.value) {
      useGsap.to(deleteEl.value, {
        y: "30px",
        opacity: 0,
        duration: 0,
      });
      setTimeout(() => {
        useGsap.to(deleteEl.value, {
          display: "none",
        });
      }, 200);
    }
  }
);
</script>

<style scoped lang="scss">
.deleteAlert {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px;
  border-radius: 10px;
  width: 97%;
  max-width: 400px;
  z-index: 999;
  background-color: white;
  border: 1px solid lightgray;
  color: black;
  display: flex;
  gap: 20px;
  transform: translate(-50%, 30px);
  opacity: 0;
  display: none;
  transition: 0.2s;
  .icon {
    min-width: 30px;
    height: 30px;
    background-color: rgb(21, 172, 223);
    border-radius: 50%;
    font-size: 20px;
    color: white;
    margin-top: 5px;
  }
  .content {
    display: flex;
    flex-direction: column;
    gap: 10px;
    .title-desc {
      flex: 1;
      border-bottom: 1px solid lightgray;
      padding-bottom: 16px;
      .title {
        font-size: 23px;
      }
      .desc {
        font-size: 17px;
      }
    }
    .options {
      display: flex;
      align-items: center;
      justify-content: end;
      gap: 10px;
      margin-top: 10px;
      .option {
        padding: 5px 10px;
        border-radius: 5px;
        font-size: 16px;
        cursor: pointer;
        user-select: none;
        &.delete {
          color: rgb(231, 0, 0);
        }
      }
    }
  }
}
</style>
