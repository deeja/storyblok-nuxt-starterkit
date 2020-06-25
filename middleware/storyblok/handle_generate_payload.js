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
    for (const s of payload.stories) {
      store.commit("SET_STORY", s);  
    }    
  }  
}
