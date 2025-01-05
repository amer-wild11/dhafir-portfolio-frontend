<template lang="pug">
  .dashboard
    .text
      .value
        textarea(v-model="dashboardStore.about_text")
    .image-background
      .input
        input(type="text", placeholder="Background video, only vimeo links.", v-model="bgLinkInput")
        button.viewButton(@click="viewVideo", v-if="bgLinkInput != ''") View 
      .output
        .background(ref="background")
        label(for="personalImageInput").image
          .image-text.flex
            span Personal image
          img(:src="sectionsStore.about.image", alt="alt", ref="pImage")
          input(type="file", id="personalImageInput", @change="changePImage")
</template>

<script setup>
import Player from "@vimeo/player";

const dashboardStore = useMyDashboardStore();
const sectionsStore = useMySectionsStore();
const globalStore = useMyGlobalStore();
const background = ref("");
const player = ref("");
const bgLinkInput = ref("");
const pImage = ref("");

onMounted(() => {
  if (globalStore.extractVimeoId(sectionsStore.about.background)) {
    const options = {
      autoplay: true,
      loop: true,
      trigger: "immediate",
      responsive: true,
      controls: false,
      muted: true,
      id: globalStore.extractVimeoId(sectionsStore.about.background),
    };
    player.value = new Player(background.value, options);
    dashboardStore.about_text = sectionsStore.about.text;
  }
});

watch(sectionsStore.about, (newVal, oldVal) => {
  if (newVal) {
    const options = {
      autoplay: true,
      loop: true,
      trigger: "immediate",
      responsive: true,
      controls: false,
      muted: true,
      id: globalStore.extractVimeoId(sectionsStore.about.background),
    };
    player.value = new Player(background.value, options);
    dashboardStore.about_text = newVal.text;
  }
});

const changePImage = (event) => {
  const file = event.target.files[0]; // الحصول على الملف الأول من المدخل
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      pImage.value.src = e.target.result; // تحديث مصدر الصورة
    };
    reader.readAsDataURL(file); // قراءة الملف كـ Data URL
    dashboardStore.about_image_file = file;
  } else {
    return;
  }
};

const viewVideo = () => {
  const options = {
    autoplay: true,
    loop: true,
    trigger: "immediate",
    responsive: true,
    controls: false,
    muted: true,
    id: globalStore.extractVimeoId(bgLinkInput.value),
  };
  player.value.destroy().then(() => {
    player.value = new Player(background.value, options);
    dashboardStore.about_background = bgLinkInput.value;
    bgLinkInput.value = "";
  });
};

watch(
  () => dashboardStore.about_text,
  (newVal, oldVal) => {
    if (newVal != oldVal && oldVal != "") {
      dashboardStore.about_text_changed = true;
    }
    if (dashboardStore.about_text == sectionsStore.about.text) {
      dashboardStore.about_text_changed = false;
    }
  }
);

definePageMeta({
  layout: "sections",
});
</script>

<style scoped lang="scss">
.dashboard {
  width: 100%;
  min-height: calc(100dvh - 168px);
  background: white;
  color: black;
  padding: 10px 10px 10px calc(var(--sidebar-width) + 30px);
  .text {
    .value {
      width: 100%;
      height: 340px;
      textarea {
        width: 100%;
        height: 100%;
        border: 1px solid rgb(161, 161, 161);
        padding: 10px;
        border-radius: 5px;
        font-weight: 500;
        font-size: 18px;
        resize: none;
        &::-webkit-scrollbar {
          width: 5px;
        }
      }
    }
  }
  .image-background {
    margin-top: 20px;
    .input {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-right: 20px;
      gap: 20px;
      margin-bottom: 10px;
      button {
        padding: 10px 25px;
        border-radius: 4px;
        background-color: rgb(27, 27, 31);
        color: white;
        cursor: pointer;
        min-width: fit-content;
      }
      input {
        padding: 10px;
        border: 1px solid rgb(133, 133, 133);
        border-radius: 4px;
        width: 500px;
        @media (max-width: 1023px) {
          width: 100%;
        }
      }
    }
    .output {
      display: flex;
      align-items: start;
      width: 100%;
      gap: 10px;
      height: fit-content;
      @media (max-width: 1023px) {
        flex-direction: column;
      }
      .image {
        border-radius: 5px;
        width: 300px;
        min-width: 300px;
        position: relative;
        cursor: pointer;
        @media (min-width: 1024px) {
          width: 30%;
          min-width: 30%;
        }
        @media (max-width: 1023px) {
          width: 100%;
          min-width: 100%;
        }
        input {
          display: none;
          appearance: none;
        }
        &:hover {
          .image-text {
            span {
              background-color: rgb(161, 161, 161) !important;
            }
          }
        }
        .image-text {
          overflow: hidden;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          span {
            text-align: center;
            display: flex;
            padding: 10px 20px;
            border-radius: 4px;
            background-color: white;
            color: black;
            box-shadow: 0 0 10px 0 rgb(63, 63, 63);
            font-weight: 600;
            transition: 0.2s;
            z-index: 99;
          }
        }
        img {
          width: 100%;
          object-fit: cover;
          transition: 0.2s;
        }
      }
      .background {
        border-radius: 5px;
        width: 100%;
        overflow: hidden;
      }
    }
  }
}
</style>
