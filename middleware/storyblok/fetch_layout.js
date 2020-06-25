export default function({ app, isServer, route, store, isDev }) {
  return store.dispatch("fetchStoryBySlug", "global")
}
