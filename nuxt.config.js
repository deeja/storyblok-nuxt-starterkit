// NOTE: The Storyblok token should not be stored in this config.
// Using an environment variable is a good choice
// e.g. const token = env.STORYBLOCK_TOKEN
const STORYBLOK_TOKEN = "fRhLxFwXxMQSuteNdL1Lrwtt";

export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: "spa",
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
      "NuxtWebsite - Create your website with NuxtJS, Storyblok and deploy it on Netlify.",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content:
          "A simple Nuxt.js setup to create websites with blog feature using Storyblok as CMS and Netlify to deploy it."
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
    fallback: true, // 404.html generation + _redirects file in static folder
    routes: () => siteRouteGenerator(STORYBLOK_TOKEN)
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, { isClient, isDev, loaders: { vue } }) {
      if (isDev) {
        config.devtool = "source-map";
      }
      vue.transformAssetUrls.LazyImage = ["src"];
    }
  }
};
