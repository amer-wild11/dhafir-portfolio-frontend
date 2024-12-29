import { defineStore } from "pinia";

// تعريف نوع الرد المتوقع
interface VimeoVideo {
  uri: string;
  name: string;
  link: string;
  active: boolean;
  vimeo_options: any;
  // أضف الحقول الأخرى التي تحتاجها من الرد
}

interface VimeoResponse {
  data: VimeoVideo[];
  total: number;
  page: number;
  per_page: number;
}

export const useMyVimeoStore = defineStore({
  id: "myVimeoStore",
  state: () => ({
    client: "ec664d42924be72c287023f2419a7b02f387e30c",
    access_token: "bc2e22c80821f1519a8fe3d6a2f90eef",
    dhafir_videos: [] as VimeoVideo[],
    dhafir_id: "dhafir",
    currentPage: 1, // الصفحة الحالية
    perPage: 9, // عدد الفيديوهات لكل صفحة
    totalVideos: 0, // إجمالي عدد الفيديوهات
    active_video: {} as any,
  }),
  actions: {
    async getVideos() {
      const globalStore = useMyGlobalStore();

      try {
        const response = await $fetch<VimeoResponse>(
          `https://api.vimeo.com/users/${this.dhafir_id}/videos`,
          {
            headers: {
              Authorization: `Bearer ${this.access_token}`,
            },
            params: {
              page: this.currentPage,
              per_page: this.perPage,
            },
          }
        );

        // تخزين الفيديوهات والإحصائيات
        const options = {
          autoplay: true,
          loop: true,
          trigger: "immediate",
          width: 1100,
          responsive: true,
        };
        response.data.forEach((video) => {
          const current = response.data.find((v) => v.uri === video.uri);
          if (current) {
            current.vimeo_options = { ...options };
            current.vimeo_options.id = globalStore.extractVimeoId(current.link);
          } else {
            console.warn(`لم يتم العثور على فيديو بالمعرّف: ${video.uri}`);
          }
        });
        this.totalVideos = response.total; // إجمالي عدد الفيديوهات
        this.dhafir_videos = response.data; // قائمة الفيديوهات
        console.log("Videos fetched successfully:", response);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    },

    setActive(uri: any) {
      let clickedVideo = this.dhafir_videos.find((video) => video.uri == uri);
      this.active_video = clickedVideo;
      this.dhafir_videos.forEach((video) => {
        video.active = false;
      });
      if (clickedVideo) {
        clickedVideo.active = true;
      }
    },

    // لتغيير الصفحة
    changePage(page: number) {
      this.currentPage = page;
      this.getVideos(); // إعادة جلب الفيديوهات للصفحة الجديدة
    },
    closePopup() {
      this.active_video = {};
      this.dhafir_videos.forEach((v) => {
        v.active = false;
      });
    },
  },
  getters: {
    videoPopup: (state) => {
      return JSON.stringify(state.active_video) != "{}";
    },
  },
});
