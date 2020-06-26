/*
** TailwindCSS Configuration File
**
** Docs: https://tailwindcss.com/docs/configuration
** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
*/
module.exports = {
  theme: {},
  variants: {},
  plugins: [],
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css

    // NORMALLY WOULD BE ENABLED, BUT CONTROL IS NEEDED IF DYNAMICALLY USING CLASSES FROM STORYBOOK - info in the readme
    enabled: false
    // enabled: process.env.NODE_ENV === 'production',
    // content: [
    //   'components/**/*.vue',
    //   'layouts/**/*.vue',
    //   'pages/**/*.vue',
    //   'plugins/**/*.js',
    //   'nuxt.config.js'
    // ]
  }
}
