export default function({ store }) {
  if (!store.getters.getCacheVersion) {
    return store.dispatch("fetchCacheVersion");
  }
}
