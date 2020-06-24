export default function({ app, isServer, route, store, isDev }) {
  if (!store.getters.getLayout) {
    return store.dispatch("fetchLayout");
  }
}
