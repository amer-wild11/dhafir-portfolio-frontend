import { defineStore } from "pinia";

// تعريف واجهة البيانات المتوقعة
interface HeroSectionResponse {
  section: {
    background: string;
    before_image: string;
    after_image: string;
  };
}
interface aboutSectionResponse {
  section: {
    background: string;
    image: String;
    text: String;
  };
}

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
"We don't just create visuals; we bring stories to life."` as any,
      image: "/home/about/right.png" as any,
      background: "",
    },
  }),
  actions: {
    async getHeroSection() {
      try {
        // استدعاء المتجر العالمي
        const globalStore = useMyGlobalStore();
        const headers = globalStore.headers;

        // استدعاء بيانات القسم
        const response = await $fetch<HeroSectionResponse>(
          `${globalStore.apiLink}/api/sections/hero`,
          {
            headers,
          }
        );

        // تحديث البيانات في الحالة
        if (response && response.section) {
          this.hero.bg = response.section.background;
          this.hero.time_effect.before = response.section.before_image;
          this.hero.time_effect.after = response.section.after_image;
        } else {
          console.warn("Invalid response structure:", response);
        }
      } catch (err) {
        console.error("Error fetching hero section:", err);
      }
    },
    async getAboutSection() {
      try {
        // استدعاء المتجر العالمي
        const globalStore = useMyGlobalStore();
        const headers = globalStore.headers;

        // استدعاء بيانات القسم
        const response = await $fetch<aboutSectionResponse>(
          `${globalStore.apiLink}/api/sections/about`,
          {
            headers,
          }
        );

        // تحديث البيانات في الحالة
        if (response && response.section) {
          this.about.background = response.section.background;
          this.about.image = response.section.image;
          this.about.text = response.section.text;
        } else {
          console.warn("Invalid response structure:", response);
        }
      } catch (err) {
        console.error("Error fetching hero section:", err);
      }
    },
  },
});
