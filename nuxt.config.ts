// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css", "~/assets/scss/main.scss"],
  modules: [
    "@nuxt/icon",
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    "@hypernym/nuxt-gsap",
    "@nuxt/scripts",
  ],

  app: {
    head: {
      title: "Dhafir",
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @use "~/assets/scss/vars/colors.scss" as *;
          @use "~/assets/scss/vars/sizes.scss" as *;
          `,
        },
      },
    },
  },
  gsap: {
    autoImport: true,
    composables: true,
    extraPlugins: {
      scrollTrigger: true,
      draggable: true,
      motionPath: true,
      scrollTo: true,
      observer: true,
      text: true,
    },
  },
});