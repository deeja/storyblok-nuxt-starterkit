import { storeActions } from '@/store/index';

export default ({ store }) => {
  if (!store.getters.getCacheVersion) {
    return store.dispatch(storeActions.FETCH_CACHE_VERSION);
  }
};
