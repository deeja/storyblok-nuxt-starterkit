<template>
  <div>
    <div v-if="layout && layout.header">
      <div v-if="!layout.header.length" v-editable="layout">Define header blocks here</div>
      <component
        :key="blok._uid"
        v-for="blok in layout.header"
        :blok="blok"
        :is="blok.component | dashify"
      ></component>
    </div>
    <main id="main" role="main" class="w-2/3 mx-auto">
      <nuxt/>
    </main>
    <div v-if="layout && layout.footer">
      <div v-if="!layout.footer.length" v-editable="layout">Define footer blocks here</div>
      <component
        :key="blok._uid"
        v-for="blok in layout.footer"
        :blok="blok"
        :is="blok.component | dashify"
      ></component>
    </div>
  </div>
</template>
<script>
import { reactToEdits } from "@/helpers/Storyblok";

const layoutSlug = "global";
export default {
  computed: {
    layout() {
      const story = this.$store.getters.getStoryBySlug(layoutSlug);
      return story && story.content;
    }
  }
};
</script>