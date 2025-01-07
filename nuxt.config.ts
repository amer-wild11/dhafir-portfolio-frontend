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
      title: "Dhafir Ayad - Film Director",
      meta: [
        {
          name: "description",
          content:
            "Dhafir Ayad is a Film Director from Iraq, founder of Frame Vision Productions since 2016, holding a Bachelor's degree in Arts in TV & Cinema from the University of Baghdad.",
        },
        {
          name: "keywords",
          content:
            "Dhafir Ayad, Film Director, Frame Vision Productions, Iraqi Director, TV and Cinema, University of Baghdad, Advertising, Filmmaker, Content Creator, Video Production, Art Director, Cinematography",
        },
        {
          property: "og:title",
          content: "Dhafir Ayad - Film Director",
        },
        {
          property: "og:description",
          content:
            "Dhafir Ayad is a Film Director from Iraq, founder of Frame Vision Productions since 2016, holding a Bachelor's degree in Arts in TV & Cinema from the University of Baghdad.",
        },
        {
          property: "og:image",
          content: "https://dhafir-ayad.com/meta/image1.png",
        },
        { property: "og:url", content: "https://dhafir-ayad.com" },
        { property: "og:type", content: "profile" },
        {
          name: "twitter:title",
          content: "Dhafir Ayad - Film Director",
        },
        {
          name: "twitter:description",
          content:
            "Dhafir Ayad is a Film Director from Iraq, founder of Frame Vision Productions since 2016, holding a Bachelor's degree in Arts in TV & Cinema from the University of Baghdad.",
        },
        {
          name: "twitter:image",
          content: "https://dhafir-ayad.com/meta/image1.png",
        },
        { name: "twitter:card", content: "summary_large_image" },
        { property: "og:title", content: "Dhafir Ayad - Instagram Profile" },
        {
          property: "og:description",
          content:
            "Follow Dhafir Ayad on Instagram to see behind-the-scenes content and creative projects.",
        },
        { property: "og:url", content: "https://www.instagram.com/dhafrrr/" },
        {
          property: "og:image",
          content: "https://dhafir-ayad.com/meta/image1.png",
        },
        { property: "og:title", content: "Dhafir Ayad - Vimeo Profile" },
        {
          property: "og:description",
          content:
            "Watch Dhafir Ayad’s creative works and commercials on Vimeo.",
        },
        { property: "og:url", content: "https://vimeo.com/dhafir" },
        {
          property: "og:image",
          content: "https://dhafir-ayad.com/meta/image1.png",
        },
        {
          property: "og:title",
          content: "Dhafir Ayad - Film Director",
        },
        {
          property: "og:description",
          content:
            "View Dhafir Ayad’s profile on LinkedIn to learn more about his work in directing commercials and video production.",
        },
        {
          property: "og:url",
          content: "https://iq.linkedin.com/in/dhafir-ayad-739562142",
        },
        {
          property: "og:image",
          content: "https://dhafir-ayad.com/meta/image1.png",
        },
      ],
      script: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Dhafir Ayad",
            url: "https://dhafir-ayad.com",
            image: "https://dhafir-ayad.com/meta/image1.png",
            jobTitle: "Film Director",
            worksFor: {
              "@type": "Organization",
              name: "Frame Vision Productions",
            },
            sameAs: [
              "https://iq.linkedin.com/in/dhafir-ayad-739562142",
              "https://vimeo.com/dhafir",
              "https://www.instagram.com/dhafrrr/",
            ],
          }),
        },
      ],
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
