export default function({ store, payload }) {
  if (!payload){
    return store.dispatch("fetchStoryBySlug", "global")
  }
}
