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
  projects: any;
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
        const headers = globalStore.headers;
        const response = await $fetch<VimeoResponse>(
          `${globalStore.apiLink}/api/projects`,
          {
            headers,
          }
        );

        // تخزين الفيديوهات والإحصائيات
        const options = {
          autoplay: true,
          loop: true,
          trigger: "immediate",
          responsive: true,
        };

        const dashboardStore = useMyDashboardStore();

        dashboardStore.videosCopy = response.projects;

        response.projects.forEach((project: any) => {
          const current = response.projects.find(
            (p: any) => p.video === project.video
          );

          if (current) {
            current.vimeo_options = { ...options };
            current.vimeo_options.id = globalStore.extractVimeoId(
              current.video
            );
          } else {
            console.warn(`لم يتم العثور على فيديو بالمعرّف: ${project.video}`);
          }
        });
        this.totalVideos = response.projects.length; // إجمالي عدد الفيديوهات
        this.dhafir_videos = response.projects; // قائمة الفيديوهات

        console.log("Videos fetched successfully:", response);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    },

    setActive(video: any) {
      console.log(this.dhafir_videos, video);
      let clickedVideo = this.dhafir_videos.find((p: any) => p.video == video);
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
