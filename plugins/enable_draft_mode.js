import { reactToEdits, isEditMode } from "@/helpers/Storyblok";

export default function({ app, store , route, enablePreview, $storybridge}) {
  // check if in draft mode using query string storyblok token
  const edit = isEditMode(app, route.query)
  if (edit) {    
    if (process.client) {
      reactToEdits($storybridge, store, app.router, route.query);
    }
    // enable preview if exists https://nuxtjs.org/blog/going-full-static/
    enablePreview && enablePreview(); 
    store.commit("SET_DRAFT_MODE", route.query);
    return store.dispatch("fetchStory", route)
  }
}
