<template lang="pug">
  .dashboard
    .content 
      .images
        label(for="image_before").image
          input(type="file", id="image_before", @change="changeImageBefore")
          img(:src="sectionsStore.hero.time_effect.before", ref="image_before")
          .values
            .name
              span Image before
        label(for="image_after").image
          input(type="file", id="image_after", @change="changeImageAfter")
          img(:src="sectionsStore.hero.time_effect.after", ref="image_after")
          .values
            .name
              span Image after
      .background
        .input
          input(type="text", :placeholder="sectionsStore.hero.bg", v-model="inputValue")
          button.button(v-if="inputValue != ''", @click="viewVideo") View
        .video(ref="bg_video")
</template>

<script setup>
import Player from "@vimeo/player";

const image_before = ref("");
const image_after = ref("");
const bg_video = ref("");
const player = ref("");
const dashboardStore = useMyDashboardStore();
const sectionsStore = useMySectionsStore();
const globalStore = useMyGlobalStore();
const inputValue = ref("");

definePageMeta({
  layout: "sections",
});

onMounted(() => {
  if (globalStore.extractVimeoId(sectionsStore.hero.bg)) {
    const options = {
      autoplay: true,
      loop: true,
      trigger: "immediate",
      responsive: true,
      controls: false,
      muted: true,
      id: globalStore.extractVimeoId(sectionsStore.hero.bg),
    };
    player.value = new Player(bg_video.value, options);
  }
});

watch(
  () => sectionsStore.hero.bg,
  (newVal) => {
    const options = {
      autoplay: true,
      loop: true,
      trigger: "immediate",
      responsive: true,
      controls: false,
      muted: true,
      id: globalStore.extractVimeoId(sectionsStore.hero.bg),
    };
    player.value = new Player(bg_video.value, options);
  }
);

const viewVideo = () => {
  const options = {
    autoplay: true,
    loop: true,
    trigger: "immediate",
    responsive: true,
    controls: false,
    muted: true,
    id: globalStore.extractVimeoId(inputValue.value),
  };
  player.value.destroy().then(() => {
    player.value = new Player(bg_video.value, options);
  });
  dashboardStore.backgroundLink = inputValue.value;
  inputValue.value = "";
};

const changeImageBefore = (event) => {
  const file = event.target.files[0]; // الحصول على الملف الأول من المدخل
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      image_before.value.src = e.target.result; // تحديث مصدر الصورة
    };
    reader.readAsDataURL(file); // قراءة الملف كـ Data URL
    dashboardStore.image_before_file = file;
  } else {
    return;
  }
};
const changeImageAfter = (event) => {
  const file = event.target.files[0]; // الحصول على الملف الأول من المدخل
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      image_after.value.src = e.target.result; // تحديث مصدر الصورة
    };
    reader.readAsDataURL(file); // قراءة الملف كـ Data URL
    dashboardStore.image_after_file = file;
  } else {
    return;
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
  .content {
    .images {
      display: flex;
      @media (max-width: 1023px) {
        flex-direction: column;
      }
      .image {
        position: relative;
        cursor: pointer;
        transition: 0.2s;
        width: 100%;
        &:hover {
          filter: brightness(0.9);
        }
        input {
          display: none;
          appearance: none;
        }
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .values {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          .name {
            padding: 10px 20px;
            background-color: white;
            border-radius: 4px;
            font-weight: 600;
            font-size: 17px;
            cursor: pointer;
            transition: 0.2s;
            user-select: none;
            box-shadow: 0 0 5px 0 black;
            &:hover {
              background-color: rgb(219, 219, 219);
            }
          }
        }
      }
    }
    .background {
      margin-top: 20px;
      .input {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px 0 0;
        margin-bottom: 10px;
        input {
          padding: 10px 20px;
          border: 1px solid rgb(136, 136, 136);
          border-radius: 5px;
          width: 100%;
          max-width: 600px;
        }
        .button {
          padding: 10px 20px;
          background-color: rgb(19, 156, 202);
          color: white;
          border-radius: 4px;
          cursor: pointer;
          user-select: none;
        }
      }
    }
  }
}
</style>
