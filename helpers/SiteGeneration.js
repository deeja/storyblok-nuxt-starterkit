const storyblokUrl = "https://api.storyblok.com/v1/cdn";
const storyblokClient = require("axios").create({ baseURL: storyblokUrl });
const VERSION = "published";

// Modified version of https://www.storyblok.com/faq/how-to-generate-routes-for-nuxt-js-using-storyblok
module.exports = (storyblokToken) => {
  const token = storyblokToken;

  // other routes that are not in Storyblok with their slug.
  const routes = [];

  console.log("[Generate] Using token:", token);
  // Load space and receive latest cache version key to improve performance
  return storyblokClient
    .get(`/spaces/me?token=${token}`)
    .then(space_res => {
      // timestamp of latest publish
      const cache_version = space_res.data.space.version;
      //https://api.storyblok.com/v1/cdn/stories?starts_with=posts/&token=ask9soUkv02QqbZgmZdeDAtt
      // Call for all Links using the Links API: https://www.storyblok.com/docs/Delivery-Api/Links
      const url = `/stories?token=${token}&version=${VERSION}&cv=${cache_version}`;
      return storyblokClient.get(url);
    })
    .then(res => {
      // with all the stories downloaded
      const stories = res.data.stories;
      const payload = { stories: {} };

      // add them to the payload as they are stored in vuex
      for (const story of stories) {
        payload.stories["cdn/stories/" +story.full_slug] = story;
        const root = "pages/";
        if (story.full_slug.startsWith(root)) {
          const route = story.full_slug
            .replace(root, "/")
            .replace("/home", "/");
          routes.push({ route, payload });
        }
      }
    })
    .then(() => routes);
};
