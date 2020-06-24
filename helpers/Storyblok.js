// Storyblok Module uses storyblok-js-client
// https://github.com/storyblok/storyblok-js-client

const CONTENT_PAGE_ROOT = "/";

/**
 * Transform images using the storyblok image service
 * https://www.storyblok.com/tp/storyblok-image-service-vuejs
 * https://www.storyblok.com/docs/image-service
 * @param {*} image Original Image URL
 * @param {*} option Transform options https://www.storyblok.com/tp/storyblok-image-service-vuejs
 */
export const transformImage = function(image, option) {
  if (!image) return "";
  if (!option) return "";
  image = image.replace(/^http(s){0,1}:/, "");
  const imageService = "//img2.storyblok.com/";
  const path = image.replace("//a.storyblok.com", "");
  return imageService + option + path;
};

/**
 * Reacts (updates and reloads) on changes within the editing UI
 * @param {*} component
 * @param {*} story
 */
export const reactToEdits = function(component, story) {
  component.$storybridge.on(["input", "published", "change"], event => {
    if (event.action == "input") {
      if (event.story.id === story.id) {
        component.$store.commit("UPDATE_STORY", event.story);
      }
    } else {
      component.$nuxt.$router.go({
        path: component.$nuxt.$router.currentRoute,
        force: true
      });
    }
  });
};

/**
 * https://stackoverflow.com/a/40732240/59532
 * @param {*} links
 */
const buildLinkTree = dataset => {
  let hashTable = Object.create(null);
  dataset.forEach(
    aData => (hashTable[aData.id] = { ...aData, childNodes: [] })
  );
  let dataTree = [];
  dataset.forEach(aData => {
    if (aData.parent_id)
      hashTable[aData.parent_id].childNodes.push(hashTable[aData.id]);
    else dataTree.push(hashTable[aData.id]);
  });
  return dataTree;
};
