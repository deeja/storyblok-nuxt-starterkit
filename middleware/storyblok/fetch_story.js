import { storeActions } from '@/store/index';

export default ({ store, route }) => {
  if (shouldIgnore(route)) {
    return;
  }

  if (store.getters.inDraftMode || !store.getters.getStoryByRoute(route)) {
    return store.dispatch(storeActions.FETCH_STORY_BY_ROUTE, route);
  }
};

/**
 * Simple ignoring function for stopping fetching of bad routes
 */
function shouldIgnore(route) {
  const path = route.params.pathMatch;
  return path.startsWith('__') || path.includes('http') || path.includes('sse');
}
