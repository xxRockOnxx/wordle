// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "Wordle Word Finder",
      meta: [
        {
          charset: "utf-8",
          name: "description",
          content: "Simple app that finds 5 letter words given the good letters, bad letters, and letter positions.",
        },
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
      },
    ],
  ],
});
