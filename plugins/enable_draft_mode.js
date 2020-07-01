import { reactToEdits, isEditMode } from '@/helpers/Storyblok';
import { storeMutations, storeActions } from '@/store/index';

export default ({ app, store, route, enablePreview, $storybridge }) => {
  // check if in draft mode using query string storyblok token
  const edit = isEditMode(app, route.query);
  if (edit) {
    if (process.client) {
      reactToEdits($storybridge, store, app, route.query);
    }
    // enable preview if exists https://nuxtjs.org/blog/going-full-static/
    enablePreview && enablePreview();
    store.commit(storeMutations.SET_DRAFT_MODE, route.query);
    return store.dispatch(storeActions.FETCH_STORY_BY_ROUTE, route);
  }
};
