import crypto from "crypto";

// Storyblok Module uses storyblok-js-client
// https://github.com/storyblok/storyblok-js-client

/**
 * Reacts (updates and reloads) on changes within the editing UI
 * @param {*} component
 * @param {*} story
 */
export const reactToEdits = function(storybridge, store, router, query) {
  // need the credentials on redirect
  const storyBlokQuery = { ...query };
  storybridge.on(["input", "published", "change"], event => {
    if (event.action == "input") {
      store.commit("UPDATE_STORY", event.story);            
    } else {
      // force reload on save to whatever page has been routed to (not current url as that stays the same)
      const searchParams = new URLSearchParams();
      Object.keys(storyBlokQuery).forEach(key => searchParams.append(key, storyBlokQuery[key]));
      window.location = router.currentRoute.path + "?"+ searchParams.toString();
    }
  });
  console.log("STORYBRIDGE UP")
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


export const generateToken = (timestamp, spaceId, accessToken) => {
  return crypto
    .createHash("sha1")
    .update(`${spaceId}:${accessToken}:${timestamp}`)
    .digest("hex");    
}

export function isEditMode(app, query) {
  // Want to know more about this? https://www.storyblok.com/docs/Guides/storyblok-latest-js
  const spaceId = +query["_storyblok_tk[space_id]"];
  const timestamp = +query["_storyblok_tk[timestamp]"];
  const providedToken = query["_storyblok_tk[token]"];

  // hash it using sha1
  const generatedToken = generateToken(timestamp, spaceId, app.$storyapi.accessToken)

  // check if the controlToken is equal to the validation token passed as param
  // and if timestamp is in the last 60 minutes.
  const tokenMatch =  providedToken === generatedToken;
  const withinTime = timestamp > Math.floor(Date.now() / 1000) - 3600;
  return tokenMatch && withinTime;
}

import marked from "marked";

export function markdown(string, param) {
  return marked(resizeImage(string, param));
}

export function resizeImage(str, param) {
  return typeof str === "undefined"
    ? ""
    : str.replace(/a.storyblok.com/g, "img2.storyblok.com/" + param);
}

