const BASE_STORY_URL = "cdn/stories/";
const BASE_LINKS_URL = "cdn/links";
const BASE_SPACES_URL = "cdn/spaces/me/";

const stateBuilder  = () => ({
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
  SET_DRAFT_MODE(state, useDraftMode) {
    if (useDraftMode) {
      console.log("DRAFT MODE ENABLED - CLEARING STATE");
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
  SET_CACHE_VERSION(state, version) {
    state.cacheVersion = version;
  },
  ADD_STORY(state, story) {
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
  UPDATE_STORY(state, story) {
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
  fetchCacheVersion({ commit }) {
    return this.$storyapi.get(BASE_SPACES_URL).then(res => {
      const cacheVersion = res.data.space.version;
      commit("SET_CACHE_VERSION", cacheVersion);
    });
  },
  fetchStory({ commit, state }, route) {
    const storyPath = getStoryPath(route);
    return this.$storyapi
      .get(BASE_STORY_URL + storyPath, getRequestOptions(state))
      .then(res => {
        commit("ADD_STORY", res.data.story);
      })
      .catch(err => {
        console.error(err);
      });
  },
  fetchStoryById({ commit, state }, id) {
    return this.$storyapi
      .get(BASE_STORY_URL + id, {
        find_by: "uuid",
        ...getRequestOptions(state)
      })
      .then(res => {
        commit("ADD_STORY", res.data.story);
      })
      .catch(err => {
        console.error(err);
      });
  },
  fetchStoryBySlug({ commit, state }, slug) {
    return this.$storyapi
      .get(BASE_STORY_URL + slug, getRequestOptions(state))
      .then(res => {
        commit("ADD_STORY", res.data.story);
      })
      .catch(err => {
        console.error(err);
      });
  },
  fetchStories({ commit, state }, startsWith) {
    return this.$storyapi
      .get(BASE_STORY_URL, {
        ...getRequestOptions(state),
        starts_with: startsWith,
        is_startpage: 0
      })
      .then(res => {
        res.data.stories.forEach(s => {
          commit("ADD_STORY", s);
        });
      })
      .catch(err => {
        console.error(err);
      });
  }
};

export const getters = {
  getCacheVersion(state) {
    return state.cacheVersion;
  },
  getStoryByRoute: state => route => {
    const storyPath = getStoryPath(route);
    return state.stories[storyPath] || null;
  },
  getStoryBySlug: state => slug => {
    return state.stories[slug] || null;
  },
  getStoryById: state => id => {
    return state.stories[id] || null;
  },
  getStories: state => startsWith => {
    const keys = Object.keys(state.stories).filter(_ =>
      _.startsWith(startsWith)
    );
    return keys.map(_ => state.stories[_]);
  },
  inDraftMode: state => state.draftMode
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

const getRequestOptions = state => {
  const mode = getMode(state);
  const cacheVersion = state.draftMode ? 0 : state.cacheVersion;
  return { version: mode, cacheVersion };
};

const getStorySlug = path =>
  (path && path.replace(/(^\/+|\/$)/g, "")) || "home";

const getMode = state => (state.draftMode ? "draft" : "published");
