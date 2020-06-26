<template>
  <header :class="blok.style.join(' ')" v-editable="blok" class="full-width">
    <nav class="flex flex mx-auto w-2/3 my-2">
      <nuxt-link :to="`/${blok.logo_link.cached_url}`" v-if="blok.logo" class="mr-3 mt-1">
        <img :src="blok.logo" class="h-10" alt="Logo" />
      </nuxt-link>

      <button
        type="button"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path class="heroicon-ui" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"/></svg>
      </button>

      <ul v-if="blok.nav_links && blok.nav_links.length" class="flex">
        <component
          :key="blok._uid"
          class="p-2 hover:text-blue-400"
          v-for="blok in blok.nav_links"
          :blok="blok"
          :is="blok.component | dashify"
        ></component>
      </ul>

      <ul v-if="blok.second_nav_links && blok.second_nav_links.length" class="flex">
        <component
          :key="blok._uid"
          v-for="blok in blok.second_nav_links"
          :blok="blok"
          :is="blok.component | dashify"
        ></component>
      </ul>

      <a
        v-if="blok.button_text"
        class="border-2 border-blue-600 hover:bg-blue-600 text-blue-600 hover:text-white px-3 py-2 self-end"
        :href="blok.button_link.cached_url"
      >{{ blok.button_text }}</a>
    </nav>
  </header>
</template>

<script>
export default {
  props: { blok: { required: true, type: Object } }
};
</script>
