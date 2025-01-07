<template lang="pug">
  .hero
    .bg(ref="background")
      img(:src="bgLink", ref="alt_image")
    .container.relative
      .time-effect.w-full.relative(ref="timeEffectEl")
        .controller(ref="controller", @mouseover="globalStore.ballEnter('oui:grab')" @mouseleave="globalStore.ballLeave()")
          .icon
            Icon(name="ic:twotone-compare-arrows")
        .before.absolute.image
          img(:src="sectionsStore.hero.time_effect.before", :style="{'clip-path': `polygon(${percentage}% 0, 100% 0, 100% 100%, ${percentage}% 100%)`}")
        .after.absolute.image
          img(:src="sectionsStore.hero.time_effect.after", :style="{'clip-path': `polygon(0 0, ${percentage}% 0, ${percentage}% 100%, 0 100%)`}")

</template>

<script setup>
import Player from "@vimeo/player";

const sectionsStore = useMySectionsStore();
const controller = ref("");
const timeEffectEl = ref("");
const percentage = ref(50);
const background = ref("");
const globalStore = useMyGlobalStore();
const player = ref("");
const dashboardStore = useMyDashboardStore();
const bgLink = ref("/home/hero/bg.png");
const alt_image = ref("");

onMounted(() => {
  useGsap.to(".hero .time-effect .image", {
    y: "-50%",
    opacity: 1,
    duration: 0,
    stagger: 0.2,
  });
  if (sectionsStore.hero.bg) {
    const options = {
      autoplay: true,
      loop: true,
      trigger: "immediate",
      responsive: true,
      controls: false,
      muted: true,
      id: sectionsStore.hero.bg,
    };

    player.value = new Player(background.value, options);
    if (player.value) {
      useGsap.to(alt_image.value, {
        display: "none",
      });
    }
  }

  const updateControllerPosition = () => {
    // حساب موقع العنصر بالنسبة للحاوية باستخدام getBoundingClientRect
    const controllerRect = controller.value.getBoundingClientRect();
    const containerRect = timeEffectEl.value.getBoundingClientRect();

    // حساب الموقع نسبةً للحاوية
    const xPosition = controllerRect.left - containerRect.left;

    // تحديث النسبة المئوية بناءً على الموقع الجديد
    percentage.value = (xPosition / timeEffectEl.value.clientWidth) * 100;
  };

  useDraggable.create(controller.value, {
    type: "x",
    bounds: timeEffectEl.value, // حدود الحاوية
    onDrag: (e) => {
      // التأكد من أن الـ controller يبقى داخل الحاوية
      const controllerRect = controller.value.getBoundingClientRect();
      const containerRect = timeEffectEl.value.getBoundingClientRect();

      // إذا كان الـ controller يخرج عن حدود الحاوية، نقوم بإعادته للحدود
      if (controllerRect.left < containerRect.left) {
        controller.value.style.left = "0px"; // أعاده للحد الأيسر
      } else if (controllerRect.right > containerRect.right) {
        controller.value.style.left = `${
          containerRect.width - controllerRect.width
        }px`; // أعاده للحد الأيمن
      }

      // تحديث النسبة المئوية أثناء السحب
      updateControllerPosition();
    },
  });

  window.addEventListener("resize", updateControllerPosition);

  onUnmounted(() => {
    window.removeEventListener("resize", updateControllerPosition);
  });

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
    player.value = new Player(background.value, options);
    if (player.value) {
      useGsap.to(alt_image.value, {
        display: "none",
      });
    }
  }
});

watch(
  () => sectionsStore.hero.bg,
  (newVal) => {
    if (newVal != "") {
      const options = {
        autoplay: true,
        loop: true,
        trigger: "immediate",
        responsive: true,
        controls: false,
        muted: true,
        id: globalStore.extractVimeoId(newVal),
      };

      player.value = new Player(background.value, options);
      if (player.value && alt_image.value) {
        useGsap.to(alt_image.value, {
          display: "none",
        });
      }
    }
  }
);
</script>

<style scoped lang="scss">
.hero {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  .bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: brightness(0.4);
    img {
      width: 100%;
      height: 110%;
      object-fit: cover;
    }
  }

  .container {
    z-index: 1;
    height: 100dvh;
    padding-top: calc(var(--header-height) + 10px);
    display: flex;
    align-items: center;
    justify-content: center;

    .time-effect {
      height: 90%;
      overflow: hidden;
      opacity: 70%;
      .before,
      .after {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -10%);
        width: 100%;
        height: 100%;
        transition: 1s;
        opacity: 0;
        img {
          object-fit: cover;
          width: 100%;
          height: 100%;
          object-position: center;
          user-select: none;
        }
      }

      .controller {
        width: 6px;
        height: 100%;
        background-color: white;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        border-radius: 10px;
        z-index: 1;
        cursor: grab;

        .icon {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: white;
          color: black;
          font-size: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>
