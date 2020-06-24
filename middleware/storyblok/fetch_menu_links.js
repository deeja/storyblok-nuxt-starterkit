export default function({ app, isServer, route, store, isDev }) {
  if (!store.getters.getMenuLinks) {
    return store.dispatch("fetchMenuLinks");
  }
}
