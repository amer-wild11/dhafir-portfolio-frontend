<template lang="pug">
  .hero
    .bg
      img(src="/home/hero/bg.png")
    .container.relative
      .time-effect.w-full.relative(ref="timeEffectEl")
        .controller(ref="controller")
          .icon
            Icon(name="ic:twotone-compare-arrows")
        .before.absolute
          img(:src="sectionsStore.hero.time_effect.before", :style="{'clip-path': `polygon(${percentage}% 0, 100% 0, 100% 100%, ${percentage}% 100%)`}")
        .after.absolute
          img(:src="sectionsStore.hero.time_effect.after", :style="{'clip-path': `polygon(0 0, ${percentage}% 0, ${percentage}% 100%, 0 100%)`}")

</template>

<script setup>

const sectionsStore = useMySectionsStore()
const controller = ref('')
const timeEffectEl = ref('')
const percentage = ref(50)

onMounted(() => {
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
    type: 'x',
    bounds: timeEffectEl.value,  // حدود الحاوية
    onDrag: (e) => {
      // التأكد من أن الـ controller يبقى داخل الحاوية
      const controllerRect = controller.value.getBoundingClientRect();
      const containerRect = timeEffectEl.value.getBoundingClientRect();

      // إذا كان الـ controller يخرج عن حدود الحاوية، نقوم بإعادته للحدود
      if (controllerRect.left < containerRect.left) {
        controller.value.style.left = '0px';  // أعاده للحد الأيسر
      } else if (controllerRect.right > containerRect.right) {
        controller.value.style.left = `${containerRect.width - controllerRect.width}px`;  // أعاده للحد الأيمن
      }

      // تحديث النسبة المئوية أثناء السحب
      updateControllerPosition();
    }
  });

  // تحديث النسبة المئوية عند تغيير حجم النافذة
  window.addEventListener('resize', updateControllerPosition);

  // إزالة الـ event listener عند تدمير المكون لتفادي التسربات
  onUnmounted(() => {
    window.removeEventListener('resize', updateControllerPosition);
  });
});

</script>

<style scoped lang="scss">
.hero {
  width: 100%;
  height: 100vh;
  position: relative;

  .bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;

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

      .before,
      .after {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        height: 100%;

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