export default function({ store, route }) {
  if (shouldIgnore(route)) {
    return;
  }

  if (store.getters.draftMode || !store.getters.getStoryByRoute(route)) {
    return store.dispatch("fetchStory", route);
  }
}

/**
 * Simple ignoring function for stopping fetching of bad routes
 */
function shouldIgnore(route) {
  const path = route.params.pathMatch
  return path.startsWith("__") || path.includes("http") || path.includes("sse");
}
