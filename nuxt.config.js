const axios = require('axios')

export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
  ** Headers of the page
  */
  head: {
    title: 'NuxtWebsite - Create your website with NuxtJS, Storyblok and deploy it on Netlify.',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'A simple Nuxt.js setup to create websites with blog feature using Storyblok as CMS and Netlify to deploy it.' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  css: [
  ],
  loading: { color: '#3B8070' },
  /*
  ** Basic Components and Content Type setup
  */
  plugins: [
    '@/plugins/content-types',
    '@/plugins/components',
    '@/plugins/helper'
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  ** Storyblok Client
  */
  components: true,
  modules: [
    ['storyblok-nuxt', {accessToken: '0MUsLPPq9VSfVcwp8u05LQtt', cacheProvider: 'memory', excludeHeaderScript: false }]
  ],
  /*
  ** Generate Routes via Storybloks Links API.
  */
  generate: {
    routes: function (callback) {
      const token = `0MUsLPPq9VSfVcwp8u05LQtt`
      const per_page = 100
      const version = `draft`
      
      let page = 1
      let routes = []

      // Call first Page of the Links API: https://www.storyblok.com/docs/Delivery-Api/Links
      axios.get(`https://api.storyblok.com/v1/cdn/links?token=${token}&version=${version}&per_page=${per_page}&page=${page}`).then((res) => {
        Object.keys(res.data.links).forEach((key) => {
          if (res.data.links[key].slug != 'home') {
            routes.push('/' + res.data.links[key].slug)
          }
        })

        // Check if there are more pages available otherwise execute callback with current routes.
        const total = res.headers.total
        const maxPage = Math.ceil(total / per_page)
        if(maxPage <= 1) {
          callback(null, routes)
        }

        // Since we know the total we now can pregenerate all requests we need to get all Links
        let contentRequests = [] 
        for (let page = 2; page <= maxPage; page++) {
          contentRequests.push(axios.get(`https://api.storyblok.com/v1/cdn/links?token=${token}&version=${version}&per_page=${per_page}&page=${page}`))
        }

        // Axios allows us to execute all requests using axios.spread we will than generate our routes and execute the callback
        axios.all(contentRequests).then(axios.spread((...requests) => {
          requests.forEach((request) => {
            Object.keys(request.data.links).forEach((key) => {
              if (request.data.links[key].slug != 'home') {
                routes.push('/' + request.data.links[key].slug)
              }
            })
          })
        
          callback(null, routes)
        })).catch(callback)
      })
    }
  },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
