<template>
  <div class="px-1">
    <div v-if="layout && layout.header">
      <div v-if="!layout.header.length" v-editable="layout">
        Define header blocks here
      </div>
      <component
        :is="child.component | dashify"
        v-for="child in layout.header"
        :key="child._uid"
        :blok="child"
      ></component>
    </div>
    <main id="main" role="main" class="lg:w-2/3 lg:mx-auto">
      <nuxt />
    </main>
    <div v-if="layout && layout.footer">
      <div v-if="!layout.footer.length" v-editable="layout">
        Define footer blocks here
      </div>
      <component
        :is="child.component | dashify"
        v-for="child in layout.footer"
        :key="child._uid"
        :blok="child"
      ></component>
    </div>
  </div>
</template>
<script>
const layoutSlug = 'global';
export default {
  computed: {
    layout() {
      const story = this.$store.getters.getStoryBySlug(layoutSlug);
      return story && story.content;
    }
  }
};
</script>
