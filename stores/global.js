import { defineStore } from "pinia";

export const useMyGlobalStore = defineStore({
  id: "myGlobalStore",
  state: () => ({
    socialLinks: [
      {
        name: "instagram",
        icon: "simple-icons:instagram",
        link: "https://www.instagram.com/dhafrrr/",
        id: 1,
      },
      {
        name: "vimeo",
        icon: "simple-icons:vimeo",
        link: "https://vimeo.com/dhafir",
        id: 2,
      },
      {
        name: "linkedin",
        icon: "simple-icons:linkedin",
        link: "https://iq.linkedin.com/in/dhafir-ayad-739562142",
        id: 3,
      },
    ],
    apiLink: "https://dhafir-api.vercel.app",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlkIjoiNjc3MzczYzhhOGQzODM3NmFjZjVlYTczIiwiaWF0IjoxNzM1NzMzOTY5LCJleHAiOjE3MzU4MjAzNjl9.9ScRMwsl0XTv2BfhhDrABaGUGcdGEL_eelIYzMeTmoU",
    },
    ball: {
      grow: false,
      play_icon: false,
      icon: "",
      show: false,
    },
  }),
  actions: {
    timeAgo(date) {
      const now = new Date();
      const secondsPast = Math.floor((now - new Date(date)) / 1000);
      const minutes = Math.floor(secondsPast / 60);
      const hours = Math.floor(secondsPast / 3600);
      const days = Math.floor(secondsPast / 86400);
      const months = Math.floor(days / 30);
      const years = Math.floor(days / 365);

      if (secondsPast < 60) {
        return `${secondsPast} seconds ago`;
      } else if (minutes < 60) {
        return `${minutes} minutes ago`;
      } else if (hours < 24) {
        return `${hours} hours ago`;
      } else if (days < 30) {
        return `${days} days ago`;
      } else if (months < 12) {
        return `${months} months ago`;
      } else {
        return `${years} years ago`;
      }
    },
    extractVimeoId(url) {
      const regex = /vimeo\.com\/(?:.*#|.*\/videos\/|.*\/|)(\d+)/i;
      const match = url.match(regex);
      return match ? match[1] : null;
    },
    ballEnter(icon) {
      this.ball.icon = icon;
      this.ball.grow = true;
      this.ball.show = true;
    },
    ballLeave() {
      this.ball.icon = "";
      this.ball.grow = false;
      this.ball.show = false;
    },
  },
});
