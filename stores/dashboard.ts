import { defineStore } from "pinia";

export const useMyDashboardStore = defineStore({
  id: "myDashboardStore",
  state: () => ({
    currentProjects: [] as any,
    importButtonContent: "Import",
    selectedProjects: [] as any,
    exportButtonContent: "Export",
    importProjectsPopup: false,
    saveButtonContent: "Save",
    showSaveChanges: false,
    deleteAlert: false,
    projectToDelete: {} as any,
    deleteButtonContent: "Delete",
    videosCopy: [] as any,
    image_before_file: "",
    image_after_file: "",
    backgroundLink: "",
    save_button_content: "Save",
    checkedProjectsList: [] as any,
    unCheckedProjectsList: [] as any,
    projects_save_button: "Save",
    about_text: "" as any,
    about_background: "" as any,
    about_image_file: "" as any,
    about_text_changed: false,
    about_save_button: "Save",
  }),
  actions: {
    async getVimeoVideos(userId: any) {
      const vimeoStore = useMyVimeoStore();
      this.importButtonContent = "Importing...";
      try {
        const response = await fetch(
          `https:/api.vimeo.com/users/${userId}/videos`,
          {
            headers: {
              Authorization: `Bearer ${vimeoStore.access_token}`,
            },
          }
        );

        console.log(response);
        this.importButtonContent = "Import";

        if (!response.ok) {
          throw new Error(
            `Error while fetching user projects. The error: ${response.statusText}`
          );
        }

        const data = await response.json();
        this.currentProjects = data.data;
      } catch (err) {
        this.importButtonContent = "Import";
        console.error(err);
        return null;
      }
    },
    exportVideos() {
      this.exportButtonContent = "Exporting...";
      const globalStore = useMyGlobalStore();
      const vimeoStore = useMyVimeoStore();
      try {
        this.selectedProjects.forEach(async (p: any) => {
          const transformed = {
            title: p.title,
            thumbnail: p.thumbnail,
            video: p.video,
            video_date: p.video_date,
          };
          const video = vimeoStore.dhafir_videos.find(
            (v: any) => v.video == transformed.video
          );

          if (!video) {
            const headers = globalStore.headers;
            const response = await $fetch(
              `${globalStore.apiLink}/api/projects`,
              {
                method: "POST",
                headers,
                body: transformed,
              }
            );
            this.exportButtonContent = "Export";
          } else {
            console.log("Video already uploaded!");
          }
        });
        this.importProjectsPopup = false;
      } catch (err) {
        this.exportButtonContent = "Error!";
        console.error(err);
      }
    },
    async saveChanges() {
      this.saveButtonContent = "Saving...";
      try {
        const globalStore = useMyGlobalStore();
        const vimeoStore = useMyVimeoStore();
        const headers = globalStore.headers;
        const response = await $fetch(`${globalStore.apiLink}/api/projects`, {
          method: "PATCH",
          headers,
          body: {
            projects: vimeoStore.dhafir_videos,
          },
        });
        this.saveButtonContent = "Save";
        this.showSaveChanges = false;
      } catch (err) {
        this.saveButtonContent = "Error";
        this.showSaveChanges = false;
        console.error(err);
      }
    },
    selectProject(project: any) {
      this.selectedProjects.push(project);
    },
    unSelectProject(project: any) {
      let index = this.selectedProjects.findIndex(
        (p: any) => p.uri == project.uri
      );
      console.log(index);
      if (index !== -1) {
        this.selectedProjects.splice(index, 1);
      }
    },
    async deleteProject() {
      try {
        const vimeoStore = useMyVimeoStore();
        const globalStore = useMyGlobalStore();
        const headers = globalStore.headers;
        this.deleteButtonContent = "Deleting...";
        const response = await $fetch(
          `${globalStore.apiLink}/api/projects/${this.projectToDelete.id}`,
          {
            headers,
            method: "DELETE",
          }
        );

        console.log(response);
        const index = vimeoStore.dhafir_videos.findIndex(
          (p: any) => p.id == this.projectToDelete.id
        );
        const indexCopy = this.videosCopy.findIndex(
          (p: any) => p.id == this.projectToDelete.id
        );
        if (indexCopy !== -1) {
          this.videosCopy.splice(index, 1);
        }
        if (index !== -1) {
          vimeoStore.dhafir_videos.splice(index, 1);
        }
        this.deleteButtonContent = "Delete";
        this.deleteAlert = false;
        this.projectToDelete = {};
      } catch (err) {
        this.deleteButtonContent = "Error";
        this.deleteAlert = false;
        this.projectToDelete = {};
        console.error(err);
      }
    },
    async updateHero() {
      const updates = {} as any;
      let data = new FormData();

      if (this.image_before_file != "") {
        updates.image_before = this.image_before_file;
        data.append("before_image", this.image_before_file);
      }
      if (this.image_after_file != "") {
        updates.image_after = this.image_after_file;
        data.append("after_image", this.image_after_file);
      }
      if (this.backgroundLink != "") {
        updates.background = this.backgroundLink;
        data.append("background", this.backgroundLink);
      }

      try {
        this.save_button_content = "Saving...";
        const globalStore = useMyGlobalStore();
        const headers = globalStore.headers;
        const response = await $fetch(
          `${globalStore.apiLink}/api/sections/hero`,
          {
            method: "PATCH",
            headers,
            body: data,
          }
        );

        this.save_button_content = "Save";
        this.backgroundLink = "";
        this.image_before_file = "";
        this.image_after_file = "";
      } catch (err) {
        this.save_button_content = "Save";
      }
    },
    selectProjectList(project: any) {
      const index = this.unCheckedProjectsList.findIndex(
        (p: any) => p.id == project.id
      );
      if (index !== -1) {
        this.unCheckedProjectsList.splice(index, 1);
      }
      if (!project.selected) {
        this.checkedProjectsList.push(project);
      }
    },
    unSelectProjectList(project: any) {
      const index = this.checkedProjectsList.findIndex(
        (p: any) => p.id == project.id
      );
      if (project.selected) {
        this.unCheckedProjectsList.push(project);
      }
      if (index !== -1) {
        this.checkedProjectsList.splice(index, 1);
      }
    },
    async updateSelection() {
      const globalStore = useMyGlobalStore();
      const vimeoStore = useMyVimeoStore();
      const headers = globalStore.headers;
      try {
        const checkedGroup = this.checkedProjectsList;
        let dots = "";
        const int = setInterval(() => {
          dots = dots.length < 3 ? dots + "." : "";

          this.projects_save_button = `Saving${dots}`;
        }, 200);

        checkedGroup.forEach((p: any) => {
          p.select_value = true;
        });
        const unCheckedGroup = this.unCheckedProjectsList;
        unCheckedGroup.forEach((p: any) => {
          p.select_value = false;
        });
        const projectsToUpdate = [...checkedGroup, ...unCheckedGroup];
        projectsToUpdate.forEach(async (p: any) => {
          const response = await $fetch(
            `${globalStore.apiLink}/api/projects/${p.id}`,
            {
              headers,
              method: "PATCH",
              body: {
                selected: p.select_value,
                id: p.id,
              },
            }
          );

          if (projectsToUpdate[projectsToUpdate.length - 1] == p) {
            this.projects_save_button = "Done";
            this.checkedProjectsList = [];
            this.unCheckedProjectsList = [];
            clearInterval(int);
          }
        });
      } catch (err) {
        this.projects_save_button = "Save";
        console.error(err);
      }
    },
    async updateAbout() {
      const updates = {} as any;
      let data = new FormData();

      try {
        if (this.about_text) {
          data.append("text", this.about_text);
        }
        if (this.about_image_file) {
          data.append("image", this.about_image_file);
        }
        if (this.about_background) {
          data.append("background", this.about_background);
        }
        let dots = "";
        const int = setInterval(() => {
          dots = dots.length < 3 ? dots + "." : "";

          this.about_save_button = `Saving${dots}`;
        }, 200);

        const globalStore = useMyGlobalStore();
        const headers = globalStore.headers;
        const response = await $fetch(
          `${globalStore.apiLink}/api/sections/about`,
          {
            method: "PATCH",
            headers,
            body: data,
          }
        );
        console.log(response);

        clearInterval(int);
        this.about_save_button = "Save";
        this.about_background = "";
        this.about_image_file = "";
        this.about_text_changed = false;
      } catch (err) {
        this.about_save_button = "Save";
        console.error(err);
      }
    },
  },
});
