const BASE_STORY_URL = 'cdn/stories/';
const BASE_SPACES_URL = 'cdn/spaces/me/';

export const storeActions = {
  FETCH_STORIES: 'Fetch Stories',
  FETCH_STORY_BY_ROUTE: 'Fetch Story by route',
  FETCH_STORY_BY_UUID: 'Fetch Story by UUID',
  FETCH_CACHE_VERSION: 'Fetch Cache version',
  FETCH_STORY_BY_SLUG: 'Fetch Story by slug'
};

export const storeMutations = {
  SET_DRAFT_MODE: 'Set Draft Mode',
  SET_CACHE_VERSION: 'Set Cache Version',
  UPDATE_STORY: 'Update Story',
  ADD_STORY: 'Add Story'
};

const stateBuilder = () => ({
  cacheVersion: 0,
  draftMode: false,
  stories: {}
});

export const state = stateBuilder;

export const mutations = {
  /** Sets the Site to draft mode, meaning pages are the latest unpublished versions.
   *  State is cleared (un-does the state.js loading) to allow the editing of stories
   * @param {*} state
   * @param {*} useDraftMode set draft mode true = on
   */
  [storeMutations.SET_DRAFT_MODE](state, useDraftMode) {
    if (useDraftMode) {
      console.log('DRAFT MODE ENABLED - CLEARING STATE');
      Object.assign(state, stateBuilder());
    }
    state.draftMode = useDraftMode;
  },
  /**
   * Set the cache
   * https://www.storyblok.com/docs/api/content-delivery#topics/cache-invalidation
   * @param {*} state
   * @param {*} version
   */
  [storeMutations.SET_CACHE_VERSION](state, version) {
    state.cacheVersion = version;
  },
  [storeMutations.ADD_STORY](state, story) {
    // TODO: handle translated_slugs
    const updated = {
      [getStorySlug(story.full_slug)]: story,
      [story.uuid]: story,
      [story.id]: story,
      ...state.stories
    };
    state.stories = updated;
  },
  /**
   * Replaces stories as they are being edited
   * @param {*} state
   * @param {*} story
   */
  [storeMutations.UPDATE_STORY](state, story) {
    const stories = state.stories;
    // replace stories in the array with the same id
    for (const key in stories) {
      if (stories[key].id === story.id) {
        Object.assign(stories[key], story);
      }
    }
  }
};

export const actions = {
  [storeActions.FETCH_CACHE_VERSION]({ commit }) {
    return this.$storyapi.get(BASE_SPACES_URL).then((res) => {
      const cacheVersion = res.data.space.version;
      commit(storeMutations.SET_CACHE_VERSION, cacheVersion);
    });
  },
  [storeActions.FETCH_STORY_BY_ROUTE]({ commit, state }, route) {
    const storyPath = getStoryPath(route);
    return this.$storyapi
      .get(BASE_STORY_URL + storyPath, getRequestOptions(state))
      .then((res) => {
        commit(storeMutations.ADD_STORY, res.data.story);
      })
      .catch((err) => {
        console.error(err);
      });
  },
  [storeActions.FETCH_STORY_BY_UUID]({ commit, state }, id) {
    return this.$storyapi
      .get(BASE_STORY_URL + id, {
        find_by: 'uuid',
        ...getRequestOptions(state)
      })
      .then((res) => {
        commit(storeMutations.ADD_STORY, res.data.story);
      })
      .catch((err) => {
        console.error(err);
      });
  },
  [storeActions.FETCH_STORY_BY_SLUG]({ commit, state }, slug) {
    return this.$storyapi
      .get(BASE_STORY_URL + slug, getRequestOptions(state))
      .then((res) => {
        commit(storeMutations.ADD_STORY, res.data.story);
      })
      .catch((err) => {
        console.error(err);
      });
  },
  [storeActions.FETCH_STORIES]({ commit, state }, startsWith) {
    return this.$storyapi
      .get(BASE_STORY_URL, {
        ...getRequestOptions(state),
        starts_with: startsWith,
        is_startpage: 0
      })
      .then((res) => {
        res.data.stories.forEach((s) => {
          commit(storeMutations.ADD_STORY, s);
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }
};

export const getters = {
  getCacheVersion(state) {
    return state.cacheVersion;
  },
  getStoryByRoute: (state) => (route) => {
    const storyPath = getStoryPath(route);
    return state.stories[storyPath] || null;
  },
  getStoryBySlug: (state) => (slug) => {
    return state.stories[slug] || null;
  },
  getStoryById: (state) => (id) => {
    return state.stories[id] || null;
  },
  getStories: (state) => (startsWith) => {
    const keys = Object.keys(state.stories).filter((_) =>
      _.startsWith(startsWith)
    );
    return keys.map((_) => state.stories[_]);
  },
  inDraftMode: (state) => state.draftMode
};

const getStoryPath = ({ query, params }) => {
  let storyId;
  if (query._storyblok) {
    storyId = query._storyblok;
  } else {
    storyId = getStorySlug(params.pathMatch);
  }
  return storyId;
};

const getRequestOptions = (state) => {
  const mode = getMode(state);
  const cacheVersion = state.draftMode ? 0 : state.cacheVersion;
  return { version: mode, cacheVersion };
};

const getStorySlug = (path) =>
  (path && path.replace(/(^\/+|\/$)/g, '')) || 'home';

const getMode = (state) => (state.draftMode ? 'draft' : 'published');
