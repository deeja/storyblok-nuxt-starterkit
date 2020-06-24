export default function({ route:{query}, store }) {
  // check if in draft mode using query string storyblok token
  const draftMode = !!query._storyblok;
  if (store.state.draftMode !== draftMode) {
    return store.commit("SET_DRAFT_MODE", draftMode);
  }
}
