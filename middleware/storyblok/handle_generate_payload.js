/**
 *  Site Generation Payload handling
 * @param {*} context
 */
export default function({ store, payload }) {
  if (!payload) {
    return;
  }
  if (payload.stories) {
    console.log("Setting stories", payload.stories);
    store.commit("SET_STORIES", payload.stories);
  }
  if (payload.settings) {
    console.log("Setting settings", payload.settings);
    store.commit("SET_SETTINGS", payload.settings);
  }
}
