import { defineStore } from "pinia";

export const useMySectionsStore = defineStore({
  id: "mySectionsStore",
  state: () => ({
    hero: {
      bg: "",
      time_effect: {
        before: "/home/hero/before.png",
        after: "/home/hero/after.png",
      },
    },
    about: {
      text: `Dhafir Ayad is a visionary director and producer with a deep passion for storytelling and visual artistry. With over six years of experience in the Iraqi market, he has redefined advertising and creative production, blending cultural authenticity with modern cinematic techniques.
As the founder of Frame Vision Productions, Zafer has built a reputation for crafting compelling narratives that resonate with audiences. His work reflects a perfect harmony of creativity, technical excellence, and an unwavering commitment to quality.
Through his journey, Zafer continues to push the boundaries of visual storytelling, inspiring the next generation of creatives and contributing to the growth of Iraq's artistic and advertising industries.
"We don't just create visuals; we bring stories to life."`,
      image: "/home/about/right.png",
    },
  }),
  actions: {},
});
