<template lang="pug">
  .ball.flex.items-center.justify-center(ref="ball")
  .play-icon.flex.items-center.justify-center(ref="icon")
    .icon.flex.items-center.justify-center
      Icon(:name="globalStore.ball.icon")
</template>

<script setup>
import { onMounted } from "vue";
import gsap from "gsap";

const globalStore = useMyGlobalStore();
const ball = ref("");
const icon = ref("");

watch(
  globalStore.ball,
  (newVal) => {
    if (newVal.grow && ball.value) {
      useGsap.to(ball.value, {
        width: "80px",
        height: "80px",
        duration: 0.5,
        boxShadow: "0 0 10px 0 white",
        ease: "bounce.out",
      });
      useGsap.to(icon.value, {
        fontSize: "40px",
        opacity: 1,
        duration: 0.6,
      });
    }
    if (newVal.grow == false && ball.value) {
      useGsap.to(ball.value, {
        width: "40px",
        height: "40px",
        boxShadow: "0 0 10px 0 transparent",
        duration: 0.5,
        ease: "ease-out",
      });
      useGsap.to(icon.value, {
        fontSize: "30px",
        opacity: 0,
        duration: 0.6,
      });
    }
  },
  { deep: true }
);

onMounted(() => {
  if (ball.value) {
    let mouseX = window.innerWidth / 2,
      mouseY = window.innerHeight / 2;
    let lastX = mouseX,
      lastY = mouseY;

    const lerp = (start, end, t) => start + (end - start) * t;

    // متغيرات التحكم
    const smoothness = 0.2; // درجة السلاسة
    const maxStretch = 2.3; // الحد الأقصى للتمدد
    const minStretch = 0.8; // الحد الأدنى للتمدد

    const followMouse = () => {
      const distX = mouseX - lastX;
      const distY = mouseY - lastY;
      const speed = Math.sqrt(distX * distX + distY * distY); // حساب السرعة
      const angle = Math.atan2(distY, distX); // حساب الزاوية بين المحاور

      // تحديث موقع الكرة
      lastX = lerp(lastX, mouseX, smoothness);
      lastY = lerp(lastY, mouseY, smoothness);
      useGsap.to(icon.value, {
        x: lastX,
        y: lastY,
        duration: 0,
      });
      gsap.to(ball.value, {
        x: lastX,
        y: lastY,
        duration: 0,
      });

      // تشوه بناءً على الزاوية والسرعة
      const stretchX = lerp(1, maxStretch, Math.min(speed / 100, 1)); // التمدد الأفقي
      const stretchY = lerp(1, minStretch, Math.min(speed / 100, 1)); // التمدد العمودي

      // التدوير حسب اتجاه الحركة
      const rotation = (angle * 180) / Math.PI;

      gsap.to(ball.value, {
        scaleX: stretchX,
        scaleY: stretchY,
        rotate: rotation,
        duration: 0,
        ease: "power2.out",
      });

      requestAnimationFrame(followMouse);
    };

    // تحديث موقع الماوس
    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // بدء الحركة
    followMouse();
  }
});
</script>

<style scoped lang="scss">
.ball {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  background: linear-gradient(135deg, #ffffff, #ffffff);
  // box-shadow: 0 0 10px 0 white;
  pointer-events: none;
}
.play-icon {
  color: black;
  width: 40px;
  height: 40px;
  position: fixed;
  z-index: 9999;
  top: 0%;
  left: 0%;
  transform: translate(-50%, -50%);
  opacity: 0;
  color: rgb(0, 0, 0);
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  .icon {
    font-size: 50px;
  }
}
</style>
