export default function({ store, route }) {
  if (!store.getters.getStory(route)) {
    return store.dispatch("fetchStory", route);
  }
}
