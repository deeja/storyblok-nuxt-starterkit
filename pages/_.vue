<template>
  <div>
    <div v-if="!story">No story found</div>
    <component
      v-else-if="story.content.component"
      :key="story.content._uid"
      :blok="story.content"
      :is="story.content.component | dashify"
    ></component>
  </div>
</template>
<script>
export default {
  data() {
    return {story:null}
  },  
  validate({ store, route }) {
    return store.getters.getStoryByRoute(route);
  },
  async fetch() {
    this.story = this.$store.getters.getStoryByRoute(this.$route);
  }
};
</script>