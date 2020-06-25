/**
 *  Site Generation Payload handling
 * @param {*} context
 */
export default function({ store, payload }) {
  if (!payload) {
    return;
  }
  if (payload.stories) {
    console.log("Setting stories", payload.stories.length);
    for (const s of payload.stories) {
      store.commit("ADD_STORY", s);  
    }    
  }  
}
