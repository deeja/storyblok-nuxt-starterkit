<template>
  <div>
    <div v-if="!story">No story found</div>
    <component
      :is="story.content.component | dashify"
      v-else-if="story.content.component"
      :key="story.content._uid"
      :blok="story.content"
    ></component>
  </div>
</template>
<script>
export default {
  fetch() {
    this.story = this.$store.getters.getStoryByRoute(this.$route);
  },
  data() {
    return { story: null };
  },
  validate({ store, route }) {
    return store.getters.getStoryByRoute(route);
  }
};
</script>
