export default ({ store, payload }) => {
  if (!payload) {
    return store.dispatch('fetchStoryBySlug', 'global');
  }
};
