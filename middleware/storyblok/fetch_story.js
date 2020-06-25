export default function({ store, route }) {
  if (!store.getters.getStoryByRoute(route)) {
    return store.dispatch("fetchStory", route);
  }
}
