/**
@summary Default Store
https://old.reddit.com/r/vuejs/comments/9bao0t/recommended_approach_to_lazy_loading_with_vuex/e52y42m/
*/
export const state = () => ({
  cacheVersion: 0,
  draftMode: false,
  stories: {},
  menuLinks: null
});

export const mutations = {
  /**
   *
   * @param {*} state
   * @param {*} useDraftMode set draft mode true = on
   */
  SET_DRAFT_MODE(state, useDraftMode) {
    if (useDraftMode) {
      console.log("DRAFT MODE ENABLED");
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
    console.log("CACHE VERSION: ", version); // keep so cache version is visible on build
    state.cacheVersion = version;
  },
  ADD_STORY(state, payload) {
    const updated = { [payload.path]: payload.story, ...state.stories };
    state.stories = updated;
  },
  SET_STORIES(state, stories) {
    state.stories = stories;
  },
  SET_MENU_LINKS(state, menuLinks) {
    state.menuLinks = menuLinks;
  },
  UPDATE_STORY(state, story) {
    const stories = state.stories;
    for (const key in stories) {
      if (stories[key].id === story.id) {
        Object.assign(stories[key], story);
      }
    }
  }
};

export const actions = {
  fetchCacheVersion({ commit }) {
    return this.$storyapi.get("cdn/spaces/me/").then(res => {
      const cacheVersion = res.data.space.version;
      commit("SET_CACHE_VERSION", cacheVersion);
    });
  },
  fetchStory({ commit, state }, route) {
    const storyPath = getStoryPath(route);
    return this.$storyapi
      .get(storyPath, getRequestOptions(state))
      .then(res => {
        commit("ADD_STORY", { path: storyPath, story: res.data.story });
      })
      .catch(err => {
        console.error(err);
      });
  },
  fetchMenuLinks({ commit, state }) {
    const path = "cdn/links";

    return this.$storyapi
      .get(path, getRequestOptions(state))
      .then(res => res.data)
      .then(data => {
        const linkArray = Object.values(data.links);
        const links = linkArray.map(l => {
          const { real_path, id, parent_id, is_folder, name, position } = l;
          return {
            slug: real_path,
            id,
            parent_id,
            is_folder,
            name,
            position
          };
        });

        commit("SET_MENU_LINKS", links);
      })
      .catch(error => {
        console.error(error);
      });
  }
};

export const getters = {
  getCacheVersion(state) {
    return state.cacheVersion;
  },
  getMenuLinks(state) {
    return state.menuLinks;
  },
  getStory: state => route => {
    const cdnPath = getStoryPath(route);
    return state.stories[cdnPath] || null;
  },
  inDraftMode: state => state.draftMode
};

const getStoryPath = ({ query, params }) => {
  let storyId;
  if (query._storyblok) {
    storyId = query._storyblok;
  } else {
    storyId = getCdnPath(params.pathMatch);
  }
  return "cdn/stories/" + storyId;
};

const getRequestOptions = state => {
  const mode = getMode(state);
  const cacheVersion = state.draftMode ? 0 : state.cacheVersion;
  return { version: mode, cacheVersion };
};

const getCdnPath = path => (path || "home");

const getMode = state => (state.draftMode ? "draft" : "published");
