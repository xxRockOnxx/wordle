// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
      title: "Wordle Word Finder",
      meta: [
        {
          charset: "utf-8",
          name: "description",
          content:
            "Simple app that finds 5 letter words given the good letters, bad letters, and letter positions.",
        },
        {
          name: "og:title",
          content: "Wordle Word Finder",
        },
        {
          name: "og:description",
          content:
            "Simple app that finds 5 letter words given the good letters, bad letters, and letter positions.",
        },
        {
          name: "og:image",
          content: process.env.URL + "/og-image.png",
        },
        {
          name: 'google-site-verification',
          content: 'CZUVt9lZVrvrRQtotNlynFOmTvvrasfVi8FEKgYPb_s'
        }
      ],
    },
  },

  css: ["~/assets/main.css"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: [
    [
      "@nuxtjs/google-fonts",
      {
        families: {
          "Source+Code+Pro": [500],
        },
        download: false,
      },
    ],

    ['nuxt-simple-sitemap', {
      siteUrl: process.env.URL
    }]
  ],
});
