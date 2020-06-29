import crypto from "crypto";
import marked from "marked";

const STORYBLOK_TIMESTAMP = "_storyblok_tk[timestamp]";
const STORYBLOK_TOKEN = "_storyblok_tk[token]";
const STORYBLOK_SPACE_ID = "_storyblok_tk[space_id]";

// Storyblok Module uses storyblok-js-client
// https://github.com/storyblok/storyblok-js-client

const getTimestamp = () => Math.floor(Date.now() / 1000) - 3600;

const getFutureTimestamp = (hours = 1) =>
  getTimestamp() + hours * 60 * 60 * 1000;

/**
 * Reacts (updates and reloads) on changes within the editing UI
 * @param {*} component
 * @param {*} story
 */
export const reactToEdits = function(storybridge, store, app, query) {
  // need the credentials on redirect

  storybridge.on(["input", "published", "change"], event => {
    if (event.action == "input") {
      store.commit("UPDATE_STORY", event.story);
    } else {
      // force reload on save to whatever page has been routed to (not current url as that stays the same)
      const newLocation = buildRedirectLocation(app, query);
      window.location.href = newLocation;
    }
  });
  console.log("STORYBRIDGE UP");
};

const buildRedirectLocation = (app, query) => {
  const newTimestamp = getFutureTimestamp();
  const spaceId = query[STORYBLOK_SPACE_ID];
  const accessToken = app.$storyapi.accessToken;
  const newToken = generateToken(newTimestamp, spaceId, accessToken);

  const searchParams = new URLSearchParams();
  Object.keys(query).forEach(key => searchParams.set(key, query[key]));
  searchParams.set(STORYBLOK_TIMESTAMP, newTimestamp);
  searchParams.set(STORYBLOK_TOKEN, newToken);  
  const currentRoutePath = app.router.currentRoute.path;
  return currentRoutePath + "?" + searchParams.toString();
}

export const generateToken = (timestamp, spaceId, accessToken) => {
  return crypto
    .createHash("sha1")
    .update(`${spaceId}:${accessToken}:${timestamp}`)
    .digest("hex");
};

export function isEditMode(app, query) {
  // Edit mode validation https://www.storyblok.com/docs/Guides/storyblok-latest-js
  const spaceId = +query[STORYBLOK_SPACE_ID];
  const timestamp = +query[STORYBLOK_TIMESTAMP];
  const providedToken = query[STORYBLOK_TOKEN];

  // hash it using sha1
  const generatedToken = generateToken(
    timestamp,
    spaceId,
    app.$storyapi.accessToken
  );

  // check if the controlToken is equal to the validation token passed as param
  // and if timestamp is in the last 60 minutes.
  const tokenMatch = providedToken === generatedToken;
  const withinTime = timestamp > getTimestamp();
  return tokenMatch && withinTime;
}



export function markdown(string, param) {
  return marked(resizeImage(string, param));
}

export function resizeImage(str, param) {
  return typeof str === "undefined"
    ? ""
    : str.replace(/a.storyblok.com/g, "img2.storyblok.com/" + param);
}
