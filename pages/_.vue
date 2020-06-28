<template>
  <div class="lg:px-5 md:p-1">
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
import { reactToEdits } from "@/helpers/Storyblok";
export default {
  computed: {
    story() {
      return this.$store.getters.getStoryByRoute(this.$route);
    }
  },
  validate({ store, route }) {
    return store.getters.getStoryByRoute(route);
  },
  mounted() {
    if (process.client && this.$store.state.draftMode) {
      reactToEdits(this);
    }
  }
};
</script>