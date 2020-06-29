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
