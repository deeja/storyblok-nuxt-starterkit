export default ({ store }) => {
  if (!store.getters.getCacheVersion) {
    return store.dispatch('fetchCacheVersion');
  }
};
