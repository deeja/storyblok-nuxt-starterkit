// NOTE: The Storyblok token should not be stored in this config.
// Using an environment variable is a good choice
// e.g. const token = process.env.STORYBLOK_TOKEN
const STORYBLOK_TOKEN =
  process.env.STORYBLOK_TOKEN || "fRhLxFwXxMQSuteNdL1Lrwtt";

export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: "universal",
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: "static",
  /*
   ** Headers of the page
   */
  head: {
    title: "Storyblok + Nuxt.js - A starter kit",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content:
          "A starter kit for building a JAMStack + Headless CMS solution; built with Nuxt.js and Storyblok"
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
   ** Basic Components and Content Type setup
   */
  plugins: [
    "@/plugins/content-types",
    "@/plugins/filters",
    "@/plugins/components",
    "@/plugins/helper",
    "@/plugins/handle_generate_payload",
    "@/plugins/cache_version",
    "@/plugins/enable_draft_mode",
    "@/plugins/fetch_layout",
    "@/plugins/fetch_story",
    "@/plugins/fetch_menu_links"
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    [
      "storyblok-nuxt",
      {
        accessToken: STORYBLOK_TOKEN,
        cacheProvider: "memory",
        excludeHeaderScript: false
      }
    ]
  ],
  router: {
    middleware: [
  
    ]
  },
  /*
   ** Generate Routes via Storybloks Links API.
   */
  generate: {
    crawler: false, // don't crawl the generated pages for more links
    fallback: true, // 404.html generation + _redirects file in static folder
    routes: () => require("./helpers/SiteGeneration")(STORYBLOK_TOKEN)
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, { isDev }) {
      if (isDev) {
        config.devtool = "source-map";
      }
    }
  }
};
