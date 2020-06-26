<template>
  <div class=" px-lg-5 p-md-1">
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
import {
  reactToEdits
} from "@/helpers/Storyblok";
export default {  
  computed: {
    story() {
      const story = this.$store.getters.getStoryByRoute(this.$route);
      if (process.client && this.$store.state.draftMode) {
        reactToEdits(this, story);
      }
      return story;
    }
  },
  validate({store, route}) {
    return store.getters.getStoryByRoute(route);
  }
};
</script>