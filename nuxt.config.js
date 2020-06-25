// NOTE: The Storyblok token should not be stored in this config.
// Using an environment variable is a good choice
// e.g. const token = process.env.STORYBLOCK_TOKEN
const STORYBLOK_TOKEN = process.env.STORYBLOCK_TOKEN || "fRhLxFwXxMQSuteNdL1Lrwtt"; 

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
    title:
      "Storyblok + Nuxt.js - A starter kit",
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
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
    
      { rel: 'stylesheet', href: "https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" }
    ]
  },
  /*
   ** Customize the progress bar color
   */
    css: [],
  loading: { color: "#3B8070" },
  /*
   ** Basic Components and Content Type setup
   */
  plugins: [
    "@/plugins/content-types",
    "@/plugins/filters",
    "@/plugins/components",
    "@/plugins/helper"
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Storyblok Client
   */
  modules: [
    [ "storyblok-nuxt",
      {
        accessToken: STORYBLOK_TOKEN,
        cacheProvider: "memory",
        excludeHeaderScript: false
      }
    ]
  ],
  router: {
    middleware: [
      "storyblok/handle_generate_payload",
      "storyblok/cache_version",
      "storyblok/enable_draft_mode",      
      "storyblok/fetch_layout",
      "storyblok/fetch_story",
      "storyblok/fetch_menu_links"
    ]
  },
  /*
   ** Generate Routes via Storybloks Links API.
   */
  generate: {
    crawler: false, // don't crawl the generated pages for more links
    fallback: true, // 404.html generation + _redirects file in static folder
    routes: () => require('./helpers/SiteGeneration')(STORYBLOK_TOKEN)
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
