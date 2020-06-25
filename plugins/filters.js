import Vue from "vue";


/**
 * Transform images using the storyblok image service
 * https://www.storyblok.com/tp/storyblok-image-service-vuejs
 * https://www.storyblok.com/docs/image-service
 * @param {*} image Original Image URL
 * @param {*} sizeOptions Transform options https://www.storyblok.com/tp/storyblok-image-service-vuejs
 */
Vue.filter("resize", (image, sizeOptions) => {
  if (typeof image === "undefined") {
    return null;
  }  
  return '//img2.storyblok.com/' + sizeOptions + image.replace('//a.storyblok.com', '')
});


/**
 * Used for dynamic component naming; value is the control name in the storyblok response.
 * @param {*} componentName Storyblok component name
 * @returns {*} Local component name
 */
Vue.filter("dashify", function(componentName) {
  if (typeof componentName === "undefined") {
    return "undefined";
  }
  let dashified = componentName
    .toString()
    .replace(/([A-Z])/g, " $1")
    .trim()
    .toLowerCase()
    .replace(/[ _]/g, "-");

  return "blok-" + dashified;
});
