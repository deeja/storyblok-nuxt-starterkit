import { storeActions } from '@/store/index';

export default ({ store, payload }) => {
  if (!payload) {
    return store.dispatch(storeActions.FETCH_STORY_BY_SLUG, 'global');
  }
};
