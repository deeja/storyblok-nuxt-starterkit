<template>
  <div class="body__wrap">
    <div class="body__other">
      <div v-if="!layout.header.length"
           v-editable="layout">
        Define header blocks here
      </div>
      <component :key="blok._uid"
                 v-for="blok in layout.header"
                 :blok="blok"
                 :is="blok.component | dashify"></component>
    </div>
    <main id="main" role="main" class="body__content">
      <nuxt/>
    </main>
    <div class="body__other">
      <div v-if="!layout.footer.length"
           v-editable="layout">
        Define footer blocks here
      </div>
      <component :key="blok._uid"
                 v-for="blok in layout.footer"
                 :blok="blok"
                 :is="blok.component | dashify"></component>
    </div>
  </div>
</template>
<script>
import {
  reactToEdits
} from "@/helpers/Storyblok";
export default {
  computed: {
    layout() {
      return this.$store.getters.getLayout;      
    }
  }
}
</script>