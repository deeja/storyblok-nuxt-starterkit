import {isEditMode} from './../helpers/helper'

export default function({ app, store , route: {query}}) {
  // check if in draft mode using query string storyblok token

  const draftMode = isEditMode(app, query);
  if (store.state.draftMode !== draftMode) {    
    return store.commit("SET_DRAFT_MODE", draftMode);
  }
}
