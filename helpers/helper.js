import crypto from "crypto";
import marked from "marked";

export function markdown(string, param) {
  return marked(resize(string, param));
}

export function resize(str, param) {
  return typeof str === "undefined"
    ? ""
    : str.replace(/a.storyblok.com/g, "img2.storyblok.com/" + param);
}

export function isEditMode(app, query) {
  // Want to know more about this? https://www.storyblok.com/docs/Guides/storyblok-latest-js
  const space_id = query["_storyblok_tk[space_id]"];
  const timestamp = +query["_storyblok_tk[timestamp]"];
  const providedToken = query["_storyblok_tk[token]"];

  // hash it using sha1
  const generatedToken = crypto
    .createHash("sha1")
    .update(`${space_id}:${app.$storyapi.accessToken}:${timestamp}`)
    .digest("hex");

  // check if the controlToken is equal to the validation token passed as param
  // and if timestamp is in the last 60 minutes.
  const tokenMatch =  providedToken === generatedToken;
  const withinTime = timestamp > Math.floor(Date.now() / 1000) - 3600;
  return tokenMatch && withinTime;
}
