const BASE_STORY_URL = "cdn/stories/";
const BASE_LINKS_URL = "cdn/links";
const BASE_SPACES_URL = "cdn/spaces/me/";

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
  },
  fetchMenuLinks({ commit, state }) {
    return this.$storyapi
      .get(BASE_LINKS_URL, getRequestOptions(state))
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
